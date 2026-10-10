"use client";

import { useEffect, useRef, useState } from "react";
import type * as LeafletType from "leaflet";
import { useLanguage } from "@/context/LanguageContext";

type FleetCourier = {
  id: string;
  name: string;
  vehicle: "bike" | "van";
  zone: string;
  zoneBn: string;
  lat: number;
  lng: number;
  status: "delivering" | "idle" | "returning";
  statusBn: string;
  delivered: number;
  total: number;
  boxTemp: string;
  speed: string;
  battery: string;
  phone: string;
};

const activeCouriers: FleetCourier[] = [
  {
    id: "fl-01",
    name: "Rider Karim (করিম)",
    vehicle: "bike",
    zone: "Dhanmondi & Lalmatia",
    zoneBn: "ধানমন্ডি ও লালমাটিয়া জোন",
    lat: 23.7385,
    lng: 90.3840,
    status: "delivering",
    statusBn: "ডেলিভারি চলছে",
    delivered: 8,
    total: 10,
    boxTemp: "4.2°C",
    speed: "24 km/h",
    battery: "82%",
    phone: "01711-223344",
  },
  {
    id: "fl-02",
    name: "Rider Shakib (সাকিব)",
    vehicle: "bike",
    zone: "Gulshan & Banani",
    zoneBn: "গুলশান ও বনানী জোন",
    lat: 23.7925,
    lng: 90.4078,
    status: "delivering",
    statusBn: "ডেলিভারি চলছে",
    delivered: 14,
    total: 15,
    boxTemp: "3.9°C",
    speed: "18 km/h",
    battery: "68%",
    phone: "01822-334455",
  },
  {
    id: "fl-03",
    name: "Rider Tanvir (তানভীর)",
    vehicle: "bike",
    zone: "Uttara & Airport",
    zoneBn: "উত্তরা ও বিমানবন্দর জোন",
    lat: 23.8759,
    lng: 90.3795,
    status: "delivering",
    statusBn: "ডেলিভারি চলছে",
    delivered: 11,
    total: 14,
    boxTemp: "4.1°C",
    speed: "28 km/h",
    battery: "91%",
    phone: "01933-445566",
  },
  {
    id: "fl-04",
    name: "Cold-Van 01 (রেফ্রিজারেটেড ভ্যান ১)",
    vehicle: "van",
    zone: "Savar to Gabtoli Trunk Line",
    zoneBn: "সাভার খামার হতে গাবতলী ট্রাঙ্ক লাইন",
    lat: 23.8200,
    lng: 90.3100,
    status: "delivering",
    statusBn: "বাল্ক মিল্ক ট্রানজিট",
    delivered: 4,
    total: 5,
    boxTemp: "3.4°C",
    speed: "45 km/h",
    battery: "Diesel Fleet",
    phone: "01644-556677",
  },
  {
    id: "fl-05",
    name: "Cold-Van 02 (রেফ্রিজারেটেড ভ্যান ২)",
    vehicle: "van",
    zone: "Bashundhara & Badda",
    zoneBn: "বসুন্ধরা ও বাড্ডা আবাসিক জোন",
    lat: 23.8150,
    lng: 90.4300,
    status: "delivering",
    statusBn: "ডেলিভারি চলছে",
    delivered: 9,
    total: 12,
    boxTemp: "3.8°C",
    speed: "22 km/h",
    battery: "Diesel Fleet",
    phone: "01755-667788",
  },
];

type AdminFleetMapProps = {
  isBn?: boolean;
};

export const AdminFleetMap = ({ isBn: propIsBn }: AdminFleetMapProps) => {
  const { isBn: contextIsBn } = useLanguage();
  const isBn = propIsBn !== undefined ? propIsBn : contextIsBn;
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletType.Map | null>(null);
  const activeLayerRef = useRef<LeafletType.TileLayer | null>(null);
  const markersRef = useRef<{ [key: string]: LeafletType.Marker }>({});
  const LRef = useRef<typeof LeafletType | null>(null);

  const [selectedCourierId, setSelectedCourierId] = useState<string>("fl-01");
  const [mapType, setMapType] = useState<"dark" | "streets" | "satellite">("dark");
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  const tileSources = {
    dark: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    streets: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles &copy; Esri",
    },
  };

  useEffect(() => {
    let isMounted = true;
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    import("leaflet").then((leafletModule) => {
      if (!isMounted || !mapContainerRef.current) return;
      const L = leafletModule.default;
      LRef.current = L;

      // Centered over Greater Dhaka
      const map = L.map(mapContainerRef.current, {
        center: [23.8103, 90.3800],
        zoom: 11,
        zoomControl: false,
      });
      mapInstanceRef.current = map;

      const source = tileSources[mapType];
      const initialLayer = L.tileLayer(source.url, {
        attribution: source.attribution,
        maxZoom: 19,
      }).addTo(map);
      activeLayerRef.current = initialLayer;

      // Plot Savar Farm HQ Base
      const farmHqIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%);">
            <div style="background:#059669; color:white; width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 25px rgba(5,150,105,0.6); border:3px solid white;">
              <i class="fa-solid fa-seedling" style="font-size:20px;"></i>
            </div>
            <div style="margin-top:4px; background:#002719; color:#A7F3D0; font-size:11px; font-weight:900; padding:3px 8px; border-radius:6px; border:1px solid #059669; white-space:nowrap;">
              গ্রীনরুট ফার্ম হেডকোয়ার্টার (Savar HQ)
            </div>
          </div>
        `,
        iconSize: [0, 0],
      });

      L.marker([23.8580, 90.2660], { icon: farmHqIcon })
        .bindPopup("<b>গ্রীনরুট সাভার এগ্রো অ্যান্ড ডেইরি হেডকোয়ার্টার</b><br>সেন্ট্রাল প্রসেসিং ও কোল্ড চেইন হাব।")
        .addTo(map);

      // Plot each Courier
      activeCouriers.forEach((courier) => {
        const isVan = courier.vehicle === "van";
        const iconHtml = `
          <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); cursor:pointer;">
            <div style="position:relative; width:42px; height:42px;">
              <div style="position:absolute; inset:-6px; border-radius:50%; background:${isVan ? "rgba(59,130,246,0.3)" : "rgba(232,175,48,0.35)"}; animation:ping 1.6s infinite;"></div>
              <div style="position:relative; background:${isVan ? "#2563eb" : "#E8AF30"}; color:${isVan ? "white" : "#002719"}; width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:17px; font-weight:900; border:2.5px solid white; box-shadow:0 8px 20px rgba(0,0,0,0.5);">
                <i class="fa-solid ${isVan ? "fa-truck" : "fa-motorcycle"}"></i>
              </div>
            </div>
            <div style="margin-top:4px; background:rgba(0,0,0,0.88); color:${isVan ? "#93c5fd" : "#fef08a"}; font-size:10px; font-weight:bold; padding:2px 7px; border-radius:6px; border:1px solid ${isVan ? "#3b82f6" : "#eab308"}; white-space:nowrap;">
              ${courier.name}
            </div>
          </div>
        `;

        const markerIcon = L.divIcon({
          className: "custom-leaflet-marker",
          html: iconHtml,
          iconSize: [0, 0],
        });

        const marker = L.marker([courier.lat, courier.lng], { icon: markerIcon })
          .bindPopup(`
            <div style="font-family:inherit; min-width:190px;">
              <b style="color:${isVan ? "#2563eb" : "#d97706"}; font-size:13px;">${courier.name}</b>
              <div style="font-size:11px; color:#555; margin-top:2px;">জোন: ${courier.zoneBn}</div>
              <div style="font-size:11px; color:#059669; font-weight:bold; margin-top:2px;">কোল্ড বক্স টেম্প: ${courier.boxTemp}</div>
              <div style="font-size:11px; color:#666;">ডেলিভারি সম্পন্ন: ${courier.delivered}/${courier.total} টি অর্ডার</div>
              <div style="font-size:11px; color:#111; font-weight:bold; margin-top:2px;">গতি: ${courier.speed} | ফোন: ${courier.phone}</div>
            </div>
          `)
          .addTo(map);

        marker.on("click", () => {
          setSelectedCourierId(courier.id);
        });

        markersRef.current[courier.id] = marker;
      });
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleLayerChange = (newType: "dark" | "streets" | "satellite") => {
    setMapType(newType);
    const L = LRef.current;
    if (!mapInstanceRef.current || !L) return;

    if (activeLayerRef.current) {
      mapInstanceRef.current.removeLayer(activeLayerRef.current);
    }

    const source = tileSources[newType];
    const newLayer = L.tileLayer(source.url, {
      attribution: source.attribution,
      maxZoom: 19,
    }).addTo(mapInstanceRef.current);

    activeLayerRef.current = newLayer;
  };

  const selectCourier = (courierId: string) => {
    setSelectedCourierId(courierId);
    const marker = markersRef.current[courierId];
    if (marker && mapInstanceRef.current) {
      mapInstanceRef.current.setView(marker.getLatLng(), 14, { animate: true });
      marker.openPopup();
    }
  };

  const selectedCourier = activeCouriers.find((c) => c.id === selectedCourierId) || activeCouriers[0];

  return (
    <div className="space-y-6">
      {/* Top Telemetry Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-lg">
            <i className="fa-solid fa-truck-fast"></i>
          </div>
          <div>
            <div className="text-[11px] text-stone-400 uppercase font-semibold">সক্রিয় ফ্লিট ভ্যান ও বাইক</div>
            <div className="text-xl font-extrabold text-white">৫ টি অন-রোড</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center text-lg">
            <i className="fa-solid fa-box-open"></i>
          </div>
          <div>
            <div className="text-[11px] text-stone-400 uppercase font-semibold">আজকের মোট ডেলিভারি</div>
            <div className="text-xl font-extrabold text-white">৪৬ / ৫৬ সম্পন্ন</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-lg">
            <i className="fa-solid fa-temperature-arrow-down"></i>
          </div>
          <div>
            <div className="text-[11px] text-stone-400 uppercase font-semibold">গড় কোল্ড-চেইন তাপমাত্রা</div>
            <div className="text-xl font-extrabold text-cyan-400">৩.৮° সেলসিয়াস</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center text-lg">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div>
            <div className="text-[11px] text-stone-400 uppercase font-semibold">অন-টাইম ডেলিভারি রেট</div>
            <div className="text-xl font-extrabold text-white">৯৮.৪%</div>
          </div>
        </div>
      </div>

      {/* Main Interactive Map & Dispatch Console Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Real Leaflet Map Container (8 Cols) */}
        <div className="lg:col-span-8 bg-[#0a2318] rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
          <div className="p-4 bg-black/40 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                লাইভ ঢাকা মেট্রো ডেলিভারি ফ্লিট জিপিএস (Real-Time GPS)
              </span>
            </div>

            {/* Layer Toggles */}
            <div className="bg-black/60 rounded-xl p-1 flex items-center gap-1 border border-white/10">
              <button
                onClick={() => handleLayerChange("dark")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  mapType === "dark" ? "bg-[#E8AF30] text-[#002719]" : "text-stone-300 hover:text-white"
                }`}
              >
                ডার্ক অপস
              </button>
              <button
                onClick={() => handleLayerChange("streets")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  mapType === "streets" ? "bg-[#E8AF30] text-[#002719]" : "text-stone-300 hover:text-white"
                }`}
              >
                স্ট্রিট
              </button>
              <button
                onClick={() => handleLayerChange("satellite")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  mapType === "satellite" ? "bg-[#E8AF30] text-[#002719]" : "text-stone-300 hover:text-white"
                }`}
              >
                স্যাটেলাইট
              </button>
            </div>
          </div>

          {/* Leaflet Canvas */}
          <div className="relative w-full h-[520px]">
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>
        </div>

        {/* Courier List & Quick Dispatch Panel (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white/5 rounded-3xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-white text-base">অন-ডিউটি রাইডার ও ভ্যান</h3>
              <button
                onClick={() => setShowDispatchModal(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#E8AF30] to-amber-500 text-[#002719] text-xs font-extrabold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
              >
                <i className="fa-solid fa-plus text-xs"></i>
                নতুন অর্ডার অ্যাসাইন
              </button>
            </div>

            <div className="space-y-3">
              {activeCouriers.map((courier) => {
                const isSelected = courier.id === selectedCourierId;
                return (
                  <div
                    key={courier.id}
                    onClick={() => selectCourier(courier.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#059669]/20 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50"
                        : "bg-white/[0.03] border-white/5 hover:bg-white/[0.08]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                            courier.vehicle === "van"
                              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          <i className={`fa-solid ${courier.vehicle === "van" ? "fa-truck" : "fa-motorcycle"}`}></i>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{courier.name}</h4>
                          <span className="text-[11px] text-stone-400">{courier.zoneBn}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        {courier.boxTemp}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] bg-black/30 p-2 rounded-xl">
                      <div>
                        <div className="text-stone-400">ডেলিভারি</div>
                        <div className="font-bold text-white">{courier.delivered}/{courier.total}</div>
                      </div>
                      <div>
                        <div className="text-stone-400">গতিবেগ</div>
                        <div className="font-bold text-[#E8AF30] font-mono">{courier.speed}</div>
                      </div>
                      <div>
                        <div className="text-stone-400">ব্যাটারি/ফুয়েল</div>
                        <div className="font-bold text-emerald-400">{courier.battery}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Courier Inspector Card */}
          <div className="bg-gradient-to-br from-emerald-950/40 to-[#002719] rounded-3xl p-5 border border-emerald-500/30 text-white shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                নির্বাচিত রাইডার প্রোফাইল
              </span>
              <span className="text-xs font-mono text-[#E8AF30]">GPS ID: {selectedCourier.id}</span>
            </div>
            <h4 className="text-lg font-extrabold mb-1">{selectedCourier.name}</h4>
            <p className="text-xs text-stone-300 mb-4">{selectedCourier.zoneBn}</p>

            <div className="flex gap-2">
              <a
                href={`tel:${selectedCourier.phone}`}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <i className="fa-solid fa-phone text-xs"></i>
                সরাসরি কল করুন
              </a>
              <button
                onClick={() => alert(`রাইডার ${selectedCourier.name}-কে মেসেজ পাঠানো হয়েছে!`)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <i className="fa-solid fa-message text-xs"></i>
                মেসেজ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatch Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#071911] border border-white/20 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <h3 className="font-extrabold text-lg text-white">নতুন ডেলিভারি অ্যাসাইন করুন</h3>
              <button onClick={() => setShowDispatchModal(false)} className="text-stone-400 hover:text-white">
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowDispatchModal(false);
                setDispatchedSuccess(true);
                setTimeout(() => setDispatchedSuccess(false), 3000);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-stone-300 block mb-1">অর্ডার নম্বর নির্বাচন করুন</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]">
                  <option value="GR-2026-9021" className="bg-stone-900">GR-2026-9021 (উত্তরা - খাঁটি গরুর দুধ ও ঘি)</option>
                  <option value="GR-2026-9022" className="bg-stone-900">GR-2026-9022 (ধানমন্ডি - সুন্দরবনের মধু)</option>
                  <option value="GR-2026-9023" className="bg-stone-900">GR-2026-9023 (গুলশান - অর্গানিক শাকসবজি বক্স)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-300 block mb-1">রাইডার নির্বাচন করুন</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]">
                  {activeCouriers.map((c) => (
                    <option key={c.id} value={c.id} className="bg-stone-900">
                      {c.name} ({c.zoneBn})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-300 block mb-1">অগ্রাধিকার লেভেল</label>
                <select className="w-full px-3 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#E8AF30]">
                  <option className="bg-stone-900">সকাল ১০:০০ এর মধ্যে (সুপার ফাস্ট কোল্ড ডেলিভারি)</option>
                  <option className="bg-stone-900">দুপুর ১২:০০ এর মধ্যে (স্ট্যান্ডার্ড)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] font-extrabold text-xs shadow-lg transition-all"
                >
                  রাইডারের ডিভাইসে পুশ নোটিফিকেশন পাঠান
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dispatched Toast */}
      {dispatchedSuccess && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <i className="fa-solid fa-circle-check text-sm"></i>
          অর্ডার সফলভাবে রাইডারের হ্যান্ডহেল্ড ডিভাইসে পাঠানো হয়েছে!
        </div>
      )}
    </div>
  );
};
