import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import AdminLayout from './AdminLayout';

export default async function Layout({ children }) {
  const h = headers();
  const session = await auth.api.getSession({ headers: h });

  if (!session) {
    redirect("/auth/connexion");
  }

  return <AdminLayout session={session}>{children}</AdminLayout>;
}
