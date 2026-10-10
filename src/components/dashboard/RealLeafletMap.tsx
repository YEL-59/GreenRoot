"use client";

import { useEffect, useRef, useState } from "react";
import type * as LeafletType from "leaflet";

type CheckpointCoord = {
  id: string;
  name: string;
  nameBn: string;
  lat: number;
  lng: number;
  time: string;
  status: "completed" | "in_transit" | "pending";
  temp?: string;
  desc: string;
  descBn: string;
};

const defaultCheckpoints: CheckpointCoord[] = [
  {
    id: "cp-1",
    name: "Savar Organic Farm Hub",
    nameBn: "সাভার অর্গানিক খামার হাব",
    lat: 23.8580,
    lng: 90.2660,
    time: "05:30 AM",
    status: "completed",
    temp: "3.8°C",
    desc: "Fresh morning raw milk packed & sealed in cold-storage vat.",
    descBn: "ভোরের তাজা গরুর দুধ কোল্ড-ভ্যাটে সিল ও প্যাকেটজাত সম্পন্ন।",
  },
  {
    id: "cp-2",
    name: "Gabtoli Cold Storage Center",
    nameBn: "গাবতলী কোল্ড স্টোরেজ সেন্টার",
    lat: 23.7845,
    lng: 90.3525,
    time: "07:15 AM",
    status: "completed",
    temp: "4.0°C",
    desc: "Dispatched from primary cold-hub into temperature-controlled bike.",
    descBn: "প্রাইমারি কোল্ড-হাব থেকে ইনসুলেটেড বাইক বক্সে লোডিং সম্পন্ন।",
  },
  {
    id: "cp-3",
    name: "Science Lab / Katabon (Active Rider)",
    nameBn: "রাইডার সাইন্সল্যাব মোড়ে (In Transit)",
    lat: 23.7385,
    lng: 90.3840,
    time: "08:45 AM (Current)",
    status: "in_transit",
    temp: "4.2°C",
    desc: "Rider Karim is moving at 24 km/h towards Dhanmondi.",
    descBn: "রাইডার করিম ২৪ কিমি/ঘণ্টা গতিতে ধানমন্ডির দিকে অগ্রসর হচ্ছেন।",
  },
  {
    id: "cp-4",
    name: "Customer Destination (Dhanmondi 7/A)",
    nameBn: "গন্তব্য: ধানমন্ডি ৭/এ (আপনার ঠিকানা)",
    lat: 23.7460,
    lng: 90.3755,
    time: "ETA: 09:15 AM",
    status: "pending",
    temp: "Target 4°C",
    desc: "House 42, Road 7/A, Dhanmondi, Dhaka.",
    descBn: "বাড়ি ৪২, রোড ৭/এ, ধানমন্ডি, ঢাকা।",
  },
];

// Realistic road corridor through Savar -> Hemayetpur -> Gabtoli -> Shyamoli -> Science Lab -> Dhanmondi
const routeCoordinates: [number, number][] = [
  [23.8580, 90.2660], // Savar Organic Farm Hub
  [23.8340, 90.2910], // Hemayetpur
  [23.8050, 90.3340], // Aminbazar Bridge crossing Turag River
  [23.7845, 90.3525], // Gabtoli Cold-Chain Logistics Hub
  [23.7710, 90.3620], // Kalyanpur
  [23.7580, 90.3700], // Shyamoli
  [23.7490, 90.3780], // Asad Gate
  [23.7385, 90.3840], // Science Lab Intersection (Current Rider Location)
  [23.7420, 90.3790], // Turning into Dhanmondi
  [23.7460, 90.3755], // Destination: Dhanmondi Road 7/A
];

type RealLeafletMapProps = {
  isBn?: boolean;
  selectedCheckpointId?: string;
  onSelectCheckpoint?: (id: string) => void;
};

export const RealLeafletMap = ({
  isBn = true,
  selectedCheckpointId = "cp-3",
  onSelectCheckpoint,
}: RealLeafletMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<LeafletType.Map | null>(null);
  const activeLayerRef = useRef<LeafletType.TileLayer | null>(null);
  const markersRef = useRef<{ [key: string]: LeafletType.Marker }>({});
  const LRef = useRef<typeof LeafletType | null>(null);

  const [mapType, setMapType] = useState<"dark" | "streets" | "satellite">("dark");
  const [riderCoords, setRiderCoords] = useState<[number, number]>([23.7385, 90.3840]);
  const [riderSpeed, setRiderSpeed] = useState("24 km/h");
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);

  // Layer URL sources
  const tileSources = {
    dark: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    streets: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles &copy; Esri",
    },
  };

  // Initialize Leaflet Map inside browser only
  useEffect(() => {
    let isMounted = true;
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    import("leaflet").then((leafletModule) => {
      if (!isMounted || !mapContainerRef.current) return;
      const L = leafletModule.default;
      LRef.current = L;

      // Center between Savar and Dhanmondi
      const map = L.map(mapContainerRef.current, {
        center: [23.7850, 90.3400],
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: true,
      });

      mapInstanceRef.current = map;

      // Add Initial Tile Layer
      const source = tileSources[mapType];
      const initialLayer = L.tileLayer(source.url, {
        attribution: source.attribution,
        maxZoom: 19,
      }).addTo(map);
      activeLayerRef.current = initialLayer;

      // Completed Route Polyline (Savar -> Science Lab)
      const completedSegment = routeCoordinates.slice(0, 8);
      L.polyline(completedSegment, {
        color: "#10b981",
        weight: 5,
        opacity: 0.85,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Remaining Route Polyline (Science Lab -> Dhanmondi)
      const remainingSegment = routeCoordinates.slice(7);
      L.polyline(remainingSegment, {
        color: "#E8AF30",
        weight: 5,
        opacity: 0.95,
        dashArray: "10, 8",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);

      // Custom DivIcons
      const farmIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%);">
            <div style="background:#059669; color:white; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 15px -3px rgba(0,0,0,0.5); border:3px solid white;">
              <i class="fa-solid fa-seedling" style="font-size:16px;"></i>
            </div>
            <div style="margin-top:4px; background:rgba(0,0,0,0.85); color:#ecfdf5; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:6px; border:1px solid #10b981; white-space:nowrap; box-shadow:0 4px 6px -1px rgba(0,0,0,0.4);">
              সাভার খামার হাব (05:30 AM)
            </div>
          </div>
        `,
        iconSize: [0, 0],
      });

      const warehouseIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%);">
            <div style="background:#0d9488; color:white; width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 15px -3px rgba(0,0,0,0.5); border:3px solid white;">
              <i class="fa-solid fa-warehouse" style="font-size:15px;"></i>
            </div>
            <div style="margin-top:4px; background:rgba(0,0,0,0.85); color:#ccfbf1; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:6px; border:1px solid #0d9488; white-space:nowrap; box-shadow:0 4px 6px -1px rgba(0,0,0,0.4);">
              গাবতলী কোল্ড হাব (07:15 AM)
            </div>
          </div>
        `,
        iconSize: [0, 0],
      });

      const riderIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%);">
            <div style="position:relative; width:46px; height:46px;">
              <div style="position:absolute; inset:-8px; border-radius:50%; background:rgba(232,175,48,0.35); animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>
              <div style="position:relative; background:#E8AF30; color:#002719; width:46px; height:46px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:900; box-shadow:0 10px 25px -3px rgba(232,175,48,0.7); border:3px solid #002719;">
                <i class="fa-solid fa-motorcycle"></i>
              </div>
            </div>
            <div style="margin-top:6px; background:#E8AF30; color:#002719; font-size:11px; font-weight:900; padding:3px 10px; border-radius:8px; border:1px solid #b45309; white-space:nowrap; box-shadow:0 4px 8px rgba(0,0,0,0.4); display:flex; align-items:center; gap:5px;">
              <span style="width:6px; height:6px; border-radius:50%; background:#002719; animation:pulse 1s infinite;"></span>
              রাইডার সাইন্সল্যাব (In Transit)
            </div>
          </div>
        `,
        iconSize: [0, 0],
      });

      const destinationIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%);">
            <div style="background:#ef4444; color:white; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 20px -3px rgba(239,68,68,0.6); border:3px solid white;">
              <i class="fa-solid fa-house-chimney" style="font-size:16px;"></i>
            </div>
            <div style="margin-top:4px; background:rgba(0,0,0,0.85); color:#fee2e2; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:6px; border:1px solid #ef4444; white-space:nowrap; box-shadow:0 4px 6px -1px rgba(0,0,0,0.4);">
              গন্তব্য: ধানমন্ডি ৭/এ
            </div>
          </div>
        `,
        iconSize: [0, 0],
      });

      // Add Markers to Map
      const cp1Marker = L.marker([23.8580, 90.2660], { icon: farmIcon })
        .bindPopup(`
          <div style="font-family:inherit; min-width:180px;">
            <b style="color:#059669; font-size:13px;">সাভার অর্গানিক খামার হাব</b>
            <div style="font-size:11px; color:#555; margin-top:3px;">সময়: সকাল ০৫:৩০ | স্ট্যাটাস: সম্পন্ন ✓</div>
            <div style="font-size:11px; color:#10b981; font-weight:bold; margin-top:2px;">কোল্ড চেইন টেম্প: ৩.৮° সেলসিয়াস</div>
          </div>
        `)
        .addTo(map);

      const cp2Marker = L.marker([23.7845, 90.3525], { icon: warehouseIcon })
        .bindPopup(`
          <div style="font-family:inherit; min-width:180px;">
            <b style="color:#0d9488; font-size:13px;">গাবতলী কোল্ড স্টোরেজ হাব</b>
            <div style="font-size:11px; color:#555; margin-top:3px;">সময়: সকাল ০৭:১৫ | স্ট্যাটাস: সম্পন্ন ✓</div>
            <div style="font-size:11px; color:#0d9488; font-weight:bold; margin-top:2px;">কোল্ড চেইন টেম্প: ৪.০° সেলসিয়াস</div>
          </div>
        `)
        .addTo(map);

      const cp3Marker = L.marker([23.7385, 90.3840], { icon: riderIcon })
        .bindPopup(`
          <div style="font-family:inherit; min-width:210px;">
            <b style="color:#b45309; font-size:13px;">রাইডার করিম (ইন ট্রানজিট)</b>
            <div style="font-size:11px; color:#555; margin-top:3px;">অবস্থান: সাইন্সল্যাব মোড় | গতি: ২৪ কিমি/ঘণ্টা</div>
            <div style="font-size:11px; color:#059669; font-weight:bold; margin-top:2px;">ইনসুলেটেড বক্স টেম্প: ৪.২° সেলসিয়াস</div>
            <div style="font-size:11px; color:#777; margin-top:4px;">গন্তব্যে পৌঁছাতে আনুমানিক ১৫ মিনিট বাকি</div>
          </div>
        `)
        .addTo(map);

      const cp4Marker = L.marker([23.7460, 90.3755], { icon: destinationIcon })
        .bindPopup(`
          <div style="font-family:inherit; min-width:190px;">
            <b style="color:#dc2626; font-size:13px;">ডেলিভারি গন্তব্য</b>
            <div style="font-size:11px; color:#555; margin-top:3px;">বাড়ি ৪২, রোড ৭/এ, ধানমন্ডি, ঢাকা</div>
            <div style="font-size:11px; color:#b45309; font-weight:bold; margin-top:2px;">আনুমানিক ডেলিভারি: সকাল ০৯:১৫</div>
          </div>
        `)
        .addTo(map);

      cp1Marker.on("click", () => onSelectCheckpoint?.("cp-1"));
      cp2Marker.on("click", () => onSelectCheckpoint?.("cp-2"));
      cp3Marker.on("click", () => onSelectCheckpoint?.("cp-3"));
      cp4Marker.on("click", () => onSelectCheckpoint?.("cp-4"));

      markersRef.current = {
        "cp-1": cp1Marker,
        "cp-2": cp2Marker,
        "cp-3": cp3Marker,
        "cp-4": cp4Marker,
      };

      // Auto-fit to route bounds
      const bounds = L.latLngBounds(routeCoordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Change Map Layer
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

  // Center on Selected Checkpoint
  const focusOnCheckpoint = (cpId: string) => {
    onSelectCheckpoint?.(cpId);
    const marker = markersRef.current[cpId];
    if (marker && mapInstanceRef.current) {
      const latlng = marker.getLatLng();
      mapInstanceRef.current.setView(latlng, 14, { animate: true });
      marker.openPopup();
    }
  };

  // Reset View to fit full route
  const fitFullRoute = () => {
    const L = LRef.current;
    if (!mapInstanceRef.current || !L) return;
    const bounds = L.latLngBounds(routeCoordinates);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], animate: true });
  };

  // Subtle live simulation of rider coordinates along path
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setRiderCoords((prev) => {
        const deltaLat = (Math.random() - 0.5) * 0.0003;
        const deltaLng = (Math.random() - 0.5) * 0.0003;
        const newCoords: [number, number] = [prev[0] + deltaLat, prev[1] + deltaLng];

        if (markersRef.current["cp-3"]) {
          markersRef.current["cp-3"].setLatLng(newCoords);
        }
        return newCoords;
      });

      const randomSpeed = Math.floor(21 + Math.random() * 6);
      setRiderSpeed(`${randomSpeed} km/h`);
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  return (
    <div className="relative w-full h-[420px] md:h-[500px] overflow-hidden select-none bg-stone-900">
      {/* Real Map Canvas DOM element */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Floating Control Bar: Map Layer Switcher & Live Radar Status */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left: Live Satellite/GPS Pill */}
        <div className="pointer-events-auto bg-[#002719]/90 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 text-white flex items-center gap-3 shadow-xl">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
              {isBn ? "লাইভ স্যাটেলাইট জিপিএস" : "Live Satellite GPS"}
            </div>
            <div className="text-xs font-extrabold text-white flex items-center gap-2">
              <span>{isBn ? "রাইডার স্পিড:" : "Rider Speed:"} <span className="text-[#E8AF30] font-mono">{riderSpeed}</span></span>
              <span>•</span>
              <span className="text-emerald-400 font-mono">৪.২°C</span>
            </div>
          </div>
        </div>

        {/* Right: Map Style Toggles (Dark Cold-Chain, Streets, Satellite) */}
        <div className="pointer-events-auto bg-black/75 backdrop-blur-md border border-white/20 rounded-2xl p-1 flex items-center gap-1 shadow-xl">
          <button
            onClick={() => handleLayerChange("dark")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mapType === "dark"
                ? "bg-[#E8AF30] text-[#002719] shadow-md"
                : "text-stone-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <i className="fa-solid fa-moon mr-1.5 text-[10px]"></i>
            {isBn ? "কোল্ড-চেইন ডার্ক" : "Dark Cold"}
          </button>
          <button
            onClick={() => handleLayerChange("streets")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mapType === "streets"
                ? "bg-[#E8AF30] text-[#002719] shadow-md"
                : "text-stone-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <i className="fa-solid fa-road mr-1.5 text-[10px]"></i>
            {isBn ? "রোড ম্যাপ" : "Streets"}
          </button>
          <button
            onClick={() => handleLayerChange("satellite")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              mapType === "satellite"
                ? "bg-[#E8AF30] text-[#002719] shadow-md"
                : "text-stone-300 hover:text-white hover:bg-white/10"
            }`}
          >
            <i className="fa-solid fa-earth-americas mr-1.5 text-[10px]"></i>
            {isBn ? "স্যাটেলাইট" : "Satellite"}
          </button>
        </div>
      </div>

      {/* Floating Map Legend & Checkpoint Shortcuts */}
      <div className="absolute bottom-4 left-4 z-[400] bg-black/80 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-white text-xs max-w-xs shadow-2xl hidden sm:block">
        <div className="font-bold text-[11px] text-[#E8AF30] uppercase mb-1.5 flex items-center justify-between">
          <span>{isBn ? "ম্যাপ চেকপয়েন্ট নির্দেশিকা" : "Map Checkpoint Legend"}</span>
          <span className="text-[10px] text-stone-400 font-mono">OpenStreetMap</span>
        </div>
        <div className="space-y-1.5">
          <button
            onClick={() => focusOnCheckpoint("cp-1")}
            className="w-full text-left flex items-center justify-between text-[11px] hover:text-emerald-300 p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span>সাভার খামার হাব (০৫:৩০ AM)</span>
            </span>
            <span className="text-emerald-400 font-bold">✓</span>
          </button>
          <button
            onClick={() => focusOnCheckpoint("cp-2")}
            className="w-full text-left flex items-center justify-between text-[11px] hover:text-teal-300 p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block"></span>
              <span>গাবতলী কোল্ড হাব (০৭:১৫ AM)</span>
            </span>
            <span className="text-emerald-400 font-bold">✓</span>
          </button>
          <button
            onClick={() => focusOnCheckpoint("cp-3")}
            className="w-full text-left flex items-center justify-between text-[11px] text-[#E8AF30] font-bold p-1 rounded-lg bg-white/10"
          >
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8AF30] inline-block animate-ping"></span>
              <span>রাইডার সাইন্সল্যাব (In Transit)</span>
            </span>
            <span className="text-xs">🏍️</span>
          </button>
          <button
            onClick={() => focusOnCheckpoint("cp-4")}
            className="w-full text-left flex items-center justify-between text-[11px] hover:text-rose-300 p-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
              <span>গন্তব্য: ধানমন্ডি ৭/এ</span>
            </span>
            <span className="text-stone-400">ETA 09:15</span>
          </button>
        </div>
      </div>

      {/* Map Action Buttons (Focus Rider, Fit Route, Fullscreen) */}
      <div className="absolute bottom-4 right-4 z-[400] flex flex-col gap-2">
        <button
          onClick={() => focusOnCheckpoint("cp-3")}
          className="w-11 h-11 rounded-2xl bg-[#E8AF30] hover:bg-amber-400 text-[#002719] flex items-center justify-center font-extrabold shadow-2xl transition-transform hover:scale-105"
          title={isBn ? "রাইডারের অবস্থানে যান" : "Focus on Rider"}
        >
          <i className="fa-solid fa-crosshairs text-base"></i>
        </button>
        <button
          onClick={fitFullRoute}
          className="w-11 h-11 rounded-2xl bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center font-bold shadow-2xl transition-transform hover:scale-105"
          title={isBn ? "পুরো রুট ভিউ" : "Fit Full Route"}
        >
          <i className="fa-solid fa-expand text-sm text-[#002719]"></i>
        </button>
      </div>
    </div>
  );
};
