import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCheck, Gift, AlertTriangle, Info, Star } from "lucide-react";

const initialNotifications = [
  { id: 1, icon: Gift, title: "Weekend Bonus Activated!", desc: "Earn 1.5x on all trips this Saturday & Sunday.", time: "2 hours ago", read: false, color: "text-primary" },
  { id: 2, icon: Star, title: "New Rating Received", desc: "Meera Joshi gave you a 5-star rating. Keep it up!", time: "3 hours ago", read: false, color: "text-primary" },
  { id: 3, icon: AlertTriangle, title: "Document Expiring Soon", desc: "Your driving license expires on 15 Apr 2026. Please renew.", time: "1 day ago", read: false, color: "text-destructive" },
  { id: 4, icon: Info, title: "App Update Available", desc: "Version 3.2.1 is available with new features and bug fixes.", time: "2 days ago", read: true, color: "text-muted-foreground" },
  { id: 5, icon: Gift, title: "Referral Bonus Credited", desc: "₹500 credited for referring Amit Jain. Thanks!", time: "3 days ago", read: true, color: "text-success" },
  { id: 6, icon: Info, title: "Scheduled Maintenance", desc: "System maintenance on 30 Mar, 2–4 AM. Brief downtime expected.", time: "4 days ago", read: true, color: "text-muted-foreground" },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => setNotifications(notifications.map((n) => ({ ...n, read: true })));
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">{unreadCount}</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-primary hover:underline flex items-center gap-1">
              <CheckCheck className="w-3 h-3" /> Mark all read
            </button>
          )}
        </div>
        <div className="divide-y divide-border">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => setNotifications(notifications.map((x) => x.id === n.id ? { ...x, read: true } : x))}
              className={`px-5 py-4 flex items-start gap-4 cursor-pointer hover:bg-muted/50 transition-colors ${!n.read ? "bg-primary/5" : ""}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!n.read ? "bg-primary/10" : "bg-muted"}`}>
                <n.icon className={`w-5 h-5 ${n.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
