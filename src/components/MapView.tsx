import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  lat: number;
  lng: number;
  markers?: Array<{ lat: number; lng: number; label: string; severity?: string }>;
  className?: string;
  interactive?: boolean;
  onLocationSelect?: (lat: number, lng: number) => void;
}

const severityColors: Record<string, string> = {
  critical: "#e53e3e",
  high: "#ed8936",
  medium: "#ecc94b",
  low: "#48bb78",
};

export default function MapView({ lat, lng, markers, className = "", interactive = false, onLocationSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    const map = L.map(mapRef.current, {
      scrollWheelZoom: interactive,
      dragging: interactive,
      zoomControl: interactive,
    }).setView([lat, lng], markers && markers.length > 1 ? 5 : 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    if (markers && markers.length > 0) {
      markers.forEach((m) => {
        const color = severityColors[m.severity || "low"] || "#3182ce";
        const icon = L.divIcon({
          className: "custom-marker",
          html: `<div style="width:14px;height:14px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        L.marker([m.lat, m.lng], { icon }).addTo(map).bindPopup(m.label);
      });

      if (markers.length > 1) {
        const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    } else {
      L.marker([lat, lng]).addTo(map);
    }

    if (onLocationSelect) {
      map.on("click", (e: L.LeafletMouseEvent) => {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng, markers, interactive, onLocationSelect]);

  return <div ref={mapRef} className={`rounded-lg overflow-hidden ${className}`} style={{ minHeight: "250px" }} />;
}
