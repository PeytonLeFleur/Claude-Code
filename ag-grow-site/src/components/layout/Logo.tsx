/** Simple inline leaf/blade mark for the brand. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="20" fill="currentColor" className="text-moss-400" />
      <path
        d="M20 31c0-7 0-11 4-15 2.5-2.5 6-3.5 6-3.5s-.5 4-3 6.5C23 22.5 20 24 20 31Z"
        fill="#0f2417"
      />
      <path
        d="M20 31c0-6-1-10-5-13.5C12.7 15.4 10 14.5 10 14.5s.4 3.6 2.7 5.8C16 23.5 20 25 20 31Z"
        fill="#0f2417"
        opacity="0.75"
      />
      <rect x="19" y="22" width="2" height="11" rx="1" fill="#0f2417" />
    </svg>
  )
}
