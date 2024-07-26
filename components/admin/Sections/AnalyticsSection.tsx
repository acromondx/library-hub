"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LoanTrend {
  date: string;
  loans: number;
  returns: number;
}

interface CategoryDistribution {
  name: string;
  value: number;
}

interface TopBook {
  title: string;
  loanCount: number;
}

interface UserActivity {
  username: string;
  loanCount: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export const AdminAnalyticsSection: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>("lastMonth");
  const [loanTrends, setLoanTrends] = useState<LoanTrend[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<
    CategoryDistribution[]
  >([]);
  const [topBooks, setTopBooks] = useState<TopBook[]>([]);
  const [activeUsers, setActiveUsers] = useState<UserActivity[]>([]);

  useEffect(() => {
    fetchAnalyticsData(timeRange);
  }, [timeRange]);

  const fetchAnalyticsData = (range: string) => {
    setLoanTrends([
      { date: "2024-07-01", loans: 45, returns: 40 },
      { date: "2024-07-08", loans: 52, returns: 48 },
      { date: "2024-07-15", loans: 49, returns: 53 },
      { date: "2024-07-22", loans: 60, returns: 55 },
    ]);

    setCategoryDistribution([
      { name: "Fiction", value: 40 },
      { name: "Non-fiction", value: 30 },
      { name: "Science", value: 15 },
      { name: "History", value: 10 },
      { name: "Others", value: 5 },
    ]);

    setTopBooks([
      { title: "To Kill a Mockingbird", loanCount: 28 },
      { title: "1984", loanCount: 25 },
      { title: "Pride and Prejudice", loanCount: 22 },
      { title: "The Great Gatsby", loanCount: 20 },
      { title: "Moby Dick", loanCount: 18 },
    ]);

    setActiveUsers([
      { username: "john_doe", loanCount: 12 },
      { username: "jane_smith", loanCount: 10 },
      { username: "bob_johnson", loanCount: 9 },
      { username: "alice_williams", loanCount: 8 },
      { username: "charlie_brown", loanCount: 7 },
    ]);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Library Analytics</h1>
        <Select
          onValueChange={(value) => setTimeRange(value)}
          defaultValue={timeRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastWeek">Last Week</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="lastQuarter">Last Quarter</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loan and Return Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={loanTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="loans"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="returns" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Most Borrowed Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topBooks} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="title" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="loanCount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeUsers} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="username" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="loanCount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
