import { motion } from "framer-motion";
import { CheckCircle, Star, Users, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Bangalore",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    issue: "Large pothole on MG Road",
    reportedDate: "March 15, 2024",
    resolvedDate: "March 18, 2024",
    rating: 5,
    comment: "Amazing! I reported a pothole and it was fixed in just 3 days. The AI detection was spot on and the updates were real-time.",
    status: "resolved"
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Delhi",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    issue: "Garbage accumulation in park",
    reportedDate: "March 10, 2024",
    resolvedDate: "March 12, 2024",
    rating: 5,
    comment: "The system automatically detected the issue severity and routed it to the right department. Very impressed with the efficiency!",
    status: "resolved"
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    issue: "Broken streetlight",
    reportedDate: "March 20, 2024",
    resolvedDate: "In Progress",
    rating: 4,
    comment: "Great initiative! The AI correctly identified the issue and I can track the progress. Looking forward to quick resolution.",
    status: "in-progress"
  }
];

const impactStats = [
  { label: "Issues Resolved", value: "8,932", icon: CheckCircle, color: "text-green-600" },
  { label: "Active Users", value: "34.5K", icon: Users, color: "text-blue-600" },
  { label: "Success Rate", value: "94%", icon: TrendingUp, color: "text-orange-600" }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-gray-900">
            Citizen <span className="text-orange-600">Success Stories</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from citizens who have experienced the power of AI-driven civic issue reporting.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {impactStats.map((stat, index) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-lg text-center">
              <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-3xl font-bold font-display text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                  <Badge className={
                    testimonial.status === 'resolved' 
                      ? 'bg-green-100 text-green-800 border-0' 
                      : 'bg-blue-100 text-blue-800 border-0'
                  }>
                    {testimonial.status === 'resolved' ? 'Fixed' : 'In Progress'}
                  </Badge>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{testimonial.comment}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="text-xs text-gray-500 mb-1">
                    <strong>Issue:</strong> {testimonial.issue}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span><strong>Reported:</strong> {testimonial.reportedDate}</span>
                    <span><strong>Resolved:</strong> {testimonial.resolvedDate}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold font-display mb-4">
              Join the Movement for a Better India
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Be part of the solution. Report civic issues and help us build cleaner, safer cities for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-50 transition-colors">
                Report an Issue Now
              </button>
              <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
