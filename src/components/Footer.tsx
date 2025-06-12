interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={`flex h-20 w-full items-center justify-center border-t border-neutral-200 ${className}`}
    >
      <p className='text-xs text-neutral-600'>
        © 2025 Web Programming Hack Blog All rights reserved.
      </p>
    </footer>
  );
}
