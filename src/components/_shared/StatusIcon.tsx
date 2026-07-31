type StatusVariant = 'success' | 'info' | 'warning' | 'danger';

const paths: Record<StatusVariant, JSX.Element> = {
  success: (
    <path
      d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm2.5-7.5L7 8.5 5.5 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  info: (
    <>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  warning: (
    <>
      <path
        d="M8 2.5L14.5 13.5H1.5L8 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M8 6.5v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  danger: (
    <>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
};

export function StatusIcon({
  variant,
  size = 16,
}: {
  variant: StatusVariant;
  size?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      {paths[variant]}
    </svg>
  );
}
