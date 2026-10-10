"use client";
import type { FormEvent } from "react";

import { useState } from "react";
import type { UserAddress } from "@/types";
import { initialUserProfile } from "@/data/userProfile";
import { useLanguage } from "@/context/LanguageContext";

export const AddressManager = () => {
  const { isBn } = useLanguage();
  const [addresses, setAddresses] = useState<UserAddress[]>(initialUserProfile.addresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState<"Home" | "Office" | "Farm">("Home");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newDistrict, setNewDistrict] = useState("Dhaka");

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleAddAddress = (e: FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone || !newAddress) return;

    const newEntry: UserAddress = {
      id: `addr-${Date.now()}`,
      label: newLabel,
      recipientName: newName,
      phone: newPhone,
      address: newAddress,
      district: newDistrict,
      city: newDistrict,
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newEntry]);
    setShowAddForm(false);
    setNewName("");
    setNewPhone("");
    setNewAddress("");
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const getLabelText = (label: string) => {
    if (label === "Home") return isBn ? "বাসা (Home)" : "Home";
    if (label === "Office") return isBn ? "অফিস (Office)" : "Office";
    return isBn ? "ফার্ম হাউস (Farm House)" : "Farm House";
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-stone-900">
            {isBn ? "সংরক্ষিত ডেলিভারি ঠিকানা (Address Book)" : "Saved Delivery Addresses"}
          </h3>
          <p className="text-xs text-stone-500">
            {isBn
              ? "আপনার বাসা, অফিস ও খামারের ঠিকানাসমূহ পরিচালনা করুন"
              : "Manage delivery addresses for your home, office, and farmstead"}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-bold transition-all shadow-sm"
        >
          <i className="fa-solid fa-plus text-[#E8AF30]"></i>
          <span>{isBn ? "নতুন ঠিকানা যোগ করুন" : "Add New Address"}</span>
        </button>
      </div>

      {/* Add New Address Form Modal/Collapse */}
      {showAddForm && (
        <form
          onSubmit={handleAddAddress}
          className="mb-8 p-6 rounded-2xl bg-stone-50 border border-stone-200 animate-fadeIn"
        >
          <h4 className="text-sm font-extrabold text-stone-900 mb-4">
            {isBn ? "নতুন ঠিকানার বিবরণ দিন" : "Enter New Address Details"}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isBn ? "ঠিকানার ধরন" : "Address Type"}
              </label>
              <select
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#002719]"
              >
                <option value="Home">{isBn ? "বাসা (Home)" : "Home"}</option>
                <option value="Office">{isBn ? "অফিস (Office)" : "Office"}</option>
                <option value="Farm">{isBn ? "ফার্ম হাউস (Farm House)" : "Farm House"}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isBn ? "প্রাপকের নাম *" : "Recipient Name *"}
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={isBn ? "যেমন: তানভীর আহমেদ" : "e.g. Tanvir Ahmed"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#002719]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isBn ? "মোবাইল নম্বর *" : "Mobile Number *"}
              </label>
              <input
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="017xxxxxxxx"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#002719]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {isBn ? "জেলা / শহর" : "District / City"}
              </label>
              <select
                value={newDistrict}
                onChange={(e) => setNewDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#002719]"
              >
                <option value="Dhaka">{isBn ? "ঢাকা (Dhaka)" : "Dhaka"}</option>
                <option value="Chittagong">{isBn ? "চট্টগ্রাম (Chittagong)" : "Chittagong"}</option>
                <option value="Sylhet">{isBn ? "সিলেট (Sylhet)" : "Sylhet"}</option>
                <option value="Rajshahi">{isBn ? "রাজশাহী (Rajshahi)" : "Rajshahi"}</option>
                <option value="Khulna">{isBn ? "খুলনা (Khulna)" : "Khulna"}</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-stone-700 mb-1">
              {isBn ? "বিস্তারিত ঠিকানা (বাড়ি, রোড, ফ্ল্যাট, থানা) *" : "Detailed Street Address (House, Road, Area) *"}
            </label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder={isBn ? "যেমন: বাড়ি ৪২, রোড ৭এ, ধানমন্ডি" : "e.g. House 42, Road 7A, Dhanmondi"}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#002719]"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-bold transition-all shadow-sm"
            >
              {isBn ? "ঠিকানা সংরক্ষণ করুন" : "Save Address"}
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-all"
            >
              {isBn ? "বাতিল" : "Cancel"}
            </button>
          </div>
        </form>
      )}

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-2xl border transition-all ${
              addr.isDefault
                ? "bg-amber-50/40 border-[#E8AF30] shadow-sm ring-1 ring-[#E8AF30]/40"
                : "bg-white border-stone-200 hover:border-stone-300"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#002719] text-white">
                <i
                  className={
                    addr.label === "Home"
                      ? "fa-solid fa-house"
                      : addr.label === "Office"
                      ? "fa-solid fa-briefcase"
                      : "fa-solid fa-seedling"
                  }
                ></i>
                {getLabelText(addr.label)}
              </span>

              {addr.isDefault ? (
                <span className="text-[11px] font-extrabold text-[#002719] bg-[#E8AF30]/30 border border-[#E8AF30] px-2 py-0.5 rounded">
                  {isBn ? "ডিফল্ট ঠিকানা ✓" : "Default Address ✓"}
                </span>
              ) : (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="text-xs text-stone-500 hover:text-[#002719] font-semibold underline"
                >
                  {isBn ? "ডিফল্ট করুন" : "Set as Default"}
                </button>
              )}
            </div>

            <h4 className="text-sm font-bold text-stone-900">{addr.recipientName}</h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">{addr.address}, {addr.district}</p>
            <p className="text-xs text-stone-500 mt-1 font-mono">
              {isBn ? "মোবাইল: " : "Phone: "}{addr.phone}
            </p>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleDelete(addr.id)}
                className="text-xs text-red-500 hover:text-red-700 font-bold"
              >
                {isBn ? "মুছে ফেলুন" : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
