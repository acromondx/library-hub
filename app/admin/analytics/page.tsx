import { getAnalyticsData } from "@/actions/admin/analytics";
import { AdminAnalyticsSection } from "@/components/admin/Sections/AnalyticsSection";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData("lastWeek");
  console.log(data);
  return <AdminAnalyticsSection />;
}
