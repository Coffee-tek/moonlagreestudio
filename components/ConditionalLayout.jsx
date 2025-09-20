'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Pages qui n'ont pas besoin du layout complet
  const noLayoutPages = ['/connexion', '/inscription', '/forgot-password'];
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
