"use client";

import { useState } from "react";
import type { Order, OrderStatus } from "@/types";
import { initialOrders } from "@/data/orders";
import { useLanguage } from "@/context/LanguageContext";

export const OrderManagementTable = () => {
  const { isBn } = useLanguage();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: OrderStatus) => {
    const statusLabels: Record<OrderStatus, string> = {
      pending: isBn ? "নতুন অর্ডার (Pending)" : "New Order (Pending)",
      confirmed: isBn ? "নিশ্চিত হয়েছে (Confirmed)" : "Confirmed",
      processing: isBn ? "প্যাকেজিং চলছে (Processing)" : "Processing",
      shipped: isBn ? "কুরিয়ারে হস্তান্তর (Shipped)" : "Shipped",
      out_for_delivery: isBn ? "ডেলিভারির পথে (Out for Delivery)" : "Out for Delivery",
      delivered: isBn ? "ডেলিভারি সম্পন্ন (Delivered)" : "Delivered",
      cancelled: isBn ? "বাতিল (Cancelled)" : "Cancelled",
    };

    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: newStatus, statusBn: statusLabels[newStatus] } : o
      )
    );
  };

  return (
    <div className="bg-[#0b2218] border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl text-white">
      {/* Table Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] text-[#E8AF30] font-bold uppercase tracking-wider block">
            {isBn ? "অর্ডার ফুলফিলমেন্ট ও ডেলিভারি" : "Order Fulfillment & Logistics"}
          </span>
          <h3 className="text-xl font-extrabold text-white">
            {isBn
              ? `গ্রাহক অর্ডার তালিকা (${filteredOrders.length} টি)`
              : `Customer Orders (${filteredOrders.length} Total)`}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isBn ? "অর্ডার ID বা ফোন খুঁজুন..." : "Search order ID or phone..."}
              className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#E8AF30] w-48 sm:w-60"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#E8AF30]"
          >
            <option value="all">{isBn ? "সকল স্ট্যাটাস" : "All Statuses"}</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-stone-400 uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">{isBn ? "অর্ডার আইডি ও তারিখ" : "Order ID & Date"}</th>
              <th className="py-3 px-4">{isBn ? "গ্রাহক ও ফোন" : "Customer & Phone"}</th>
              <th className="py-3 px-4">{isBn ? "ঠিকানা ও জোন" : "Address & Zone"}</th>
              <th className="py-3 px-4">{isBn ? "মোট বিল & পেমেন্ট" : "Total & Payment"}</th>
              <th className="py-3 px-4">{isBn ? "ডেলিভারি স্ট্যাটাস" : "Delivery Status"}</th>
              <th className="py-3 px-4 text-right">{isBn ? "ইনভয়েস" : "Invoice"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredOrders.map((o) => (
              <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-mono font-bold text-white text-sm">{o.id}</div>
                  <div className="text-[10px] text-stone-400">{isBn ? o.dateBn : o.date}</div>
                </td>

                <td className="py-3.5 px-4">
                  <div className="font-bold text-white">{o.customerName}</div>
                  <div className="text-[11px] text-stone-400 font-mono">{o.customerPhone}</div>
                </td>

                <td className="py-3.5 px-4 max-w-[200px]">
                  <div className="text-xs text-stone-300 truncate">{o.shippingAddress.address}</div>
                  <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-white/5 text-stone-400">
                    {o.shippingAddress.zone === "dhaka"
                      ? isBn
                        ? "ঢাকা সিটি (৳৬০)"
                        : "Dhaka Metro (৳60)"
                      : isBn
                      ? "ঢাকার বাইরে (৳১২০)"
                      : "Outside Dhaka (৳120)"}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <div className="text-sm font-extrabold text-white font-mono">৳{o.total}</div>
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                      o.paymentMethod === "cod"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {o.paymentMethod === "cod"
                      ? isBn
                        ? "ক্যাশ অন ডেলিভারি"
                        : "Cash on Delivery"
                      : isBn
                      ? "বিকাশ / পেইড"
                      : "bKash / Prepaid"}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <select
                    value={o.status}
                    onChange={(e) => handleUpdateStatus(o.id, e.target.value as OrderStatus)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${
                      o.status === "delivered"
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                        : o.status === "out_for_delivery"
                        ? "bg-amber-950/80 text-amber-300 border-amber-500/40 animate-pulse"
                        : o.status === "processing"
                        ? "bg-purple-950/80 text-purple-300 border-purple-500/40"
                        : "bg-stone-900 text-stone-300 border-white/20"
                    }`}
                  >
                    <option value="pending">{isBn ? "পেন্ডিং (Pending)" : "Pending"}</option>
                    <option value="confirmed">{isBn ? "নিশ্চিত (Confirmed)" : "Confirmed"}</option>
                    <option value="processing">{isBn ? "প্যাকেজিং (Processing)" : "Processing"}</option>
                    <option value="shipped">{isBn ? "শিপড (Shipped)" : "Shipped"}</option>
                    <option value="out_for_delivery">{isBn ? "ডেলিভারির পথে (Out for Delivery)" : "Out for Delivery"}</option>
                    <option value="delivered">{isBn ? "ডেলিভার্ড (Delivered)" : "Delivered"}</option>
                    <option value="cancelled">{isBn ? "বাতিল (Cancelled)" : "Cancelled"}</option>
                  </select>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => setSelectedOrder(o)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white inline-flex items-center justify-center transition-colors"
                    title={isBn ? "বিস্তারিত দেখুন" : "View invoice details"}
                  >
                    <i className="fa-solid fa-file-invoice text-xs text-[#E8AF30]"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b2218] border border-white/20 rounded-3xl w-full max-w-xl text-white shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] text-[#E8AF30] font-bold uppercase tracking-wider block">
                  {isBn ? "অর্ডার মেমো ও ইনভয়েস" : "Order Memo & Invoice"}
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  {isBn ? `ইনভয়েস #${selectedOrder.id}` : `Invoice #${selectedOrder.id}`}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <div className="font-bold text-white mb-1">
                  {isBn ? "গ্রাহকের তথ্য:" : "Customer Details:"}
                </div>
                <div>{isBn ? "নাম: " : "Name: "}{selectedOrder.customerName}</div>
                <div>{isBn ? "মোবাইল: " : "Phone: "}{selectedOrder.customerPhone}</div>
                <div>
                  {isBn ? "ঠিকানা: " : "Address: "}
                  {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.district}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-stone-300 mb-2">
                  {isBn ? "অর্ডারের আইটেম সমূহ:" : "Order Items:"}
                </div>
                <div className="space-y-2">
                  {selectedOrder.items.map((it) => (
                    <div key={it.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={it.image}
                          alt={isBn ? it.titleBn : it.title}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <span>
                          {isBn ? it.titleBn : it.title} ({it.unit} × {it.quantity})
                        </span>
                      </div>
                      <span className="font-mono font-bold">৳{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#002719] border border-white/10 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-400">{isBn ? "সাবটোটাল:" : "Subtotal:"}</span>
                  <span>৳{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">{isBn ? "ডেলিভারি চার্জ:" : "Delivery Fee:"}</span>
                  <span>৳{selectedOrder.shippingFee}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-[#E8AF30] pt-1.5 border-t border-white/10">
                  <span>{isBn ? "সর্বমোট বিল:" : "Total Payable:"}</span>
                  <span>৳{selectedOrder.total}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 rounded-xl bg-[#E8AF30] text-[#002719] text-xs font-extrabold shadow-md cursor-pointer"
              >
                {isBn ? "বন্ধ করুন" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
