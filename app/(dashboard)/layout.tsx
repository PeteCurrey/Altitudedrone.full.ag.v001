import AppShell from "@/components/AppShell";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardWrapper>
      <AppShell>{children}</AppShell>
    </DashboardWrapper>
  );
}
