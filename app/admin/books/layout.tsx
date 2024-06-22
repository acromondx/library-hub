import { TabsNavigation } from "@/components/admin/TabNav";

interface ContestPageLayoutProps extends React.PropsWithChildren {
  params: {
    contestId: string;
  };
}

export default async function BooksLayout({
  children,
  params,
}: ContestPageLayoutProps) {
  return (
    <div className="w-full space-y-8 overflow-auto">
      <TabsNavigation />
      {children}
    </div>
    // <Shell variant="sidebar">

    // </Shell>
  );
}
