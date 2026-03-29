import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Phone, MessageSquare, Star, Shield, Clock, Navigation,
  ChevronUp, Car, User, AlertTriangle, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const rideSteps = ["Driver Assigned", "Arriving", "Ride Started", "Arriving Destination", "Completed"];

const driverInfo = {
  name: "Amit Sharma",
  rating: 4.92,
  trips: 2340,
  car: "Maruti Swift Dzire",
  plate: "HR-26-CK-5678",
  color: "White",
  phone: "+91 99887 76655",
  otp: "4821",
  eta: "3 min",
  photo: "AS",
};

const rideDetails = {
  bookingId: "RX-3042",
  pickup: "DLF Cyber Hub, Gurugram",
  drop: "IGI Airport Terminal 3, Delhi",
  distance: "28.5 km",
  duration: "~45 min",
  fare: "₹620",
  rideType: "Comfort",
  paymentMethod: "UPI",
};

export default function TrackRide() {
  const [currentStep, setCurrentStep] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showSOS, setShowSOS] = useState(false);

  // Simulate ride progress
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((p) => p + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance steps for demo
  useEffect(() => {
    if (currentStep < 4) {
      const timeout = setTimeout(() => setCurrentStep((s) => s + 1), 12000);
      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-2xl font-extrabold text-foreground">Track Your Ride</h1>
                <p className="text-sm text-muted-foreground">Booking ID: {rideDetails.bookingId}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                  {rideSteps[currentStep]}
                </span>
                <span className="text-sm font-mono text-muted-foreground">
                  <Clock className="w-3 h-3 inline mr-1" />{formatTime(elapsedTime)}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2 bg-card rounded-2xl border border-border overflow-hidden relative"
              style={{ minHeight: 420 }}
            >
              {/* Simulated map */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-muted/30 to-muted/60">
                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="hsl(var(--border))" strokeWidth="0.5" />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="hsl(var(--border))" strokeWidth="0.5" />
                  ))}
                </svg>

                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full">
                  <motion.path
                    d="M 15% 70% Q 30% 40%, 50% 45% T 85% 25%"
                    fill="none"
                    stroke="hsl(37,90%,55%)"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: currentStep / 4 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </svg>

                {/* Pickup marker */}
                <motion.div className="absolute" style={{ left: "13%", top: "65%" }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }}>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shadow-lg">
                      <MapPin className="w-4 h-4 text-success-foreground" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card px-2 py-0.5 rounded text-[10px] font-semibold text-foreground shadow border border-border">
                      Pickup
                    </div>
                  </div>
                </motion.div>

                {/* Drop marker */}
                <motion.div className="absolute" style={{ left: "82%", top: "20%" }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-destructive flex items-center justify-center shadow-lg">
                      <MapPin className="w-4 h-4 text-destructive-foreground" />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card px-2 py-0.5 rounded text-[10px] font-semibold text-foreground shadow border border-border">
                      Drop-off
                    </div>
                  </div>
                </motion.div>

                {/* Moving car icon */}
                <motion.div
                  className="absolute"
                  animate={{
                    left: `${15 + (currentStep / 4) * 67}%`,
                    top: `${70 - (currentStep / 4) * 45}%`,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-xl border-2 border-primary-foreground">
                    <Car className="w-5 h-5 text-primary-foreground" />
                  </div>
                </motion.div>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-border shadow-md">
                  <p className="text-xs font-semibold text-muted-foreground">🗺️ Live map integration ready</p>
                </div>
              </div>
            </motion.div>

            {/* Right panel */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {/* Progress steps */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-bold text-foreground mb-4">Ride Progress</h3>
                <div className="space-y-3">
                  {rideSteps.map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        i <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {i < currentStep ? "✓" : i + 1}
                      </div>
                      <span className={`text-sm ${i <= currentStep ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Driver info */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">Your Driver</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                    {driverInfo.photo}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{driverInfo.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary text-primary" /> {driverInfo.rating} · {driverInfo.trips} trips
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <p><Car className="w-3 h-3 inline mr-1 text-primary" /> {driverInfo.car} · {driverInfo.color}</p>
                  <p><Navigation className="w-3 h-3 inline mr-1 text-primary" /> {driverInfo.plate}</p>
                  <p className="text-foreground font-semibold">OTP: <span className="tracking-widest text-primary">{driverInfo.otp}</span></p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    <Phone className="w-3 h-3 mr-1" /> Call
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 rounded-xl">
                    <MessageSquare className="w-3 h-3 mr-1" /> Message
                  </Button>
                </div>
              </div>

              {/* Ride details */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">Ride Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From</span>
                    <span className="text-foreground font-medium text-right text-xs max-w-[60%]">{rideDetails.pickup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To</span>
                    <span className="text-foreground font-medium text-right text-xs max-w-[60%]">{rideDetails.drop}</span>
                  </div>
                  <div className="border-t border-border my-2" />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Distance</span>
                    <span className="text-foreground font-medium">{rideDetails.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ETA</span>
                    <span className="text-foreground font-medium">{rideDetails.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ride Type</span>
                    <span className="text-foreground font-medium">{rideDetails.rideType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="text-foreground font-medium">{rideDetails.paymentMethod}</span>
                  </div>
                  <div className="border-t border-border my-2" />
                  <div className="flex justify-between">
                    <span className="text-foreground font-bold">Total Fare</span>
                    <span className="text-primary font-extrabold text-lg">{rideDetails.fare}</span>
                  </div>
                </div>
              </div>

              {/* SOS */}
              <Button
                onClick={() => setShowSOS(true)}
                variant="outline"
                className="w-full rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <AlertTriangle className="w-4 h-4 mr-2" /> Emergency SOS
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SOS Modal */}
      {showSOS && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowSOS(false)}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-2xl border border-border p-6 w-full max-w-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-destructive flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Emergency SOS</h3>
              <button onClick={() => setShowSOS(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Your location will be shared with emergency contacts and local authorities.</p>
            <div className="space-y-2">
              <Button className="w-full rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">
                <Phone className="w-4 h-4 mr-2" /> Call 112 (Emergency)
              </Button>
              <Button variant="outline" className="w-full rounded-xl">
                <Shield className="w-4 h-4 mr-2" /> Share Live Location
              </Button>
              <Button variant="outline" className="w-full rounded-xl" onClick={() => setShowSOS(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
