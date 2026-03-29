import { motion } from "framer-motion";
import { Zap, Shield, MapPin, CreditCard } from "lucide-react";

const features = [
  { icon: Zap, title: "Instant Booking", desc: "Book your ride in under 10 seconds with our streamlined process." },
  { icon: Shield, title: "Safe & Verified", desc: "All drivers are background-verified with real-time ID checks." },
  { icon: MapPin, title: "Live Tracking", desc: "Track your ride in real-time. Share your trip with loved ones." },
  { icon: CreditCard, title: "Transparent Pricing", desc: "No surge surprises. See the fare before you confirm your ride." },
];

export function Features() {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Why Choose <span className="text-primary">RideX</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Built for riders who expect the best
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 border border-border hover-lift cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
