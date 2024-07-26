// import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function Dashboard() {
//   return (
//     <div className="flex w-full flex-col">
//       <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
//         <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
//           <Card x-chunk="dashboard-01-chunk-0">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Books</CardTitle>
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">$45,231.89</div>
//               <p className="text-xs text-muted-foreground">
//                 +20.1% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-1">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Total Members
//               </CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">+2350</div>
//               <p className="text-xs text-muted-foreground">
//                 +180.1% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-2">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 {" "}
//                 Active Loans
//               </CardTitle>
//               <CreditCard className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">+12,234</div>
//               <p className="text-xs text-muted-foreground">
//                 +19% from last month
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-3">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Overdue Loans
//               </CardTitle>
//               <Activity className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">+573</div>
//               <p className="text-xs text-muted-foreground">
//                 +201 since last hour
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-3">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">
//                 Pending Requests.
//               </CardTitle>
//               <Activity className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">+573</div>
//               <p className="text-xs text-muted-foreground">
//                 +201 since last hour
//               </p>
//             </CardContent>
//           </Card>
//           <Card x-chunk="dashboard-01-chunk-3">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Fees</CardTitle>
//               <Activity className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">+573</div>
//               <p className="text-xs text-muted-foreground">
//                 +201 since last hour
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//       <div className="grid gap-4 p-4 md:gap-8 md:p-8 lg:grid-cols-2 xl:grid-cols-2">
//         <Card x-chunk="dashboard-01-chunk-5">
//           <CardHeader>
//             <CardTitle className="0 flex flex-row justify-between">
//               <div>Recent Loas</div>
//               <div className="text-xs font-thin">View All</div>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="grid gap-8">
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/01.png" alt="Avatar" />
//                 <AvatarFallback>OM</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">
//                   Olivia Martin
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   olivia.martin@email.com
//                 </p>
//               </div>
//               <div className="ml-auto font-medium">+$1,999.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/02.png" alt="Avatar" />
//                 <AvatarFallback>JL</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">Jackson Lee</p>
//                 <p className="text-sm text-muted-foreground">
//                   jackson.lee@email.com
//                 </p>
//               </div>
//               <div className="ml-auto font-medium">+$39.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/03.png" alt="Avatar" />
//                 <AvatarFallback>IN</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">
//                   Isabella Nguyen
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   isabella.nguyen@email.com
//                 </p>
//               </div>
//               <div className="ml-auto font-medium">+$299.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/04.png" alt="Avatar" />
//                 <AvatarFallback>WK</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">William Kim</p>
//                 <p className="text-sm text-muted-foreground">will@email.com</p>
//               </div>
//               <div className="ml-auto font-medium">+$99.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/05.png" alt="Avatar" />
//                 <AvatarFallback>SD</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">Sofia Davis</p>
//                 <p className="text-sm text-muted-foreground">
//                   sofia.davis@email.com
//                 </p>
//               </div>
//               <div className="ml-auto font-medium">+$39.00</div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card x-chunk="dashboard-01-chunk-5">
//           <CardHeader>
//             <CardTitle>Recent reservations</CardTitle>
//           </CardHeader>
//           <CardContent className="grid gap-8">
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/01.png" alt="Avatar" />
//                 <AvatarFallback>OM</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">
//                   Olivia Martin
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   olivia.martin@email.com
//                 </p>
//               </div>
//               <div className="ml-auto font-medium">+$1,999.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/02.png" alt="Avatar" />
//                 <AvatarFallback>JL</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">Jackson Lee</p>
//                 <p className="text-sm text-muted-foreground">
//                   jackson.lee@email.com
//                 </p>
//               </div>
//               <div className="ml-auto font-medium">+$39.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/03.png" alt="Avatar" />
//                 <AvatarFallback>IN</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">
//                   Isabella Nguyen
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   isabella.nguyen@email.com
//                 </p>
//               </div>
//               <div className="ml-auto font-medium">+$299.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/04.png" alt="Avatar" />
//                 <AvatarFallback>WK</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">William Kim</p>
//                 <p className="text-sm text-muted-foreground">will@email.com</p>
//               </div>
//               <div className="ml-auto font-medium">+$99.00</div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Avatar className="hidden h-9 w-9 sm:flex">
//                 <AvatarImage src="/avatars/05.png" alt="Avatar" />
//                 <AvatarFallback>SD</AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">Sofia Davis</p>
//                 <p className="text-sm text-muted-foreground">
//                   sofia.davis@email.com
//                 </p>
//               </div>
//               <div className="ml-auto font-medium">+$39.00</div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
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
import { Users, BookOpen, BookMarked, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "@phosphor-icons/react";

// Define interfaces for our data structures
interface Metrics {
  totalUsers: number;
  totalBooks: number;
  activeLoans: number;
  pendingRequests: number;
}

interface Loan {
  id: number;
  book: string;
  user: string;
  dueDate: string;
}

interface Request {
  id: number;
  type: "BOOK_SUGGESTION" | "COMPLAINT" | "OTHER";
  user: string;
}

interface LoanStat {
  name: string;
  loans: number;
}

const AdminDashboardOverview: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    totalUsers: 0,
    totalBooks: 0,
    activeLoans: 0,
    pendingRequests: 0,
  });

  const [recentLoans, setRecentLoans] = useState<Loan[]>([]);
  const [recentRequests, setRecentRequests] = useState<Request[]>([]);
  const [loanStats, setLoanStats] = useState<LoanStat[]>([]);

  useEffect(() => {
    setMetrics({
      totalUsers: 1250,
      totalBooks: 5000,
      activeLoans: 320,
      pendingRequests: 15,
    });

    setRecentLoans([
      {
        id: 1,
        book: "The Great Gatsby",
        user: "John Doe",
        dueDate: "2024-08-01",
      },
      {
        id: 2,
        book: "To Kill a Mockingbird",
        user: "Jane Smith",
        dueDate: "2024-08-03",
      },
      { id: 3, book: "1984", user: "Bob Johnson", dueDate: "2024-08-05" },
    ]);

    setRecentRequests([
      {
        id: 1,
        type: "BOOK_SUGGESTION",
        user: "Alice Brown",
      },
      { id: 2, type: "COMPLAINT", user: "Charlie Davis" },
      { id: 3, type: "OTHER", user: "Eva White" },
      { id: 4, type: "COMPLAINT", user: "Eva White" },
    ]);

    setLoanStats([
      { name: "Jan", loans: 65 },
      { name: "Feb", loans: 59 },
      { name: "Mar", loans: 80 },
      { name: "Apr", loans: 81 },
      { name: "May", loans: 56 },
      { name: "Jun", loans: 55 },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-medium">Overview</h1>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers}
          icon={
            <div className="rounded-lg bg-primary/[0.15] p-3">
              <Users className="h-4 w-4 text-primary" />
            </div>
          }
        />
        <MetricCard
          title="Total Books"
          value={metrics.totalBooks}
          icon={
            <div className="rounded-lg bg-primary/[0.15] p-3">
              <BookOpen className="h-4 w-4 text-primary" />{" "}
            </div>
          }
        />
        <MetricCard
          title="Active Loans"
          value={metrics.activeLoans}
          icon={
            <div className="rounded-lg bg-primary/[0.15] p-3">
              <BookMarked className="h-4 w-4 text-primary" />
            </div>
          }
        />
        <MetricCard
          title="Pending Requests"
          value={metrics.pendingRequests}
          icon={
            <div className="rounded-lg bg-primary/[0.15] p-3">
              <FileText className="h-4 w-4 text-primary" />
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
