import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Building2, Hash, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEVERITY_CONFIG, PRIORITY_CONFIG } from "@/lib/constants";

interface AnalysisResult {
  problemType: string;
  severity: string;
  confidence: number;
  priority: string;
  department: string;
  complaintId: string;
  description: string;
}

interface Props {
  result: AnalysisResult;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitted: boolean;
}

export default function AnalysisResultCard({ result, onSubmit, isSubmitting, submitted }: Props) {
  const severityConfig = SEVERITY_CONFIG[result.severity as keyof typeof SEVERITY_CONFIG];
  const priorityConfig = PRIORITY_CONFIG[result.priority as keyof typeof PRIORITY_CONFIG];

  const shareOnWhatsApp = () => {
    const text = `🚨 Civic Issue Reported via SwachhVision AI\n\nProblem: ${result.problemType}\nSeverity: ${result.severity.toUpperCase()}\nDepartment: ${result.department}\nComplaint ID: ${result.complaintId}\n\n#SwachhBharat #SmartCity`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-elevated border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 font-display">
            <AlertTriangle className="h-5 w-5 text-accent" />
            AI Analysis Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Problem Type */}
          <div className="bg-muted rounded-lg p-4">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Problem Detected</div>
            <div className="text-xl font-display font-bold">{result.problemType}</div>
            <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Severity</div>
              <Badge className={`${severityConfig?.color} text-primary-foreground`}>
                {severityConfig?.label || result.severity}
              </Badge>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Confidence</div>
              <div className="font-display font-bold text-lg">{result.confidence}%</div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Priority</div>
              <div className="flex items-center gap-1">
                <span>{priorityConfig?.icon}</span>
                <span className="font-semibold text-sm">{result.priority}</span>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Complaint ID</div>
              <div className="flex items-center gap-1">
                <Hash className="h-3 w-3 text-muted-foreground" />
                <span className="font-mono text-sm font-bold">{result.complaintId}</span>
              </div>
            </div>
          </div>

          {/* Department */}
          <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-4 border border-primary/10">
            <Building2 className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Assigned Department</div>
              <div className="font-semibold text-sm">{result.department}</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            {!submitted ? (
              <Button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display"
              >
                <MapPin className="mr-2 h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit to Department"}
              </Button>
            ) : (
              <div className="flex-1 text-center py-3 bg-success/10 text-success rounded-lg font-semibold text-sm">
                ✅ Submitted Successfully!
              </div>
            )}
            <Button variant="outline" size="icon" onClick={shareOnWhatsApp} title="Share on WhatsApp">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
