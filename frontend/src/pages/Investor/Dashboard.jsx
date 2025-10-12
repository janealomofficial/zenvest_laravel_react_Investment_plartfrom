import DashboardLayout from "../../components/layouts/DashboardLayout";

export default function InvestorDashboard() {
  return (
    <DashboardLayout role="investor">
      <h1 className="text-2xl font-semibold mb-4">Welcome, Jane</h1>
      <h2 className="text-lg mb-2">Investment Applications</h2>
      <p>No applications available.</p>
    </DashboardLayout>
  );
}
