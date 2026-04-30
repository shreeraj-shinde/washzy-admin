"use client";

import { Droplets, Receipt, Users, Star } from "lucide-react";
import { Stat } from "@/shared/ui/Stat";
import { useJobsSummary } from "../hooks/useJobs";

export function JobsStatStrip() {
  const { data } = useJobsSummary();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Stat
        icon={<Droplets size={18} />}
        label="Total Washes"
        value={(data?.totalWashes ?? 0).toLocaleString("en-IN")}
      />
      <Stat
        icon={<Receipt size={18} />}
        label="Revenue Today"
        value={`₹${(data?.revenueTodayInr ?? 0).toLocaleString("en-IN")}`}
        iconBg="bg-accent-300/30"
        iconColor="text-accent-text"
      />
      <Stat
        icon={<Users size={18} />}
        label="Unique Customers"
        value={(data?.uniqueCustomers ?? 0).toLocaleString("en-IN")}
        iconBg="bg-navy-50"
        iconColor="text-navy-900"
      />
      <Stat
        icon={<Star size={18} />}
        label="Avg Rating"
        value={(data?.avgRating ?? 0).toFixed(1)}
        iconBg="bg-teal-50"
        iconColor="text-teal-900"
      />
    </div>
  );
}
