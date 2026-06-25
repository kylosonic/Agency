export default function LogoMark({ className = '' }) {
  return (
    <span className={`brand-mark ${className}`.trim()} aria-hidden="true">
      N
    </span>
  );
}
