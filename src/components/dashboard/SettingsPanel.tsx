import { useState } from "react";
import { motion } from "framer-motion";
import { User, Car, CreditCard, Shield, Bell, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPanel() {
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Profile */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Profile</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: "Rajesh Kumar" },
            { label: "Phone", value: "+91 98765 43210" },
            { label: "Email", value: "rajesh.kumar@email.com" },
            { label: "City", value: "Gurugram, Haryana" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs text-muted-foreground">{f.label}</label>
              <input defaultValue={f.value} className="mt-1 w-full px-3 py-2 rounded-lg bg-muted text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          ))}
        </div>
        <Button className="mt-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90" size="sm">Save Changes</Button>
      </div>

      {/* Vehicle */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Car className="w-4 h-4 text-primary" /> Vehicle Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Vehicle Model", value: "Maruti Swift Dzire" },
            { label: "Registration No.", value: "HR-26-AB-1234" },
            { label: "Color", value: "White" },
            { label: "Year", value: "2023" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs text-muted-foreground">{f.label}</label>
              <input defaultValue={f.value} className="mt-1 w-full px-3 py-2 rounded-lg bg-muted text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Receive ride requests and updates</p>
            </div>
            <Switch checked={pushNotif} onCheckedChange={setPushNotif} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Weekly earnings summary</p>
            </div>
            <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-1"><Globe className="w-3 h-3" /> Language</p>
            </div>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="px-3 py-1.5 rounded-lg bg-muted text-sm border border-border focus:outline-none text-foreground">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-card rounded-2xl border border-border p-6">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Security</h3>
        <div className="space-y-3">
          <Button variant="outline" className="rounded-xl w-full sm:w-auto">Change Password</Button>
          <Button variant="outline" className="rounded-xl w-full sm:w-auto ml-0 sm:ml-3 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">Delete Account</Button>
        </div>
      </div>
    </motion.div>
  );
}
