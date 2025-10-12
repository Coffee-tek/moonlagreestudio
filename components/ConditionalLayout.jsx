'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Pages qui n'ont pas besoin du layout complet
  const noLayoutPages = [
    '/auth/connexion', 
    '/auth/inscription', 
    '/auth/forgot-password', 
    '/auth/reset-password', 
    '/auth/new-password', 
    '/admin', 
    '/admin/profile', 
    '/admin/users',
    '/admin/plannings',
    '/admin/packs',
  ];
  const hideLayout = noLayoutPages.includes(pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="bg-osahan">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
