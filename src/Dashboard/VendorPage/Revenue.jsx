import React from "react";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaDollarSign, FaPlusCircle, FaTicketAlt } from "react-icons/fa";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Revenue = () => {
  const axiosSecure = UseAxiosSecure();

  // Fetching stats from backend
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/vendor-stats");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  // Data for Charts (Based on your backend response)
  const chartData = [
    { name: "Revenue", value: stats.revenue || 0 },
    { name: "Sold", value: stats.ticketsSold || 0 },
    { name: "Added", value: stats.totalTickets || 0 },
  ];

  const COLORS = ["#16a34a", "#2563eb", "#f59e0b"];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Revenue & Performance Overview
      </h2>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats shadow bg-white border-l-4 border-green-600">
          <div className="stat">
            <div className="stat-figure text-green-600 text-3xl">
              <FaDollarSign />
            </div>
            <div className="stat-title font-semibold">Total Revenue</div>
            <div className="stat-value text-green-600">${stats.revenue}</div>
            <div className="stat-desc font-medium">
              From successful payments
            </div>
          </div>
        </div>

        <div className="stats shadow bg-white border-l-4 border-blue-600">
          <div className="stat">
            <div className="stat-figure text-blue-600 text-3xl">
              <FaTicketAlt />
            </div>
            <div className="stat-title font-semibold">Total Tickets Sold</div>
            <div className="stat-value text-blue-600">{stats.ticketsSold}</div>
            <div className="stat-desc font-medium text-blue-400">
              Successfully Booked
            </div>
          </div>
        </div>

        <div className="stats shadow bg-white border-l-4 border-amber-500">
          <div className="stat">
            <div className="stat-figure text-amber-500 text-3xl">
              <FaPlusCircle />
            </div>
            <div className="stat-title font-semibold">Total Tickets Added</div>
            <div className="stat-value text-amber-500">
              {stats.totalTickets}
            </div>
            <div className="stat-desc font-medium">Current Inventory</div>
          </div>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Revenue Comparison */}
        <div className="bg-white p-6 rounded-xl shadow-md h-[400px]">
          <h3 className="text-xl font-bold mb-4 text-gray-700 text-center">
            Revenue vs Inventory
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-md h-[400px]">
          <h3 className="text-xl font-bold mb-4 text-gray-700 text-center">
            Ticket Distribution
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
