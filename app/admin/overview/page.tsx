import { fetchDashboardMetrics } from "@/actions/admin/analytics";
import AdminDashboardOverview from "@/components/admin/Sections/DashboardOverview";

export default async function Dashboard() {
  const stats = await fetchDashboardMetrics();

  return (
    <AdminDashboardOverview
      loanStats={stats.loanStats}
      metrics={{
        totalUsers: stats.totalUsers,
        totalBooks: stats.totalBooks,
        activeLoans: stats.activeLoans,
        pendingRequests: stats.pendingRequests,
      }}
      recentLoans={stats.recentLoans}
      recentRequests={stats.recentRequests}
    />
  );
}
