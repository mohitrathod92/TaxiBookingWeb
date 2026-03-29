import { Link } from "react-router-dom";
import { Car, Twitter, Instagram, Facebook, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Book a Ride", href: "/booking" },
  { label: "Pricing", href: "/pricing" },
  { label: "Driver Portal", href: "/driver-dashboard" },
];

const services = ["City Rides", "Airport Transfers", "Outstation", "Hourly Rentals", "Corporate"];
const socials = [
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Facebook, href: "#" },
  { icon: Linkedin, href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Car className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-extrabold">Ride<span className="text-primary">X</span></span>
            </div>
            <p className="text-sm text-secondary-foreground/70 mb-6">
              Your ride, your way — instantly. Safe, fast, and affordable rides across India.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label="Social link">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-secondary-foreground/50">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-secondary-foreground/50">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s} className="text-sm text-secondary-foreground/70">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-secondary-foreground/50">Contact</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li>support@ridex.in</li>
              <li>+91 78873 45082</li>
              <li>Kalyan, Maharashtra,<br />Mumbai</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary-foreground/50">
          <span>© 2026 RideX. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
