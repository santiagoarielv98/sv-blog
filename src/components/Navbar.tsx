import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';

function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">Blog</Link>
        </h1>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/tags" className="hover:underline">
            Tags
          </Link>
          <Link href="/" className="hover:underline">
            Contact
          </Link>
          <Link href="/create" className="hover:underline">
            Create
          </Link>
          <Link href="/profile/me" className="hover:underline">
            Profile
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
