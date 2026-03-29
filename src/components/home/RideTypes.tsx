import { motion } from "framer-motion";
import { Users, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const rides = [
  { name: "Economy", emoji: "🚗", capacity: 4, price: "₹8/km", desc: "Affordable daily rides" },
  { name: "Comfort", emoji: "🚙", capacity: 4, price: "₹14/km", desc: "AC, extra legroom" },
  { name: "XL / SUV", emoji: "🚐", capacity: 6, price: "₹18/km", desc: "Space for groups" },
  { name: "Premium", emoji: "🏎️", capacity: 4, price: "₹22/km", desc: "Luxury sedans" },
  { name: "Electric", emoji: "⚡", capacity: 4, price: "₹12/km", desc: "Zero emissions", green: true },
];

export function RideTypes() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Choose Your <span className="text-primary">Ride</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            From budget-friendly to premium luxury
          </p>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide max-w-6xl mx-auto">
          {rides.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="min-w-[240px] snap-center bg-card rounded-2xl border border-border p-6 hover-lift flex flex-col"
            >
              <div className="text-5xl mb-4">{r.emoji}</div>
              <h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
                {r.name}
                {r.green && <Leaf className="w-4 h-4 text-success" />}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
              <div className="flex items-center gap-3 mb-4 mt-auto">
                <span className="text-xl font-extrabold text-primary">{r.price}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" /> {r.capacity} seats
                </span>
              </div>
              <Button asChild variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full">
                <Link to="/booking">Select</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
