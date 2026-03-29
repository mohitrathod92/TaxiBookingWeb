import { useState } from "react";
import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, TrendingDown, Wallet, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const weeklyData = [
  { day: "Mon", earnings: 1200 },
  { day: "Tue", earnings: 1800 },
  { day: "Wed", earnings: 1400 },
  { day: "Thu", earnings: 2200 },
  { day: "Fri", earnings: 2800 },
  { day: "Sat", earnings: 3200 },
  { day: "Sun", earnings: 1840 },
];

const monthlyData = [
  { week: "Week 1", earnings: 8500 },
  { week: "Week 2", earnings: 9200 },
  { week: "Week 3", earnings: 7800 },
  { week: "Week 4", earnings: 10400 },
];

const transactions = [
  { id: "TXN-001", type: "Trip Earnings", amount: "+₹240", date: "Today, 1:00 PM", method: "Cash" },
  { id: "TXN-002", type: "Trip Earnings", amount: "+₹120", date: "Today, 2:15 PM", method: "UPI" },
  { id: "TXN-003", type: "Bonus", amount: "+₹50", date: "Today, 3:00 PM", method: "Wallet" },
  { id: "TXN-004", type: "Withdrawal", amount: "-₹2,000", date: "Yesterday", method: "Bank Transfer" },
  { id: "TXN-005", type: "Trip Earnings", amount: "+₹180", date: "Yesterday", method: "Card" },
];

export default function Earnings() {
  const [period, setPeriod] = useState<"Weekly" | "Monthly">("Weekly");

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "This Week", value: "₹14,440", change: "+12%", up: true, icon: IndianRupee },
          { label: "Wallet Balance", value: "₹3,250", change: "", up: true, icon: Wallet },
          { label: "Pending Payout", value: "₹1,840", change: "Next: Tomorrow", up: true, icon: ArrowUpRight },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
            {s.change && (
              <p className={`text-xs mt-1 flex items-center gap-1 ${s.up ? "text-success" : "text-destructive"}`}>
                {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {s.change}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-foreground">Earnings Trend</h3>
          <div className="flex gap-2">
            {(["Weekly", "Monthly"] as const).map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${period === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {period === "Weekly" ? (
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220,9%,46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220,9%,46%)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} />
                <Bar dataKey="earnings" fill="hsl(37,90%,55%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : (
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,91%)" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(220,9%,46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220,9%,46%)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid hsl(220,13%,91%)" }} />
                <Line type="monotone" dataKey="earnings" stroke="hsl(37,90%,55%)" strokeWidth={3} dot={{ fill: "hsl(37,90%,55%)", r: 5 }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="font-bold text-foreground">Recent Transactions</h3>
        </div>
        <div className="divide-y divide-border">
          {transactions.map((t) => (
            <div key={t.id} className="px-5 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
              <div>
                <p className="text-sm font-semibold text-foreground">{t.type}</p>
                <p className="text-xs text-muted-foreground">{t.date} · {t.method}</p>
              </div>
              <span className={`text-sm font-bold ${t.amount.startsWith("+") ? "text-success" : "text-destructive"}`}>{t.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
