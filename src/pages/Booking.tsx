import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpDown, Calendar, Clock, Car, Users, CreditCard, Wallet, Banknote, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const rideTypes = [
  { id: "economy", name: "Economy", emoji: "🚗", capacity: 4, eta: "5 min", fare: "₹120" },
  { id: "comfort", name: "Comfort", emoji: "🚙", capacity: 4, eta: "7 min", fare: "₹210" },
  { id: "premium", name: "Premium", emoji: "🏎️", capacity: 4, eta: "10 min", fare: "₹340" },
  { id: "xl", name: "XL / SUV", emoji: "🚐", capacity: 6, eta: "8 min", fare: "₹280" },
];

const paymentMethods = [
  { id: "cash", label: "Cash", icon: Banknote },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "wallet", label: "Wallet", icon: Wallet },
];

export default function BookingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRide, setSelectedRide] = useState("comfort");
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const steps = ["Route", "Ride Type", "Confirm"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-extrabold text-foreground mb-8">Book Your <span className="text-primary">Ride</span></h1>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Panel */}
            <div className="lg:col-span-2">
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-8">
                {steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <button
                      onClick={() => setStep(i + 1)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                        step >= i + 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                    </button>
                    <span className={`text-sm font-medium hidden sm:inline ${step >= i + 1 ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
                    {i < 2 && <div className={`w-8 h-0.5 ${step > i + 1 ? "bg-primary" : "bg-border"}`} />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                      <input type="text" defaultValue="Connaught Place, New Delhi" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground" />
                    </div>
                    <div className="flex justify-center">
                      <button className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors" aria-label="Swap locations">
                        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
                      <input type="text" defaultValue="Indira Gandhi Airport, T3" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="date" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground" />
                      </div>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="time" defaultValue="14:30" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground" />
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 flex justify-between text-sm">
                      <span className="text-muted-foreground">Est. distance: <span className="font-semibold text-foreground">18.2 km</span></span>
                      <span className="text-muted-foreground">Est. time: <span className="font-semibold text-foreground">35 min</span></span>
                    </div>
                    <Button onClick={() => setStep(2)} className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold">Continue</Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                    {rideTypes.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedRide(r.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                          selectedRide === r.id ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <span className="text-3xl">{r.emoji}</span>
                        <div className="flex-1">
                          <p className="font-bold text-foreground">{r.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <Users className="w-3 h-3" /> {r.capacity} · ETA {r.eta}
                          </p>
                        </div>
                        <span className="text-lg font-extrabold text-primary">{r.fare}</span>
                      </button>
                    ))}
                    <div className="flex gap-2">
                      <input type="text" placeholder="Promo code" className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground" />
                      <Button variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground">Apply</Button>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1 rounded-xl">Back</Button>
                      <Button onClick={() => setStep(3)} className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">Continue</Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                    <div className="bg-card rounded-xl border border-border p-5 space-y-3">
                      <h3 className="font-bold text-foreground">Booking Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">From</span><span className="font-medium text-foreground">Connaught Place</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">To</span><span className="font-medium text-foreground">IGI Airport, T3</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Ride</span><span className="font-medium text-foreground capitalize">{selectedRide}</span></div>
                        <div className="flex justify-between"><span className="text-muted-foreground">Distance</span><span className="font-medium text-foreground">18.2 km</span></div>
                        <hr className="border-border" />
                        <div className="flex justify-between text-base"><span className="font-bold text-foreground">Total Fare</span><span className="font-extrabold text-primary">{rideTypes.find(r => r.id === selectedRide)?.fare}</span></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">Payment Method</p>
                      <div className="flex gap-3">
                        {paymentMethods.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setSelectedPayment(p.id)}
                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                              selectedPayment === p.id ? "border-primary bg-primary/5" : "border-border bg-card"
                            }`}
                          >
                            <p.icon className={`w-5 h-5 ${selectedPayment === p.id ? "text-primary" : "text-muted-foreground"}`} />
                            <span className="text-xs font-medium">{p.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1 rounded-xl">Back</Button>
                      <Button onClick={() => setShowConfirmation(true)} className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-semibold">
                        Confirm Booking
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">By confirming, you agree to RideX's Terms of Service.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Panel — Map placeholder */}
            <div className="lg:col-span-3 relative rounded-2xl overflow-hidden border border-border min-h-[500px] bg-gradient-to-br from-muted to-muted/50">
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={`h${i}`} className="absolute w-full border-t border-foreground/20" style={{ top: `${(i + 1) * 5}%` }} />
                ))}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={`v${i}`} className="absolute h-full border-l border-foreground/20" style={{ left: `${(i + 1) * 5}%` }} />
                ))}
              </div>
              {/* Pins */}
              <div className="absolute top-[30%] left-[25%] flex flex-col items-center">
                <div className="w-4 h-4 bg-primary rounded-full shadow-lg relative">
                  <div className="absolute inset-0 bg-primary rounded-full animate-pulse-ring" />
                </div>
                <span className="mt-2 text-xs font-semibold bg-card px-2 py-1 rounded-lg shadow text-foreground">Pickup</span>
              </div>
              <div className="absolute top-[65%] right-[20%] flex flex-col items-center">
                <div className="w-4 h-4 bg-destructive rounded-full shadow-lg" />
                <span className="mt-2 text-xs font-semibold bg-card px-2 py-1 rounded-lg shadow text-foreground">Drop-off</span>
              </div>
              {/* Route line */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 25 32 Q 50 20, 60 50 T 78 67" fill="none" stroke="hsl(37,90%,55%)" strokeWidth="0.5" strokeDasharray="2,1" />
              </svg>
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-border flex items-center gap-2">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">Live map integration ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-border"
            >
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-extrabold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground text-sm mb-6">Your ride has been booked successfully.</p>
              <div className="bg-muted rounded-xl p-4 text-left text-sm space-y-2 mb-6">
                <div className="flex justify-between"><span className="text-muted-foreground">Booking ID</span><span className="font-semibold text-foreground">#RX-28374</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Driver</span><span className="font-semibold text-foreground">Rajesh Kumar</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Vehicle</span><span className="font-semibold text-foreground">Maruti Dzire · DL 4C 1234</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">ETA</span><span className="font-semibold text-primary">3 minutes</span></div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => navigate("/track-ride")} className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">Track Ride</Button>
                <Button variant="outline" onClick={() => setShowConfirmation(false)} className="flex-1 rounded-xl">
                  <X className="w-4 h-4 mr-1" /> Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
