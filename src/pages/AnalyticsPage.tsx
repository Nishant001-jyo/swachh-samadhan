import { useState } from 'react';
import { BarChart3, TrendingUp, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const analyticsData = {
  totalIssues: 12458,
  resolvedIssues: 9832,
  pendingIssues: 2626,
  activeUsers: 34500,
  citiesCovered: 48,
  avgResolutionTime: 3.2,
  monthlyTrend: [
    { month: 'Jan', issues: 850, resolved: 720 },
    { month: 'Feb', issues: 920, resolved: 810 },
    { month: 'Mar', issues: 1050, resolved: 950 },
    { month: 'Apr', issues: 1180, resolved: 1050 },
    { month: 'May', issues: 1320, resolved: 1180 },
    { month: 'Jun', issues: 1458, resolved: 1302 },
  ],
  issueTypes: [
    { type: 'Potholes', count: 4520, percentage: 36.3, color: 'bg-red-500' },
    { type: 'Garbage', count: 3120, percentage: 25.1, color: 'bg-yellow-500' },
    { type: 'Streetlights', count: 2100, percentage: 16.9, color: 'bg-blue-500' },
    { type: 'Water Leakage', count: 1560, percentage: 12.5, color: 'bg-cyan-500' },
    { type: 'Road Damage', count: 1158, percentage: 9.3, color: 'bg-orange-500' },
  ],
  topCities: [
    { city: 'Bangalore', issues: 520, resolved: 412, pending: 108 },
    { city: 'Delhi', issues: 450, resolved: 380, pending: 70 },
    { city: 'Mumbai', issues: 380, resolved: 320, pending: 60 },
    { city: 'Hyderabad', issues: 310, resolved: 280, pending: 30 },
    { city: 'Kolkata', issues: 290, resolved: 250, pending: 40 },
  ]
};

export default function AnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('issues');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time insights and metrics for Swachh-Samadhan platform</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{analyticsData.totalIssues.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Issues</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+8.3%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{analyticsData.resolvedIssues.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Resolved Issues</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm text-yellow-600 font-medium">-5.2%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{analyticsData.pendingIssues.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Pending Issues</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">+18.7%</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{analyticsData.activeUsers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Trend</h2>
            <div className="h-64 flex items-end justify-between">
              {analyticsData.monthlyTrend.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div className="w-full bg-gray-100 rounded-t-lg relative">
                    <div 
                      className="bg-orange-500 rounded-t-lg transition-all duration-300 hover:bg-orange-600"
                      style={{ height: `${(data.issues / 1500) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-b-lg relative">
                    <div 
                      className="bg-green-500 rounded-b-lg transition-all duration-300 hover:bg-green-600"
                      style={{ height: `${(data.resolved / 1500) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Reported</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Resolved</span>
              </div>
            </div>
          </div>

          {/* Issue Types */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Issue Types Distribution</h2>
            <div className="space-y-3">
              {analyticsData.issueTypes.map((issue, index) => (
                <div key={issue.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${issue.color} rounded-full`}></div>
                    <span className="text-sm font-medium text-gray-700">{issue.type}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{issue.count.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{issue.percentage}%</div>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 ${issue.color} rounded-full transition-all duration-300`}
                        style={{ width: `${issue.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Cities by Issues</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">City</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Total Issues</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Resolved</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Pending</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Resolution Rate</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topCities.map((city, index) => (
                  <tr key={city.city} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{city.city}</td>
                    <td className="py-3 px-4 text-sm text-right text-gray-900">{city.issues}</td>
                    <td className="py-3 px-4 text-sm text-right text-gray-900">{city.resolved}</td>
                    <td className="py-3 px-4 text-sm text-right text-gray-900">{city.pending}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      <span className="text-green-600 font-medium">
                        {((city.resolved / city.issues) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <BarChart3 className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Average Resolution Time</h3>
            <div className="text-3xl font-bold">{analyticsData.avgResolutionTime} days</div>
            <p className="text-sm opacity-90 mt-2">15% improvement from last month</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <TrendingUp className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Cities Covered</h3>
            <div className="text-3xl font-bold">{analyticsData.citiesCovered}</div>
            <p className="text-sm opacity-90 mt-2">Across 8 states</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <Users className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Active Users</h3>
            <div className="text-3xl font-bold">{(analyticsData.activeUsers / 1000).toFixed(1)}K</div>
            <p className="text-sm opacity-90 mt-2">Growing rapidly</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
