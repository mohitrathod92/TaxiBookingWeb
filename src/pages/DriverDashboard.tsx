import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, MapPin, IndianRupee, CalendarDays, Bell, Settings, LogOut, Star,
  ChevronLeft, ChevronRight, Clock, X, Check, Car, Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import MyTrips from "@/components/dashboard/MyTrips";
import Earnings from "@/components/dashboard/Earnings";
import Schedule from "@/components/dashboard/Schedule";
import Notifications from "@/components/dashboard/Notifications";
import SettingsPanel from "@/components/dashboard/SettingsPanel";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: MapPin, label: "My Trips" },
  { icon: IndianRupee, label: "Earnings" },
  { icon: CalendarDays, label: "Schedule" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

const tabComponents: Record<string, React.FC> = {
  Dashboard: DashboardOverview,
  "My Trips": MyTrips,
  Earnings: Earnings,
  Schedule: Schedule,
  Notifications: Notifications,
  Settings: SettingsPanel,
};

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [online, setOnline] = useState(true);
  const [showRideRequest, setShowRideRequest] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const ActiveComponent = tabComponents[activeTab] || DashboardOverview;

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 72 }}
        className="fixed top-0 left-0 h-screen bg-secondary text-secondary-foreground z-40 flex flex-col shadow-xl overflow-hidden"
      >
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Car className="w-5 h-5 text-primary-foreground" />
          </div>
          {sidebarOpen && <span className="text-lg font-extrabold">Ride<span className="text-primary">X</span></span>}
        </div>

        {sidebarOpen && (
          <div className="px-4 py-3 flex items-center gap-3 border-t border-b border-secondary-foreground/10">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">RK</div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">Rajesh Kumar</p>
              <p className="text-xs text-secondary-foreground/50 flex items-center gap-1">
                <Star className="w-3 h-3 fill-primary text-primary" /> 4.87
              </p>
            </div>
          </div>
        )}

        <nav className="flex-1 py-4 space-y-1 px-2">
          {sidebarLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => setActiveTab(l.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === l.label ? "bg-sidebar-accent text-primary" : "text-secondary-foreground/70 hover:bg-sidebar-accent/50"
              }`}
            >
              <l.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span>{l.label}</span>}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-secondary-foreground/10">
          <button
            onClick={() => setOnline(!online)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              online ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${online ? "bg-success" : "bg-destructive"}`} />
            {sidebarOpen && <span>{online ? "Online" : "Offline"}</span>}
          </button>
        </div>

        {sidebarOpen && (
          <div className="px-4 py-3 space-y-1">
            <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-foreground/70 hover:bg-sidebar-accent/50 transition-colors">
              <Home className="w-5 h-5" /> Back to Home
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-secondary-foreground/50 hover:text-destructive transition-colors">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        )}
      </motion.aside>

      {/* Main content */}
      <div className={`flex-1 transition-all ${sidebarOpen ? "ml-[260px]" : "ml-[72px]"}`}>
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border h-16 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted rounded-lg" aria-label="Toggle sidebar">
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
            <h2 className="text-lg font-bold text-foreground">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">28 Mar 2026 · 2:45 PM</span>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${online ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
              {online ? "● Online" : "● Offline"}
            </div>
            <button className="relative p-2 hover:bg-muted rounded-lg" aria-label="Notifications" onClick={() => setActiveTab("Notifications")}>
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Incoming ride request */}
      <AnimatePresence>
        {showRideRequest && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-card rounded-2xl shadow-2xl border border-border p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">New Ride Request</span>
              <button onClick={() => setShowRideRequest(false)} className="text-muted-foreground hover:text-foreground" aria-label="Dismiss">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 mb-4">
              <p className="font-bold text-foreground">Meera Joshi</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> DLF Cyber City → Huda Metro</p>
              <p className="text-xs text-muted-foreground">2.1 km away · Est. fare ₹85</p>
            </div>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(220,13%,91%)" strokeWidth="3" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(37,90%,55%)" strokeWidth="3" strokeDasharray="125.6" strokeDashoffset="40" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">15s</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setShowRideRequest(false)} className="flex-1 rounded-xl bg-success text-success-foreground hover:bg-success/90 font-semibold">
                <Check className="w-4 h-4 mr-1" /> Accept
              </Button>
              <Button onClick={() => setShowRideRequest(false)} variant="outline" className="flex-1 rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <X className="w-4 h-4 mr-1" /> Decline
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
