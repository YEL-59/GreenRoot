"use client";

import { AddressManager } from "@/components/dashboard";
import { useLanguage } from "@/context/LanguageContext";

export default function UserAddressesPage() {
  const { isBn } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
            {isBn ? "সংরক্ষিত ঠিকানা (Saved Addresses)" : "Saved Addresses (Address Book)"}
          </h2>
          <p className="text-xs text-stone-500">
            {isBn
              ? "দ্রুত চেকআউটের জন্য আপনার ডেলিভারি ঠিকানাসমূহ প্রস্তুত রাখুন"
              : "Manage your home, office, and farm destination addresses for fast 1-click checkout"}
          </p>
        </div>
      </div>

      <AddressManager />
    </div>
  );
}

