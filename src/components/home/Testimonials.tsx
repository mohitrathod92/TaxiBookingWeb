import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", city: "New Delhi", rating: 5, quote: "RideX has changed my daily commute. Always on time, always safe!" },
  { name: "Arjun Mehta", city: "Mumbai", rating: 5, quote: "The premium rides are incredible. Clean cars, polite drivers." },
  { name: "Sneha Patel", city: "Bangalore", rating: 5, quote: "I love the transparent pricing. No surprises at the end of the ride." },
  { name: "Rohit Kumar", city: "Hyderabad", rating: 4, quote: "Great app, great service. The Electric option is a game changer." },
  { name: "Ananya Iyer", city: "Chennai", rating: 5, quote: "As a woman, safety matters most. RideX nails it with verified drivers." },
  { name: "Vikram Singh", city: "Jaipur", rating: 5, quote: "Outstation rides are so convenient now. Booked a trip to Udaipur seamlessly!" },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-muted/50 overflow-hidden">
      <div className="container mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            What Riders <span className="text-primary">Say</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">Join thousands of happy riders across India</p>
        </motion.div>
      </div>

      {/* Infinite scroll */}
      <div className="relative">
        <motion.div
          animate={{ x: [0, -1600] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-6"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="min-w-[320px] bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground mb-4 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
