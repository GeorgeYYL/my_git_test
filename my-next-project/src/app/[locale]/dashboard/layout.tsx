export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex">
        <aside className="w-64 bg-gray-800 text-white p-4">Sidebar</aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    );
  }
  