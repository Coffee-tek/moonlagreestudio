
import SessionStatsChart from '@/components/admin/ui/SessionStatsChart';
import LoyaltyPointsChart from '@/components/admin/ui/LoyaltyPointsChart';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function AdminHome() {
  const h = await headers();
  const session = await auth.api.getSession({
    headers: h,
  });

  if (!session) {
    redirect("/auth/connexion");
  }

  // if (session.user.role !== "admin") {
  //   return (
  //     <div className="px-8 py-16 container mx-auto max-w-screen-lg space-y-8">
  //       <div className="space-y-4">
  //         <h1 className="text-3xl font-bold">Admin Dashboard</h1>

  //         <p className="p-2 rounded-md text-lg bg-red-600 text-white font-bold">
  //           FORBIDDEN
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
  if (session.user.role.toLowerCase() !== "admin") {
    redirect("/user/profil-settings"); // redirige les admins vers leur dashboard
  }



  return (
    <>
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <h1>Statistiques des Sessions</h1>

        <SessionStatsChart />

        <h1 className='mt-5'>Statistiques des points et crédits</h1>

        <LoyaltyPointsChart />

      </div>
      {/* / Content */}
    </>
  );
}