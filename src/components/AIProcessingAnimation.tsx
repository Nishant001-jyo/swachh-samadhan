import { motion } from "framer-motion";
import { Scan, Brain, CheckCircle2 } from "lucide-react";

const stages = [
  { icon: Scan, label: "Scanning image..." },
  { icon: Brain, label: "AI analyzing problem..." },
  { icon: CheckCircle2, label: "Generating report..." },
];

export default function AIProcessingAnimation({ stage = 0 }: { stage?: number }) {
  return (
    <div className="flex flex-col items-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary mb-8"
      />
      
      <div className="space-y-3 w-full max-w-xs">
        {stages.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: i <= stage ? 1 : 0.3 }}
            className="flex items-center gap-3"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              i < stage ? "bg-success/20 text-success" :
              i === stage ? "bg-primary/20 text-primary animate-pulse" :
              "bg-muted text-muted-foreground"
            }`}>
              <s.icon className="h-4 w-4" />
            </div>
            <span className={`text-sm font-medium ${
              i <= stage ? "text-foreground" : "text-muted-foreground"
            }`}>
              {s.label}
            </span>
            {i < stage && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto text-success text-xs"
              >
                ✓
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
