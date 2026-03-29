import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Book a Ride", href: "/booking" },
  { label: "Track Ride", href: "/track-ride" },
  { label: "Pricing", href: "/pricing" },
  { label: "Drive with Us", href: "/driver-dashboard" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-foreground">
            Ride<span className="text-primary">X</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/driver-dashboard">Driver Portal</Link>
          </Button>
          <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/booking">Book a Ride</Link>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-border"
          >
            <div className="flex flex-col gap-2 p-4">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === l.href ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Button asChild className="rounded-full bg-primary text-primary-foreground mt-2">
                <Link to="/booking">Book a Ride</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
