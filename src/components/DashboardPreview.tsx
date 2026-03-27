import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Clock, Users, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const recentIssues = [
  {
    id: 1,
    type: "Pothole",
    severity: "High",
    location: "MG Road, Bangalore",
    status: "Assigned to Department",
    time: "2 hours ago",
    badgeColor: "priority-high"
  },
  {
    id: 2,
    type: "Garbage",
    severity: "Medium", 
    location: "Connaught Place, Delhi",
    status: "In Progress",
    time: "5 hours ago",
    badgeColor: "priority-medium"
  },
  {
    id: 3,
    type: "Streetlight",
    severity: "Low",
    location: "Marine Drive, Mumbai", 
    status: "Resolved",
    time: "1 day ago",
    badgeColor: "priority-low"
  }
];

const quickStats = [
  { label: "Total Issues", value: "1,245", icon: AlertTriangle, color: "text-orange-600" },
  { label: "Resolved", value: "892", icon: CheckCircle, color: "text-green-600" },
  { label: "Pending", value: "353", icon: AlertCircle, color: "text-yellow-600" },
  { label: "Active Users", value: "12.4K", icon: Users, color: "text-blue-600" }
];

export default function DashboardPreview() {
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
            Live Issue <span className="text-orange-600">Dashboard</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real-time monitoring of civic issues across Indian cities with AI-powered detection and automatic department routing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Dashboard Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold font-display text-gray-900">Recent Issues</h3>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Live Updates
                </Badge>
              </div>
              
              <div className="space-y-4">
                {recentIssues.map((issue, index) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{issue.type}</h4>
                          <Badge className={`${issue.badgeColor} text-white border-0`}>
                            {issue.severity}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {issue.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {issue.time}
                          </div>
                        </div>
                        <p className="text-sm font-medium text-blue-600">{issue.status}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 shadow-lg border border-orange-100">
              <h3 className="text-xl font-semibold font-display mb-6 text-gray-900">Quick Stats</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="bg-white rounded-xl p-4 text-center shadow-sm"
                  >
                    <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold font-display text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg">
                📤 Upload Complaint
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 transition-colors">
                📊 Generate Report
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg">
                🎨 Design Your Report
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
