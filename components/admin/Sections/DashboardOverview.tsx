"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  Books,
  GitPullRequest,
  Sparkle,
  UsersThree,
} from "@phosphor-icons/react";

interface Metrics {
  totalUsers: number;
  totalBooks: number;
  activeLoans: number;
  pendingRequests: number;
}

interface Loan {
  id: string;
  book: string;
  user: string;
  dueDate: string;
}

interface Request {
  id: string;
  type: "BOOK_SUGGESTION" | "COMPLAINT" | "OTHER";
  user: string;
}

interface LoanStat {
  name: string;
  loans: number;
}

interface AdminDashboardOverviewProps {
  metrics: Metrics;
  recentLoans: Loan[];
  recentRequests: Request[];
  loanStats: LoanStat[];
}

const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  metrics,
  recentLoans,
  recentRequests,
  loanStats,
}) => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-medium">Overview</h1>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers}
          icon={
            <div className="rounded-lg bg-primary/[0.15] p-3">
              <UsersThree weight="duotone" className="h-4 w-4 text-primary" />
            </div>
          }
        />
        <MetricCard
          title="Total Books"
          value={metrics.totalBooks}
          icon={
            <div className="rounded-lg bg-primary/[0.15] p-3">
              <Books weight="duotone" className="h-4 w-4 text-primary" />{" "}
            </div>
          }
        />
        <MetricCard
          title="Active Loans"
          value={metrics.activeLoans}
          icon={
            <div className="rounded-lg bg-primary/[0.15] p-3">
              <Sparkle weight="duotone" className="h-4 w-4 text-primary" />
            </div>
          }
        />
        <MetricCard
          title="Pending Requests"
          value={metrics.pendingRequests}
          icon={
            <div className="rounded-lg bg-primary/[0.15] p-3">
              <GitPullRequest
                weight="duotone"
                className="h-4 w-4 text-primary"
              />
            </div>
          }
        />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Recent Loans</CardTitle>
              <ArrowUpRight weight="regular" className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <ul>
              {recentLoans.map((loan) => (
                <li key={loan.id} className="mb-2">
                  <span className="font-semibold">{loan.book}</span> -{" "}
                  {loan.user} (Due: {loan.dueDate})
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Recent Requests</CardTitle>
              <ArrowUpRight weight="regular" className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <ul>
              {recentRequests.map((request) => (
                <li key={request.id} className="mb-2">
                  <Badge className="rounded border-amber-500/[0.2] bg-amber-500/[0.1] text-xs font-normal uppercase text-amber-500 shadow-none">
                    {request.type}
                  </Badge>{" "}
                  - {request.user}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Loan Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loanStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="loans" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default AdminDashboardOverview;
