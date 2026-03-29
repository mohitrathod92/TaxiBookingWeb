import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const allTrips = [
  { id: "RX-2831", pickup: "Huda Metro", drop: "Cyber Hub", dist: "4.2 km", fare: "₹120", status: "Completed", date: "28 Mar, 2:15 PM", passenger: "Meera Joshi" },
  { id: "RX-2830", pickup: "Sec 45", drop: "MG Road", dist: "8.1 km", fare: "₹240", status: "Completed", date: "28 Mar, 1:00 PM", passenger: "Arjun Patel" },
  { id: "RX-2829", pickup: "DLF Phase 3", drop: "Sikanderpur", dist: "3.5 km", fare: "₹95", status: "Cancelled", date: "28 Mar, 12:30 PM", passenger: "Priya Singh" },
  { id: "RX-2828", pickup: "IFFCO Chowk", drop: "Ambience Mall", dist: "2.8 km", fare: "₹80", status: "Completed", date: "28 Mar, 11:45 AM", passenger: "Rahul Verma" },
  { id: "RX-2827", pickup: "Golf Course Rd", drop: "Sohna Road", dist: "6.3 km", fare: "₹180", status: "Completed", date: "28 Mar, 10:20 AM", passenger: "Anita Sharma" },
  { id: "RX-2826", pickup: "Sector 14", drop: "Cyber City", dist: "5.1 km", fare: "₹150", status: "Completed", date: "27 Mar, 6:30 PM", passenger: "Vikram Rao" },
  { id: "RX-2825", pickup: "MG Road", drop: "Sector 29", dist: "3.8 km", fare: "₹110", status: "Completed", date: "27 Mar, 4:15 PM", passenger: "Neha Gupta" },
  { id: "RX-2824", pickup: "Udyog Vihar", drop: "Rajiv Chowk", dist: "12.5 km", fare: "₹380", status: "Cancelled", date: "27 Mar, 2:00 PM", passenger: "Suresh Kumar" },
  { id: "RX-2823", pickup: "Huda Market", drop: "Galleria", dist: "4.0 km", fare: "₹115", status: "Completed", date: "27 Mar, 11:00 AM", passenger: "Deepa Nair" },
  { id: "RX-2822", pickup: "Sector 56", drop: "South City", dist: "2.5 km", fare: "₹75", status: "Completed", date: "27 Mar, 9:30 AM", passenger: "Amit Jain" },
];

const statusColor: Record<string, string> = {
  Completed: "bg-success/10 text-success",
  Cancelled: "bg-destructive/10 text-destructive",
};

export default function MyTrips() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const filtered = allTrips.filter((t) => {
    if (filter !== "All" && t.status !== filter) return false;
    if (search && !t.pickup.toLowerCase().includes(search.toLowerCase()) && !t.drop.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border">
          <h3 className="font-bold text-foreground text-lg">My Trips</h3>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {["All", "Completed", "Cancelled"].map((f) => (
                <button key={f} onClick={() => { setFilter(f); setPage(1); }} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} type="text" placeholder="Search..." className="pl-9 pr-4 py-2 rounded-lg bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground w-40" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Trip ID", "Passenger", "Pickup", "Drop", "Distance", "Fare", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-foreground">{t.id}</td>
                  <td className="px-5 py-3.5 text-foreground">{t.passenger}</td>
                  <td className="px-5 py-3.5 text-foreground flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" />{t.pickup}</td>
                  <td className="px-5 py-3.5 text-foreground">{t.drop}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{t.dist}</td>
                  <td className="px-5 py-3.5 font-semibold text-foreground">{t.fare}</td>
                  <td className="px-5 py-3.5"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[t.status]}`}>{t.status}</span></td>
                  <td className="px-5 py-3.5 text-muted-foreground">{t.date}</td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="px-5 py-10 text-center text-muted-foreground">No trips found</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 flex items-center justify-between border-t border-border">
            <p className="text-xs text-muted-foreground">Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-40"><ChevronLeft className="w-4 h-4" /></button>
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-40"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
