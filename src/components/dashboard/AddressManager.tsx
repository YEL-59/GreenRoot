"use client";
import type { FormEvent } from "react";

import { useState } from "react";
import type { UserAddress } from "@/types";
import { initialUserProfile } from "@/data/userProfile";

export const AddressManager = () => {
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

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200/90 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-black text-stone-900">সংরক্ষিত ডেলিভারি ঠিকানা (Address Book)</h3>
          <p className="text-xs text-stone-500">আপনার বাসা, অফিস ও খামারের ঠিকানাসমূহ পরিচালনা করুন</p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-bold transition-all shadow-sm"
        >
          <i className="fa-solid fa-plus text-[#E8AF30]"></i>
          <span>নতুন ঠিকানা যোগ করুন</span>
        </button>
      </div>

      {/* Add New Address Form Modal/Collapse */}
      {showAddForm && (
        <form
          onSubmit={handleAddAddress}
          className="mb-8 p-6 rounded-2xl bg-stone-50 border border-stone-200 animate-fadeIn"
        >
          <h4 className="text-sm font-extrabold text-stone-900 mb-4">নতুন ঠিকানার বিবরণ দিন</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ঠিকানার ধরন</label>
              <select
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#002719]"
              >
                <option value="Home">বাসা (Home)</option>
                <option value="Office">অফিস (Office)</option>
                <option value="Farm">ফার্ম হাউস (Farm House)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">প্রাপকের নাম *</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#002719]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">মোবাইল নম্বর *</label>
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
              <label className="block text-xs font-bold text-stone-700 mb-1">জেলা / শহর</label>
              <select
                value={newDistrict}
                onChange={(e) => setNewDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#002719]"
              >
                <option value="Dhaka">ঢাকা (Dhaka)</option>
                <option value="Chittagong">চট্টগ্রাম (Chittagong)</option>
                <option value="Sylhet">সিলেট (Sylhet)</option>
                <option value="Rajshahi">রাজশাহী (Rajshahi)</option>
                <option value="Khulna">খুলনা (Khulna)</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-stone-700 mb-1">বিস্তারিত ঠিকানা (বাড়ি, রোড, ফ্ল্যাট, থানা) *</label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="যেমন: বাড়ি ৪২, রোড ৭এ, ধানমন্ডি"
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#002719]"
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#002719] hover:bg-[#003824] text-white text-xs font-bold transition-all shadow-sm"
            >
              ঠিকানা সংরক্ষণ করুন
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-all"
            >
              বাতিল
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
                {addr.label}
              </span>

              {addr.isDefault ? (
                <span className="text-[11px] font-extrabold text-[#002719] bg-[#E8AF30]/30 border border-[#E8AF30] px-2 py-0.5 rounded">
                  ডিফল্ট ঠিকানা ✓
                </span>
              ) : (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="text-xs text-stone-500 hover:text-[#002719] font-semibold underline"
                >
                  ডিফল্ট করুন
                </button>
              )}
            </div>

            <h4 className="text-sm font-bold text-stone-900">{addr.recipientName}</h4>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">{addr.address}, {addr.district}</p>
            <p className="text-xs text-stone-500 mt-1 font-mono">মোবাইল: {addr.phone}</p>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleDelete(addr.id)}
                className="text-xs text-red-500 hover:text-red-700 font-bold"
              >
                মুছে ফেলুন
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
