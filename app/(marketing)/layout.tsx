import MarketingNavbar from "@/components/marketing/MarketingNavbar";
import MarketingFooter from "@/components/marketing/MarketingFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand flex flex-col">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}
