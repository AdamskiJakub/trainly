export function DumbbellIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="dumbbellGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <path
        d="M6.5 6H4.5C3.67 6 3 6.67 3 7.5V16.5C3 17.33 3.67 18 4.5 18H6.5M17.5 6H19.5C20.33 6 21 6.67 21 7.5V16.5C21 17.33 20.33 18 19.5 18H17.5M6.5 8V16M17.5 8V16M6.5 12H17.5M8 10H16M8 14H16"
        stroke="url(#dumbbellGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
