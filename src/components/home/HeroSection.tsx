import { motion } from "framer-motion";
import { MapPin, Calendar, Search, Star, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const badges = [
  { icon: Star, label: "50K+ Rides" },
  { icon: Star, label: "4.9★ Rating" },
  { icon: Clock, label: "24/7 Available" },
  { icon: Shield, label: "Verified Drivers" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-primary/5 -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            India's fastest-growing ride platform
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6">
            Your Ride, Your Way —{" "}
            <span className="text-gradient">Instantly.</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            Fast, safe, and affordable rides at your fingertips. Book in seconds, ride in minutes.
          </p>

          {/* Mini Booking Form */}
          <div className="bg-card rounded-2xl shadow-xl p-6 mb-8 border border-border">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <input
                  type="text"
                  placeholder="Pickup location"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
                <input
                  type="text"
                  placeholder="Drop-off location"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="datetime-local"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
                />
              </div>
            </div>
            <Button asChild className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold">
              <Link to="/booking">
                <Search className="w-4 h-4 mr-2" />
                Find a Ride
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4">
            {badges.map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <b.icon className="w-4 h-4 text-primary" />
                <span className="font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Illustration area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl" />
            <div className="absolute inset-4 bg-gradient-to-br from-muted to-card rounded-2xl border border-border shadow-2xl flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-3xl">🚕</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-foreground mb-2">Ride arriving in</p>
                <p className="text-5xl font-extrabold text-primary">3 min</p>
                <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <span>📍 Connaught Place</span>
                  <span>→</span>
                  <span>📍 Aerocity</span>
                </div>
              </div>
            </div>
            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-3 border border-border"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">Verified Driver</p>
                  <p className="text-xs text-muted-foreground">4.95 ★ rating</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg p-3 border border-border"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">ETA: 3 mins</p>
                  <p className="text-xs text-muted-foreground">2.4 km away</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
