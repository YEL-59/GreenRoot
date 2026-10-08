"use client";

import { AddressManager } from "@/components/dashboard";

export default function UserAddressesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            সংরক্ষিত ঠিকানা (Saved Addresses)
          </h2>
          <p className="text-xs text-stone-500">
            দ্রুত চেকআউটের জন্য আপনার ডেলিভারি ঠিকানাসমূহ প্রস্তুত রাখুন
          </p>
        </div>
      </div>

      <AddressManager />
    </div>
  );
}
