import { motion } from "framer-motion";
import { Camera, CheckCircle, AlertTriangle, Clock, ArrowRight, Brain, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const aiResults = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    detectedLabel: "Severe Road Damage",
    confidence: 94,
    department: "Road Maintenance Department",
    severity: "High",
    location: "MG Road, Bangalore - 12.9716°N, 77.5946°E"
  }
];

const processingSteps = [
  { icon: Camera, label: "Image Upload", status: "completed" },
  { icon: Brain, label: "AI Analysis", status: "completed" },
  { icon: Target, label: "Issue Classification", status: "completed" },
  { icon: ArrowRight, label: "Department Routing", status: "active" }
];

export default function AIResultSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
            AI <span className="text-orange-600">Detection Results</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how our AI system analyzes and categorizes civic issues in real-time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-xl font-semibold font-display mb-4 text-gray-900">Uploaded Image</h3>
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={aiResults[0].image}
                  alt="Road damage"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white border-0">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    High Severity
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900">{aiResults[0].location}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Upload Time:</span>
                  <span className="font-medium text-gray-900">2 mins ago</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - AI Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 shadow-lg border border-orange-100">
              <h3 className="text-xl font-semibold font-display mb-6 text-gray-900">AI Analysis</h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Detected Issue</span>
                    <Badge className="bg-orange-600 text-white border-0">
                      {aiResults[0].confidence}% Confidence
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {aiResults[0].detectedLabel}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-2">Assigned Department</div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="font-medium text-gray-900">{aiResults[0].department}</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-3">Processing Status</div>
                  <div className="space-y-2">
                    {processingSteps.map((step, index) => (
                      <div key={step.label} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-100' : 
                          step.status === 'active' ? 'bg-blue-100 animate-pulse' : 'bg-gray-100'
                        }`}>
                          <step.icon className={`h-4 w-4 ${
                            step.status === 'completed' ? 'text-green-600' : 
                            step.status === 'active' ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{step.label}</div>
                          <div className="text-xs text-gray-500">
                            {step.status === 'completed' ? 'Completed' : 
                             step.status === 'active' ? 'Processing...' : 'Pending'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm Report
              </Button>
              <Button variant="outline" className="flex-1">
                <Camera className="mr-2 h-4 w-4" />
                Upload Another
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
