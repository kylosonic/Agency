import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import IconGlyph from './IconGlyph';
import { SITE_CONTACT, buildTelegramShareLink, buildWhatsAppMessageLink } from '../config/siteConfig';
import { liveChatPromptsByRoute } from '../config/contentData';
import { trackContactChannelClick } from '../services/analyticsService';

export default function LiveChatDock() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  const prompt = useMemo(() => {
    return liveChatPromptsByRoute[location.pathname] || liveChatPromptsByRoute.default;
  }, [location.pathname]);

  const telegramLink = useMemo(() => {
    if (typeof window === 'undefined') {
      return SITE_CONTACT.telegramUrl;
    }

    return buildTelegramShareLink(prompt, window.location.href);
  }, [prompt]);

  const whatsappLink = useMemo(() => buildWhatsAppMessageLink(prompt), [prompt]);

  return (
    <div className={`live-chat-dock ${expanded ? 'open' : ''}`.trim()}>
      <button
        type="button"
        className="live-chat-toggle"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        aria-label="Toggle live chat options"
      >
        <IconGlyph name="chat" size={18} />
      </button>

      {expanded ? (
        <div className="live-chat-panel glass-card" role="dialog" aria-label="Chat options">
          <h4>Need a quick answer?</h4>
          <p>{prompt}</p>
          <div className="live-chat-actions">
            <a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
              onClick={() => trackContactChannelClick('telegram', `live_chat:${location.pathname}`)}
            >
              Telegram
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              onClick={() => trackContactChannelClick('whatsapp', `live_chat:${location.pathname}`)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
