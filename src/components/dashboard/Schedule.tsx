import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const scheduledRides = [
  { id: 1, passenger: "Anita Sharma", pickup: "Sector 14", drop: "Airport T3", time: "6:00 AM", date: "29 Mar", fare: "₹850", status: "Upcoming" },
  { id: 2, passenger: "Vikram Rao", pickup: "Cyber Hub", drop: "Delhi Cantt", time: "9:30 AM", date: "29 Mar", fare: "₹620", status: "Upcoming" },
  { id: 3, passenger: "Neha Gupta", pickup: "MG Road", drop: "Noida Sec 62", time: "2:00 PM", date: "29 Mar", fare: "₹480", status: "Upcoming" },
  { id: 4, passenger: "Rahul Verma", pickup: "Huda Metro", drop: "Dwarka Sec 21", time: "5:30 PM", date: "30 Mar", fare: "₹550", status: "Upcoming" },
];

const availability = [
  { day: "Mon", hours: "6 AM – 2 PM", active: true },
  { day: "Tue", hours: "6 AM – 2 PM", active: true },
  { day: "Wed", hours: "Off", active: false },
  { day: "Thu", hours: "10 AM – 6 PM", active: true },
  { day: "Fri", hours: "6 AM – 6 PM", active: true },
  { day: "Sat", hours: "8 AM – 4 PM", active: true },
  { day: "Sun", hours: "Off", active: false },
];

export default function Schedule() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Weekly Availability */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">Weekly Availability</h3>
          <Button variant="outline" size="sm" className="rounded-xl text-xs">
            <Plus className="w-3 h-3 mr-1" /> Edit Schedule
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {availability.map((d) => (
            <div key={d.day} className={`rounded-xl p-3 text-center border ${d.active ? "border-primary/30 bg-primary/5" : "border-border bg-muted/50"}`}>
              <p className={`text-sm font-bold ${d.active ? "text-foreground" : "text-muted-foreground"}`}>{d.day}</p>
              <p className={`text-xs mt-1 ${d.active ? "text-primary" : "text-muted-foreground"}`}>{d.hours}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Rides */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="font-bold text-foreground">Scheduled Rides</h3>
          <span className="text-xs text-muted-foreground">{scheduledRides.length} upcoming</span>
        </div>
        <div className="divide-y divide-border">
          {scheduledRides.map((ride) => (
            <div key={ride.id} className="px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{ride.passenger}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {ride.pickup} → {ride.drop}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{ride.fare}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3" /> {ride.date}, {ride.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
