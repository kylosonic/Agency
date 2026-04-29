import { LANGUAGE_LABELS, SUPPORTED_LANGUAGES } from '../i18n/translations';
import { useLanguage } from '../i18n/useLanguage';

export default function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className={`language-switcher ${compact ? 'compact' : ''}`.trim()} aria-label={t('actions.switchLanguage')}>
      <span className="language-switcher-label" aria-hidden="true">
        {compact ? 'Lang' : 'Language'}
      </span>
      <select
        className="language-switcher-select"
        value={language}
        onChange={(event) => setLanguage(event.target.value)}
      >
        {SUPPORTED_LANGUAGES.map((code) => (
          <option key={code} value={code}>
            {LANGUAGE_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
