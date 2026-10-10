"use client";

import { useState } from "react";
import Link from "next/link";
import { initialOrders } from "@/data/orders";
import { useLanguage } from "@/context/LanguageContext";

export default function CustomerInvoicesPage() {
  const { isBn } = useLanguage();
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  const invoices = initialOrders.map((order) => ({
    invoiceNo: `INV-${order.id.replace("GR-", "")}`,
    orderId: order.id,
    date: isBn ? (order.dateBn || order.date) : (order.date || order.dateBn),
    amount: order.total,
    status: isBn
      ? (order.paymentStatus === "paid" ? "পরিশোধিত (Paid)" : "বকেয়া (Due)")
      : (order.paymentStatus === "paid" ? "Paid" : "Due"),
    itemsCount: order.items.length,
    paymentMethod: order.paymentMethod,
    orderData: order,
  }));

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <Link href="/dashboard" className="hover:text-[#002719]">
              {isBn ? "ড্যাশবোর্ড" : "Dashboard"}
            </Link>
            <span>/</span>
            <span className="font-bold text-stone-900">
              {isBn ? "অফিশিয়াল ইনভয়েস ও রসিদ" : "Official Invoices & Receipts"}
            </span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900">
            {isBn ? "ট্যাক্স ইনভয়েস ও পেমেন্ট রসিদ" : "Tax Invoices & Payment Receipts"}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {isBn
              ? "সরকারি ভ্যাট ও ফার্ম কোড সম্বলিত আপনার সকল অর্ডারের অফিশিয়াল রসিদ।"
              : "Official VAT & BIN certified receipts for all your farm orders."}
          </p>
        </div>

        <div className="text-xs text-stone-500 bg-white p-3 rounded-2xl border border-stone-200">
          <span>{isBn ? "ফার্ম ভ্যাট নিবন্ধন নং: " : "Farm VAT BIN No: "}</span>
          <span className="font-mono font-bold text-stone-800">BIN-004128912-0101</span>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-extrabold text-stone-900 text-base">
            {isBn
              ? `সকল ডিজিটাল ইনভয়েস (${invoices.length} টি)`
              : `All Digital Invoices (${invoices.length})`}
          </h3>
          <span className="text-xs text-stone-400">
            {isBn ? "প্রতিটি রসিদ ১ ক্লিকে প্রিন্ট বা সংরক্ষণযোগ্য" : "1-click printable & verifiable receipts"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider font-semibold border-b border-stone-100">
              <tr>
                <th className="py-4 px-6">{isBn ? "ইনভয়েস নম্বর" : "Invoice No."}</th>
                <th className="py-4 px-6">{isBn ? "অর্ডার কোড" : "Order ID"}</th>
                <th className="py-4 px-6">{isBn ? "ইস্যুর তারিখ" : "Issue Date"}</th>
                <th className="py-4 px-6">{isBn ? "পেমেন্ট মেথড" : "Payment Method"}</th>
                <th className="py-4 px-6">{isBn ? "মোট পরিমাণ" : "Total Amount"}</th>
                <th className="py-4 px-6">{isBn ? "স্ট্যাটাস" : "Status"}</th>
                <th className="py-4 px-6 text-right">{isBn ? "অ্যাকশন" : "Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {invoices.map((inv) => (
                <tr key={inv.invoiceNo} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-4 px-6 font-mono font-bold text-stone-900">{inv.invoiceNo}</td>
                  <td className="py-4 px-6 font-mono text-emerald-800">{inv.orderId}</td>
                  <td className="py-4 px-6 text-stone-600">{inv.date}</td>
                  <td className="py-4 px-6 text-stone-700 capitalize">{inv.paymentMethod}</td>
                  <td className="py-4 px-6 font-extrabold text-stone-900">৳{inv.amount}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv.orderData)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#002719] hover:bg-emerald-900 text-[#E8AF30] font-bold text-xs shadow-sm transition-all inline-flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-file-invoice text-[11px]"></i>
                      {isBn ? "ইনভয়েস দেখুন" : "View Invoice"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-10 shadow-2xl relative my-8 print:p-0 print:shadow-none print:max-w-none">
            {/* Modal Controls (Hidden in Print) */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 print:hidden">
              <span className="text-xs font-bold text-stone-500 uppercase">
                {isBn ? "অফিশিয়াল ট্যাক্স চালানপত্র" : "Official Tax Invoice Sheet"}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-[#002719] hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-2"
                >
                  <i className="fa-solid fa-print"></i>
                  {isBn ? "প্রিন্ট / PDF সেভ" : "Print / Save PDF"}
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="w-8 h-8 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              </div>
            </div>

            {/* Printable Invoice Sheet */}
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-[#E8AF30] text-[#002719] flex items-center justify-center font-extrabold">
                      <i className="fa-solid fa-seedling text-sm"></i>
                    </div>
                    <h2 className="text-xl font-extrabold text-[#002719]">
                      {isBn ? "গ্রীনরুট এগ্রো অ্যান্ড ডেইরি" : "GreenRoot Agro & Dairy Ltd."}
                    </h2>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {isBn
                      ? "হেড অফিস ও ফার্ম: আনন্দপুর রোড, হেমায়েতপুর, সাভার, ঢাকা।"
                      : "Head Office & Farm: Anandapur Rd, Hemayetpur, Savar, Dhaka."}
                    <br />
                    {isBn
                      ? "হটলাইন: 01700-112233 | ইমেইল: billing@greenroot.farm"
                      : "Hotline: 01700-112233 | Email: billing@greenroot.farm"}
                    <br />
                    {isBn ? "ভ্যাট ও বিআইএন নিবন্ধন: " : "VAT & BIN Registration: "}
                    <b>BIN-004128912-0101</b>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-base font-extrabold text-stone-900 font-mono">
                    INV-{selectedInvoice.id.replace("GR-", "")}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {isBn ? "অর্ডার কোড: " : "Order ID: "}{selectedInvoice.id}
                  </div>
                  <div className="text-xs text-stone-500">
                    {isBn ? "তারিখ: " : "Date: "}{isBn ? (selectedInvoice.dateBn || selectedInvoice.date) : (selectedInvoice.date || selectedInvoice.dateBn)}
                  </div>
                  <div className="mt-2 inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {isBn ? "ক্যাশ অন ডেলিভারি / পরিশোধিত" : "Cash on Delivery / Paid"}
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 text-xs">
                <div className="font-bold text-stone-400 uppercase text-[10px] mb-1">
                  {isBn ? "গ্রাহকের ঠিকানা ও তথ্য (Billed To)" : "Customer Information (Billed To)"}
                </div>
                <div className="font-extrabold text-stone-900 text-sm">{selectedInvoice.shippingAddress.name}</div>
                <div className="text-stone-600">{selectedInvoice.shippingAddress.address}, {selectedInvoice.shippingAddress.district}, {selectedInvoice.shippingAddress.city}</div>
                <div className="text-stone-600 font-mono">
                  {isBn ? "ফোন: " : "Phone: "}{selectedInvoice.shippingAddress.phone}
                </div>
              </div>

              {/* Products Table */}
              <div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                    <tr>
                      <th className="py-2.5 px-3">{isBn ? "পণ্য বিবরণ" : "Item Description"}</th>
                      <th className="py-2.5 px-3 text-center">{isBn ? "পরিমাণ" : "Qty"}</th>
                      <th className="py-2.5 px-3 text-right">{isBn ? "একক মূল্য" : "Unit Price"}</th>
                      <th className="py-2.5 px-3 text-right">{isBn ? "মোট (BDT)" : "Total (BDT)"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {selectedInvoice.items.map((item: any) => (
                      <tr key={item.id}>
                        <td className="py-3 px-3">
                          <div className="font-bold text-stone-900">
                            {isBn ? item.titleBn : (item.title || item.titleBn)}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            {isBn ? item.title : item.titleBn}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-center font-bold">{item.quantity}</td>
                        <td className="py-3 px-3 text-right">৳{item.price}</td>
                        <td className="py-3 px-3 text-right font-extrabold">৳{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t border-stone-200 pt-4 flex justify-between items-start text-xs">
                <div className="max-w-xs text-[11px] text-stone-500 leading-relaxed">
                  {isBn
                    ? "* এটি একটি কম্পিউটার জেনারেটেড ডিজিটাল ইনভয়েস। ১০০% রাসায়নিকমুক্ত খাদ্য সুরক্ষা ও কোল্ড-চেইন স্ট্যান্ডার্ড বজায় রাখা হয়েছে।"
                    : "* This is a computer generated digital invoice. 100% chemical-free food safety and cold-chain integrity maintained."}
                </div>

                <div className="space-y-1.5 text-right w-48">
                  <div className="flex justify-between text-stone-600">
                    <span>{isBn ? "সাবটোটাল:" : "Subtotal:"}</span>
                    <span>৳{selectedInvoice.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>{isBn ? "ডেলিভারি চার্জ:" : "Delivery Fee:"}</span>
                    <span>৳{selectedInvoice.shippingFee}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-sm text-[#002719] pt-2 border-t border-stone-200">
                    <span>{isBn ? "সর্বমোট পরিশোধ:" : "Grand Total:"}</span>
                    <span>৳{selectedInvoice.total}</span>
                  </div>
                </div>
              </div>

              {/* Seal Stamp */}
              <div className="pt-4 flex items-center justify-between border-t border-dashed border-stone-200 text-stone-400 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full border border-emerald-600 text-emerald-700 flex items-center justify-center font-bold">
                    ✓
                  </span>
                  <span>
                    {isBn
                      ? "সার্টিফাইড অর্গানিক ও কোল্ড চেইন কোয়ালিটি অ্যাপ্রুভড"
                      : "Certified Organic & Cold Chain Quality Approved"}
                  </span>
                </div>
                <span>
                  {isBn
                    ? "অথরাইজড সিগনেচার: গ্রীনরুট ফার্মস বাংলাদেশ"
                    : "Authorized Signature: GreenRoot Farms Bangladesh"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
