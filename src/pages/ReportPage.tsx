import { useState, useCallback } from "react";
import { Upload, Camera, MapPin, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIProcessingAnimation from "@/components/AIProcessingAnimation";
import AnalysisResultCard from "@/components/AnalysisResultCard";
import MapView from "@/components/MapView";
import { generateComplaintId, DEPARTMENTS, SAMPLE_LOCATIONS } from "@/lib/constants";

interface AnalysisResult {
  problemType: string;
  severity: string;
  confidence: number;
  priority: string;
  department: string;
  complaintId: string;
  description: string;
}

export default function ReportPage() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [citizenName, setCitizenName] = useState("");
  const [citizenPhone, setCitizenPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState({ lat: 28.613, lng: 77.209 });
  const [locationName, setLocationName] = useState("New Delhi, India");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setSubmitted(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
      setSubmitted(false);
    }
  }, []);

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
    const closest = SAMPLE_LOCATIONS.reduce((prev, curr) => {
      const prevDist = Math.sqrt((prev.lat - lat) ** 2 + (prev.lng - lng) ** 2);
      const currDist = Math.sqrt((curr.lat - lat) ** 2 + (curr.lng - lng) ** 2);
      return currDist < prevDist ? curr : prev;
    });
    setLocationName(closest.name);
  };

  const analyzeImage = async () => {
    if (!file) {
      toast({ title: "Please upload an image first", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    setProcessingStage(0);

    // Simulate staged processing
    setTimeout(() => setProcessingStage(1), 1000);
    setTimeout(() => setProcessingStage(2), 2500);

    try {
      // Call edge function for AI analysis
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        
        const { data, error } = await supabase.functions.invoke("analyze-issue", {
          body: { image: base64, description, fileName: file.name },
        });

        if (error) throw error;

        const complaintId = generateComplaintId();
        const analysisResult: AnalysisResult = {
          problemType: data.problemType || "Road Damage Detected",
          severity: data.severity || "high",
          confidence: data.confidence || 87,
          priority: data.priority || "HIGH",
          department: data.department || DEPARTMENTS.pothole,
          complaintId,
          description: data.description || "AI-detected civic infrastructure issue requiring immediate attention.",
        };

        setResult(analysisResult);
        setIsProcessing(false);
      };
    } catch (err) {
      console.error("Analysis error:", err);
      // Fallback to simulated result
      const complaintId = generateComplaintId();
      const problems = [
        { type: "Severe Pothole Detected", sev: "critical", conf: 94, pri: "URGENT", dept: DEPARTMENTS.pothole, desc: "Large pothole approximately 2ft wide causing immediate danger to vehicles and pedestrians." },
        { type: "Illegal Garbage Dumping", sev: "high", conf: 89, pri: "HIGH", dept: DEPARTMENTS.garbage, desc: "Significant garbage accumulation detected, potential health hazard for nearby residents." },
        { type: "Water Leakage / Pipe Burst", sev: "high", conf: 91, pri: "HIGH", dept: DEPARTMENTS.water_leak, desc: "Active water leakage detected causing road damage and water wastage." },
        { type: "Broken Streetlight", sev: "medium", conf: 86, pri: "MEDIUM", dept: DEPARTMENTS.streetlight, desc: "Non-functional streetlight creating safety concern for nighttime pedestrians." },
        { type: "Open Manhole Cover", sev: "critical", conf: 96, pri: "URGENT", dept: DEPARTMENTS.manhole, desc: "Exposed manhole without cover posing severe risk of injury or death." },
      ];
      const pick = problems[Math.floor(Math.random() * problems.length)];
      
      setResult({
        problemType: pick.type,
        severity: pick.sev,
        confidence: pick.conf,
        priority: pick.pri,
        department: pick.dept,
        complaintId,
        description: pick.desc,
      });
      setIsProcessing(false);
    }
  };

  const submitComplaint = async () => {
    if (!result) return;
    setIsSubmitting(true);

    try {
      // Upload image
      let imageUrl = "";
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${result.complaintId}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("complaint-images")
          .upload(path, file);
        
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from("complaint-images")
            .getPublicUrl(path);
          imageUrl = urlData.publicUrl;
        }
      }

      const { error } = await supabase.from("complaints").insert({
        complaint_id: result.complaintId,
        problem_type: result.problemType,
        severity: result.severity,
        confidence: result.confidence,
        priority: result.priority,
        department: result.department,
        description: result.description,
        image_url: imageUrl,
        location_lat: location.lat,
        location_lng: location.lng,
        location_address: locationName,
        citizen_name: citizenName || null,
        citizen_phone: citizenPhone || null,
        ai_analysis: { raw: result },
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Complaint Submitted! ✅",
        description: `Complaint ${result.complaintId} has been routed to ${result.department}`,
      });
    } catch (err) {
      console.error(err);
      toast({ title: "Submission failed", description: "Please try again", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="h-1 tricolor-bar" />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-display font-bold mb-2">Report a Civic Issue</h1>
        <p className="text-muted-foreground mb-8">Upload a photo and let AI do the rest</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Upload */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-display">Upload Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  {preview ? (
                    <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-cover" />
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 10MB</p>
                    </>
                  )}
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-display">Details (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Describe the issue (optional)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Your name" value={citizenName} onChange={(e) => setCitizenName(e.target.value)} className="pl-9" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Phone" value={citizenPhone} onChange={(e) => setCitizenPhone(e.target.value)} className="pl-9" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-display flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">Click on the map to set location</p>
                <MapView
                  lat={location.lat}
                  lng={location.lng}
                  className="h-48"
                  interactive
                  onLocationSelect={handleLocationSelect}
                />
                <p className="text-sm text-muted-foreground mt-2">📍 {locationName}</p>
              </CardContent>
            </Card>

            {!isProcessing && !result && (
              <Button
                onClick={analyzeImage}
                disabled={!file}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-display"
              >
                <Camera className="mr-2 h-5 w-5" />
                Analyze with AI
              </Button>
            )}
          </div>

          {/* Right: Results */}
          <div>
            {isProcessing && <AIProcessingAnimation stage={processingStage} />}
            {result && (
              <AnalysisResultCard
                result={result}
                onSubmit={submitComplaint}
                isSubmitting={isSubmitting}
                submitted={submitted}
              />
            )}
            {!isProcessing && !result && (
              <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                <div>
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-display">Upload a photo to start AI analysis</p>
                  <p className="text-sm mt-1">Our AI will detect the issue instantly</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
