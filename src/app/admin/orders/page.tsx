"use client";

import { OrderManagementTable } from "@/components/admin";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <OrderManagementTable />
    </div>
  );
}
