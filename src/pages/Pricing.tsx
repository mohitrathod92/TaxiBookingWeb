import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MapPin, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const perRidePlans = [
  {
    name: "Economy",
    price: "₹8",
    unit: "/km",
    popular: false,
    features: ["Base fare: ₹30", "AC available", "4 seats", "1 luggage bag", "Free cancellation (5 min)", "No surge pricing"],
  },
  {
    name: "Comfort",
    price: "₹14",
    unit: "/km",
    popular: true,
    features: ["Base fare: ₹50", "AC included", "4 seats", "2 luggage bags", "Free cancellation (10 min)", "Priority support", "Premium vehicles"],
  },
  {
    name: "Premium",
    price: "₹22",
    unit: "/km",
    popular: false,
    features: ["Base fare: ₹80", "AC + WiFi", "4 seats", "3 luggage bags", "Free cancellation (15 min)", "24/7 VIP support", "Luxury sedans", "Complimentary water"],
  },
];

const subscriptionPlans = [
  { name: "Lite", price: "₹999", yearly: "₹799", rides: "50 rides/mo", features: ["Economy rides only", "Basic support", "Scheduled rides"] },
  { name: "Pro", price: "₹2,499", yearly: "₹1,999", rides: "Unlimited", features: ["All ride types", "Priority support", "No surge pricing", "Ride credits"] },
  { name: "Business", price: "₹4,999", yearly: "₹3,999", rides: "Team plan", features: ["Unlimited for 5 users", "Admin dashboard", "Monthly invoicing", "Dedicated account manager", "Custom policies"] },
];

const faqs = [
  { q: "Is there surge pricing during peak hours?", a: "RideX uses minimal dynamic pricing. Comfort and Premium plans include surge protection. Economy may see up to 1.5x during extreme demand." },
  { q: "What is the cancellation policy?", a: "Free cancellation within the time window mentioned in your plan. After that, a ₹30-₹80 fee applies depending on ride type." },
  { q: "Can I schedule rides in advance?", a: "Yes! All plans support ride scheduling up to 7 days in advance at no extra cost." },
  { q: "How does the subscription work?", a: "Pay monthly or yearly. Rides are deducted from your quota. Unused rides don't roll over. Cancel anytime." },
  { q: "Are tolls and parking included?", a: "Tolls are added to the fare at actuals. Parking fees at airports/malls are borne by the rider." },
];

export default function PricingPage() {
  const [isSubscription, setIsSubscription] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 section-padding">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Simple, <span className="text-primary">Transparent</span> Pricing
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto mb-10">No hidden charges. Pay only for what you ride.</p>
          </motion.div>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setIsSubscription(false)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${!isSubscription ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"}`}
            >
              Per Ride
            </button>
            <button
              onClick={() => setIsSubscription(true)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${isSubscription ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"}`}
            >
              Subscription
            </button>
          </div>

          {!isSubscription ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
              {perRidePlans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-card rounded-2xl border-2 p-8 text-left hover-lift ${
                    plan.popular ? "border-primary shadow-xl scale-105" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
                  )}
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.unit}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full rounded-xl font-semibold ${plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"}`}>
                    Book Now
                  </Button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
                <button onClick={() => setIsYearly(!isYearly)} className={`w-12 h-6 rounded-full relative transition-colors ${isYearly ? "bg-primary" : "bg-border"}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-card shadow transition-all ${isYearly ? "left-7" : "left-1"}`} />
                </button>
                <span className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
                  Yearly <span className="text-primary text-xs font-bold">-20%</span>
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
                {subscriptionPlans.map((plan, i) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-card rounded-2xl border-2 p-8 text-left hover-lift ${i === 1 ? "border-primary shadow-xl scale-105" : "border-border"}`}
                  >
                    <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.rides}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-extrabold text-foreground">{isYearly ? plan.yearly : plan.price}</span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full rounded-xl font-semibold ${i === 1 ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"}`}>
                      Subscribe
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Fare Estimator */}
          <div className="max-w-2xl mx-auto mb-20">
            <h2 className="text-2xl font-extrabold text-foreground mb-6">Fare <span className="text-primary">Estimator</span></h2>
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <input type="text" placeholder="From" className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
                  <input type="text" placeholder="To" className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground" />
                </div>
                <select className="w-full px-4 py-3 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground">
                  <option>Economy</option>
                  <option>Comfort</option>
                  <option>Premium</option>
                  <option>XL / SUV</option>
                </select>
              </div>
              <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-11 font-semibold">
                <Search className="w-4 h-4 mr-2" /> Estimate Fare
              </Button>
              <div className="mt-4 bg-muted rounded-xl p-4 text-center">
                <p className="text-sm text-muted-foreground">Estimated fare</p>
                <p className="text-3xl font-extrabold text-primary">₹180 – ₹220</p>
                <p className="text-xs text-muted-foreground mt-1">Based on ~15 km · Economy</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-foreground mb-6">Frequently Asked <span className="text-primary">Questions</span></h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
