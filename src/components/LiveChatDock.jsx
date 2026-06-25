import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IconGlyph from './IconGlyph';
import { trackContactChannelClick } from '../services/analyticsService';
import { useLanguage } from '../i18n/useLanguage';

const SITE_SPEAK_ORIGIN = 'https://chatbot.sitespeak.ai';
const SITE_SPEAK_BOT_ID = import.meta.env.VITE_SITESPEAK_BOT_ID || 'f1f5fc15-c1e9-4d01-864b-1e7a756a61b4';
const SITE_SPEAK_SCRIPT_SRC = `https://sitespeak.ai/chatbots/${SITE_SPEAK_BOT_ID}.js`;
const SITE_SPEAK_SCRIPT_SELECTOR = 'script[data-sitespeak-script="true"]';
const SITE_SPEAK_WAIT_TIMEOUT_MS = 12000;

function loadSiteSpeakScript() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve(false);
  }

  if (window.__novatechSiteSpeakLoaderPromise) {
    return window.__novatechSiteSpeakLoaderPromise;
  }

  const existingScript = document.querySelector(SITE_SPEAK_SCRIPT_SELECTOR)
    || document.querySelector(`script[src="${SITE_SPEAK_SCRIPT_SRC}"]`);

  if (existingScript) {
    window.__novatechSiteSpeakLoaderPromise = Promise.resolve(true);
    return window.__novatechSiteSpeakLoaderPromise;
  }

  window.__novatechSiteSpeakLoaderPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SITE_SPEAK_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.dataset.sitespeakScript = 'true';
    script.onload = () => resolve(true);
    script.onerror = () => {
      window.__novatechSiteSpeakLoaderPromise = null;
      reject(new Error('Failed to load SiteSpeak script'));
    };
    document.head.appendChild(script);
  });

  return window.__novatechSiteSpeakLoaderPromise;
}

function waitForSiteSpeakUi(timeoutMs = SITE_SPEAK_WAIT_TIMEOUT_MS) {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  const startedAt = Date.now();

  return new Promise((resolve) => {
    const timer = window.setInterval(() => {
      const launcher = getSiteSpeakLauncher();
      const iframe = getSiteSpeakIframe();

      if (launcher || iframe) {
        window.clearInterval(timer);
        resolve(true);
        return;
      }

      if (Date.now() - startedAt > timeoutMs) {
        window.clearInterval(timer);
        resolve(false);
      }
    }, 200);
  });
}

function getSiteSpeakLauncher() {
  if (typeof document === 'undefined') {
    return null;
  }

  return document.getElementById('sitespeak-launcher');
}

function getSiteSpeakIframe() {
  if (typeof document === 'undefined') {
    return null;
  }

  return document.getElementById('sitespeak-iframe');
}

function isSiteSpeakOpen() {
  const launcher = getSiteSpeakLauncher();
  if (launcher?.classList.contains('open')) {
    return true;
  }

  const iframe = getSiteSpeakIframe();
  return Boolean(iframe && iframe.style.display !== 'none');
}

function toggleSiteSpeakChat() {
  const launcher = getSiteSpeakLauncher();
  if (launcher) {
    launcher.click();
    return true;
  }

  const iframe = getSiteSpeakIframe();
  if (!(iframe instanceof HTMLIFrameElement) || !iframe.contentWindow) {
    return false;
  }

  const isOpen = iframe.style.display !== 'none';
  iframe.contentWindow.postMessage(isOpen ? { closeChat: true } : { openChat: true }, SITE_SPEAK_ORIGIN);
  iframe.style.display = isOpen ? 'none' : 'block';
  return true;
}

export default function LiveChatDock() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let cancelled = false;
    let fallbackTimer = 0;
    let idleHandle = 0;

    const requestWarmLoad = async () => {
      setIsLoading(true);
      try {
        await loadSiteSpeakScript();
        const ready = await waitForSiteSpeakUi();
        if (!cancelled && ready) {
          setIsReady(true);
          setIsChatOpen(isSiteSpeakOpen());
        }
      } catch {
        // Ignore script load failure. Users can retry by opening the chat manually.
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    if ('requestIdleCallback' in window) {
      idleHandle = window.requestIdleCallback(() => {
        requestWarmLoad();
      }, { timeout: 2200 });
    } else {
      fallbackTimer = window.setTimeout(() => {
        requestWarmLoad();
      }, 1800);
    }

    return () => {
      cancelled = true;
      if (idleHandle) {
        window.cancelIdleCallback(idleHandle);
      }
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleMessage = (event) => {
      if (event.origin !== SITE_SPEAK_ORIGIN) {
        return;
      }

      setIsChatOpen(isSiteSpeakOpen());
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!isReady || typeof MutationObserver === 'undefined') {
      return undefined;
    }

    const launcher = getSiteSpeakLauncher();
    const iframe = getSiteSpeakIframe();

    const observer = new MutationObserver(() => {
      setIsChatOpen(isSiteSpeakOpen());
    });

    if (launcher) {
      observer.observe(launcher, { attributes: true, attributeFilter: ['class', 'style'] });
    }

    if (iframe) {
      observer.observe(iframe, { attributes: true, attributeFilter: ['style'] });
    }

    return () => {
      observer.disconnect();
    };
  }, [isReady]);

  const onToggleChat = useCallback(async () => {
    let ready = isReady || Boolean(getSiteSpeakLauncher() || getSiteSpeakIframe());

    if (!ready) {
      setIsLoading(true);
      try {
        await loadSiteSpeakScript();
        ready = await waitForSiteSpeakUi();
      } catch {
        ready = false;
      } finally {
        setIsLoading(false);
      }
    }

    if (!ready) {
      return;
    }

    setIsReady(true);
    const toggled = toggleSiteSpeakChat();
    if (!toggled) {
      return;
    }

    window.setTimeout(() => {
      const nextOpenState = isSiteSpeakOpen();
      setIsChatOpen(nextOpenState);
      trackContactChannelClick('sitespeak_ai', `live_chat:${location.pathname}:${nextOpenState ? 'open' : 'close'}`);
    }, 40);
  }, [isReady, location.pathname]);

  const ariaLabel = isChatOpen
    ? t('liveChat.close', 'Close support chat')
    : t('liveChat.open', 'Open support chat');

  return (
    <div className={`live-chat-dock ${isChatOpen ? 'open' : ''}`.trim()}>
      <button
        type="button"
        className="live-chat-toggle"
        onClick={onToggleChat}
        aria-expanded={isChatOpen}
        aria-busy={isLoading}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <IconGlyph name="chat" size={18} />
      </button>
    </div>
  );
}
