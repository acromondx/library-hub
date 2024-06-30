import { Separator } from "@/components/ui/separator";

export function DashboardHeader({
  title,
  showSeperator = true,
  children,
}: {
  title: string;
  showSeperator?: boolean;
  children?: React.ReactElement;
}) {
  return (
    <>
      <div className="flex justify-between">
        <h3 className="pt-2 text-[17px] font-semibold tracking-tight">
          {title}
        </h3>

        {children}
      </div>
      {showSeperator && <Separator className="mb-4" />}
    </>
  );
}
