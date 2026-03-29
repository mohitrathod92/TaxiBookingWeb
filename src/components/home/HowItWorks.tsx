import { motion } from "framer-motion";
import { MapPin, Car, Navigation } from "lucide-react";

const steps = [
  { icon: MapPin, title: "Enter Locations", desc: "Set your pickup & destination in seconds" },
  { icon: Car, title: "Choose Your Ride", desc: "Economy, Comfort, Premium — your pick" },
  { icon: Navigation, title: "Get Picked Up", desc: "Your driver arrives in minutes" },
];

export function HowItWorks() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-16">
            Three simple steps to your next ride
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center"
            >
              <div className="relative z-10 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-4 ring-background">
                <step.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-primary-foreground rounded-full text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
