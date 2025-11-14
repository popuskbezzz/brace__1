import { AppRoutes } from '@/app/routes';
import { TabBar } from '@/widgets/navigation/TabBar';

export const App = () => (
  <div className="pb-24 min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
    <main className="px-4 py-6 space-y-6 max-w-3xl mx-auto">
      <AppRoutes />
    </main>
    <TabBar />
  </div>
);
