export const DEPARTMENTS = {
  pothole: "Roads & Highways Department",
  garbage: "Municipal Sanitation Department",
  water_leak: "Water Supply Board",
  streetlight: "Electricity Board",
  manhole: "Municipal Corporation – Drainage",
  road_damage: "Roads & Highways Department",
  flooding: "Water Supply Board",
  broken_footpath: "Municipal Corporation – Infrastructure",
  illegal_dumping: "Municipal Sanitation Department",
  other: "Municipal Corporation – General",
} as const;

export const SEVERITY_CONFIG = {
  low: { label: "Low", color: "bg-success", textColor: "text-success" },
  medium: { label: "Medium", color: "bg-warning", textColor: "text-warning" },
  high: { label: "High", color: "bg-accent", textColor: "text-accent" },
  critical: { label: "Critical", color: "bg-critical", textColor: "text-critical" },
} as const;

export const PRIORITY_CONFIG = {
  LOW: { label: "Low Priority", icon: "🟢" },
  MEDIUM: { label: "Medium Priority", icon: "🟡" },
  HIGH: { label: "High Priority", icon: "🟠" },
  URGENT: { label: "Urgent", icon: "🔴" },
} as const;

export const STATUS_CONFIG = {
  new: { label: "New", variant: "default" as const },
  in_progress: { label: "In Progress", variant: "secondary" as const },
  resolved: { label: "Resolved", variant: "outline" as const },
} as const;

export const SAMPLE_LOCATIONS = [
  { name: "Ludhiana Municipal Corporation", lat: 30.901, lng: 75.857 },
  { name: "Chandigarh Sector 17", lat: 30.741, lng: 76.779 },
  { name: "Amritsar Golden Temple Area", lat: 31.620, lng: 74.876 },
  { name: "Delhi Connaught Place", lat: 28.632, lng: 77.219 },
  { name: "Mumbai Marine Drive", lat: 18.944, lng: 72.824 },
  { name: "Bangalore MG Road", lat: 12.975, lng: 77.607 },
  { name: "Jaipur Hawa Mahal", lat: 26.924, lng: 75.827 },
  { name: "Hyderabad Charminar", lat: 17.362, lng: 78.474 },
];

export function generateComplaintId(): string {
  const prefix = "SV";
  const date = new Date();
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}-${dateStr}-${random}`;
}
