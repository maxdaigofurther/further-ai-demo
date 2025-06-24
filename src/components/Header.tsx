import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group" aria-label="Further Home">
            <Image
              src="/logo.png" // Assumes logo.png is in the public folder
              alt="Further Logo"
              width={235} // Original width: 1068/ (204/48) approx 235 based on 48px height
              height={48} // Desired height for the header
              priority // Load the logo with priority
            />
          </Link>
          <nav className="flex space-x-4">
            {/* Add navigation links here if needed in the future */}
            {/* Example: <Link href="/about" className="text-primary-foreground hover:text-accent transition-colors">About</Link> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
