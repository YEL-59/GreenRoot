"use client";

import React from "react";
import { OrderManagementTable } from "@/components/admin";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <OrderManagementTable />
    </div>
  );
}
