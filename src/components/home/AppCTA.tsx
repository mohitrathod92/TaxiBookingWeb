import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";

export function AppCTA() {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-lg"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Ride smarter with the{" "}
              <span className="text-primary">RideX</span> app
            </h2>
            <p className="text-secondary-foreground/70 mb-8">
              Download now for exclusive offers, real-time tracking, and the fastest booking experience.
            </p>
            <div className="flex gap-4">
              <button className="bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors rounded-xl px-6 py-3 flex items-center gap-3" aria-label="App Store">
                <span className="text-2xl">🍎</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase text-secondary-foreground/50">Download on the</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </button>
              <button className="bg-secondary-foreground/10 hover:bg-secondary-foreground/20 transition-colors rounded-xl px-6 py-3 flex items-center gap-3" aria-label="Google Play">
                <span className="text-2xl">▶️</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase text-secondary-foreground/50">Get it on</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-64 h-[500px] bg-secondary-foreground/5 rounded-[40px] border-4 border-secondary-foreground/10 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-secondary rounded-b-xl" />
              <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-primary-foreground" />
                </div>
                <p className="text-lg font-bold text-center">RideX</p>
                <p className="text-xs text-secondary-foreground/50 text-center">Your ride, your way</p>
                <div className="w-full space-y-3 mt-4">
                  <div className="h-3 bg-secondary-foreground/10 rounded-full w-full" />
                  <div className="h-3 bg-secondary-foreground/10 rounded-full w-3/4" />
                  <div className="h-3 bg-primary/30 rounded-full w-1/2" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
