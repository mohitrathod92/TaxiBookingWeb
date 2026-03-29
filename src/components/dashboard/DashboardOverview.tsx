import { motion } from "framer-motion";
import { Car, IndianRupee, Star, Clock, TrendingUp, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const stats = [
  { label: "Today's Trips", value: "12", icon: Car, change: "+3" },
  { label: "Today's Earnings", value: "₹1,840", icon: IndianRupee, change: "+₹420" },
  { label: "Avg. Rating", value: "4.87 ★", icon: Star, change: "+0.02" },
  { label: "Online Hours", value: "6.5 hrs", icon: Clock, change: "+1.5" },
];

const chartData = [
  { day: "Mon", earnings: 1200 },
  { day: "Tue", earnings: 1800 },
  { day: "Wed", earnings: 1400 },
  { day: "Thu", earnings: 2200 },
  { day: "Fri", earnings: 2800 },
  { day: "Sat", earnings: 3200 },
  { day: "Sun", earnings: 1840 },
];

const trips = [
  { id: "RX-2831", pickup: "Huda Metro", drop: "Cyber Hub", dist: "4.2 km", fare: "₹120", status: "Completed", date: "Today, 2:15 PM" },
  { id: "RX-2830", pickup: "Sec 45", drop: "MG Road", dist: "8.1 km", fare: "₹240", status: "Completed", date: "Today, 1:00 PM" },
  { id: "RX-2829", pickup: "DLF Phase 3", drop: "Sikanderpur", dist: "3.5 km", fare: "₹95", status: "Cancelled", date: "Today, 12:30 PM" },
  { id: "RX-2828", pickup: "IFFCO Chowk", drop: "Ambience Mall", dist: "2.8 km", fare: "₹80", status: "Completed", date: "Today, 11:45 AM" },
  { id: "RX-2827", pickup: "Golf Course Rd", drop: "Sohna Road", dist: "6.3 km", fare: "₹180", status: "Completed", date: "Today, 10:20 AM" },
];

const statusColor: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  Cancelled: "bg-destructive/10 text-destructive",
  Ongoing: "bg-primary/10 text-primary",
};

export default function DashboardOverview() {
  const [chartPeriod, setChartPeriod] = useState("Daily");

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-2xl border border-border p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-semibold text-success flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {s.change}
              </span>
            </div>
            <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-card rounded-2xl border border-border p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-foreground">Earnings Overview</h3>
          <div className="flex gap-2">
            {["Daily", "Weekly", "Monthly"].map((p) => (
              <button
                key={p}
                onClick={() => setChartPeriod(p)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  chartPeriod === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220,9%,46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220,9%,46%)" />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} />
              <Bar dataKey="earnings" fill="hsl(37,90%,55%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trips table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-border">
          <h3 className="font-bold text-foreground">Recent Trips</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search trips..." className="pl-9 pr-4 py-2 rounded-lg bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground w-48" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Trip ID", "Pickup", "Drop", "Distance", "Fare", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">{t.id}</td>
                  <td className="px-5 py-3.5 text-foreground">{t.pickup}</td>
                  <td className="px-5 py-3.5 text-foreground">{t.drop}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{t.dist}</td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">{t.fare}</td>
                  <td className="px-5 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[t.status]}`}>{t.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
