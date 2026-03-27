import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Filter, CheckCircle2, Clock, AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import { SEVERITY_CONFIG, STATUS_CONFIG, PRIORITY_CONFIG } from "@/lib/constants";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Complaint {
  id: string;
  complaint_id: string;
  problem_type: string;
  severity: string;
  confidence: number;
  priority: string;
  department: string;
  description: string | null;
  location_lat: number | null;
  location_lng: number | null;
  location_address: string | null;
  image_url: string | null;
  status: string;
  citizen_name: string | null;
  created_at: string;
  resolved_at: string | null;
}

const PIE_COLORS = ["#0891b2", "#059669", "#d97706", "#dc2626", "#7c3aed"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [view, setView] = useState<"table" | "map">("table");

  useEffect(() => {
    if (isAuthenticated) {
      fetchComplaints();
      const channel = supabase
        .channel("complaints-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "complaints" }, () => {
          fetchComplaints();
        })
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [isAuthenticated]);

  const fetchComplaints = async () => {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setComplaints(data);
  };

  const handleLogin = () => {
    if (password === "demo123") {
      setIsAuthenticated(true);
    } else {
      toast({ title: "Invalid password", variant: "destructive" });
    }
  };

  const markResolved = async (id: string) => {
    const { error } = await supabase
      .from("complaints")
      .update({ status: "resolved", resolved_at: new Date().toISOString() })
      .eq("id", id);
    if (!error) {
      toast({ title: "Marked as resolved ✅" });
      fetchComplaints();
    }
  };

  const markInProgress = async (id: string) => {
    const { error } = await supabase
      .from("complaints")
      .update({ status: "in_progress" })
      .eq("id", id);
    if (!error) {
      toast({ title: "Status updated" });
      fetchComplaints();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-sm shadow-elevated">
          <CardHeader className="text-center">
            <div className="h-1 tricolor-bar rounded-full mb-4" />
            <CardTitle className="font-display text-xl">Official Dashboard</CardTitle>
            <p className="text-sm text-muted-foreground">SwachhVision AI Admin Panel</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <Button onClick={handleLogin} className="w-full font-display">
              Access Dashboard
            </Button>
            <p className="text-xs text-center text-muted-foreground">Demo password: demo123</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filtered = complaints.filter((c) => {
    if (filterStatus !== "all" && c.status !== filterStatus) return false;
    if (filterSeverity !== "all" && c.severity !== filterSeverity) return false;
    return true;
  });

  const statusCounts = {
    new: complaints.filter(c => c.status === "new").length,
    in_progress: complaints.filter(c => c.status === "in_progress").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
  };

  const issueTypes = complaints.reduce((acc, c) => {
    const type = c.problem_type.split(" ").slice(0, 2).join(" ");
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(issueTypes).map(([name, value]) => ({ name, value }));

  const severityCounts = ["low", "medium", "high", "critical"].map(s => ({
    name: s.charAt(0).toUpperCase() + s.slice(1),
    count: complaints.filter(c => c.severity === s).length,
  }));

  const mapMarkers = filtered
    .filter(c => c.location_lat && c.location_lng)
    .map(c => ({
      lat: c.location_lat!,
      lng: c.location_lng!,
      label: `${c.problem_type} (${c.severity})`,
      severity: c.severity,
    }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-1 tricolor-bar" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold">Official Dashboard</h1>
            <p className="text-sm text-muted-foreground">Real-time civic complaints monitoring</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchComplaints}>
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-4 pb-3 text-center">
              <div className="text-3xl font-display font-bold text-foreground">{complaints.length}</div>
              <div className="text-xs text-muted-foreground">Total Complaints</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3 text-center">
              <div className="text-3xl font-display font-bold text-warning">{statusCounts.new}</div>
              <div className="text-xs text-muted-foreground">New</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3 text-center">
              <div className="text-3xl font-display font-bold text-primary">{statusCounts.in_progress}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 pb-3 text-center">
              <div className="text-3xl font-display font-bold text-success">{statusCounts.resolved}</div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">Issue Type Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name }) => name}>
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">No data yet</div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display">Severity Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={severityCounts}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(199, 89%, 32%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Severity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto flex gap-2">
            <Button variant={view === "table" ? "default" : "outline"} size="sm" onClick={() => setView("table")}>
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button variant={view === "map" ? "default" : "outline"} size="sm" onClick={() => setView("map")}>
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Map View */}
        {view === "map" && mapMarkers.length > 0 && (
          <Card className="mb-4">
            <CardContent className="p-0">
              <MapView
                lat={20.593}
                lng={78.963}
                markers={mapMarkers}
                className="h-[400px]"
                interactive
              />
            </CardContent>
          </Card>
        )}

        {/* Table */}
        {view === "table" && (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  <AlertTriangle className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>No complaints found. Submit one from the Report page!</p>
                </CardContent>
              </Card>
            ) : (
              filtered.map((c) => {
                const sevConf = SEVERITY_CONFIG[c.severity as keyof typeof SEVERITY_CONFIG];
                const statusConf = STATUS_CONFIG[c.status as keyof typeof STATUS_CONFIG];
                return (
                  <Card key={c.id} className="hover:border-primary/20 transition-colors">
                    <CardContent className="py-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {c.image_url && (
                          <img src={c.image_url} alt="" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-display font-semibold">{c.problem_type}</span>
                            <Badge className={`${sevConf?.color} text-primary-foreground text-xs`}>{c.severity}</Badge>
                            <Badge variant={statusConf?.variant}>{statusConf?.label}</Badge>
                          </div>
                          <div className="text-xs text-muted-foreground space-y-0.5">
                            <p>ID: <span className="font-mono">{c.complaint_id}</span> • {c.department}</p>
                            {c.location_address && <p>📍 {c.location_address}</p>}
                            <p>
                              <Clock className="inline h-3 w-3 mr-1" />
                              {new Date(c.created_at).toLocaleString("en-IN")}
                              {c.citizen_name && ` • By ${c.citizen_name}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          {c.status === "new" && (
                            <Button size="sm" variant="outline" onClick={() => markInProgress(c.id)}>
                              In Progress
                            </Button>
                          )}
                          {c.status !== "resolved" && (
                            <Button size="sm" onClick={() => markResolved(c.id)} className="bg-success hover:bg-success/90 text-primary-foreground">
                              <CheckCircle2 className="h-4 w-4 mr-1" /> Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
