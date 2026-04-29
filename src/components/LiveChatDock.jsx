import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IconGlyph from './IconGlyph';
import { trackContactChannelClick } from '../services/analyticsService';
import { useLanguage } from '../i18n/useLanguage';

const SITE_SPEAK_ORIGIN = 'https://chatbot.sitespeak.ai';

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
  iframe.contentWindow.postMessage(isOpen ? { closeChat: true } : { openChat: true }, '*');
  iframe.style.display = isOpen ? 'none' : 'block';
  return true;
}

export default function LiveChatDock() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    let attempts = 0;
    const maxAttempts = 80;
    const pollId = window.setInterval(() => {
      const launcher = getSiteSpeakLauncher();
      const iframe = getSiteSpeakIframe();

      if (launcher || iframe) {
        setIsReady(true);
        setIsChatOpen(isSiteSpeakOpen());
        window.clearInterval(pollId);
        return;
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        window.clearInterval(pollId);
      }
    }, 250);

    return () => {
      window.clearInterval(pollId);
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

  const onToggleChat = useCallback(() => {
    const toggled = toggleSiteSpeakChat();
    if (!toggled) {
      return;
    }

    window.setTimeout(() => {
      const nextOpenState = isSiteSpeakOpen();
      setIsChatOpen(nextOpenState);
      trackContactChannelClick('sitespeak_ai', `live_chat:${location.pathname}:${nextOpenState ? 'open' : 'close'}`);
    }, 40);
  }, [location.pathname]);

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
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <IconGlyph name="chat" size={18} />
      </button>
    </div>
  );
}
