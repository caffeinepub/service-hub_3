import { Link, useRouterState } from '@tanstack/react-router';
import { Leaf, Car, Calendar, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-lawn transition-transform group-hover:scale-110" />
              <Car className="h-6 w-6 text-wash -ml-1 transition-transform group-hover:scale-110" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-lawn to-wash bg-clip-text text-transparent">
              Service Hub
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              to="/book"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/book') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Book Service
            </Link>
            <Link
              to="/manage"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/manage') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Manage Bookings
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background">
            <nav className="container flex flex-col space-y-3 py-4">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/') ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/book"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/book') ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Service
              </Link>
              <Link
                to="/manage"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/manage') ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Manage Bookings
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border/40 bg-muted/30">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Leaf className="h-5 w-5 text-lawn" />
                <Car className="h-5 w-5 text-wash -ml-1" />
                <span className="font-bold">Service Hub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional lawn mowing and car washing services at your doorstep.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4 text-lawn" />
                  <span>Lawn Mowing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-wash" />
                  <span>Car Washing</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/book" className="hover:text-primary transition-colors">
                    Book a Service
                  </Link>
                </li>
                <li>
                  <Link to="/manage" className="hover:text-primary transition-colors">
                    View Bookings
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Service Hub. Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'service-hub'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
