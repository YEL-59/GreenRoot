"use client";

import React from "react";
import { ProductManagementTable } from "@/components/admin";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <ProductManagementTable />
    </div>
  );
}
