"use client"
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import PhotoProfil from "../profile/PhotoProfil";
import { signOut } from "../../lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

export function Sidebar({ users }) {
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const sidebarLinks = [
    { href: '/user/profil-settings', label: 'Profil', active: true },
    { href: '/user/mes-sessions', label: 'Mes Sessions', active: false },
    { href: '/user/mes-credits', label: 'Mes crédits', active: false },
    { href: '/user/mes-points', label: 'Mes points de fidélité', active: false },
    { href: '/auth/login', label: 'Déconnexion', logout: true, icon: '<i className="bi bi-box-arrow-left"></i>', active: false }
  ];

  const isActive = (href) => {
    return pathname === href;
  };



  async function handleLogout() {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("You’ve logged out. See you soon!");
          router.push("/auth/inscription");
        },
      },
    });
  }

  return (
    <div className="col-lg-4">
      <div className="rounded-4 border bg-white mb-4" style={{ marginTop: '-100px', position: 'relative', zIndex: 10 }}>
        {/* Profil */}
        <PhotoProfil user={users} />

        {/* Navigation */}
        <div className="p-4">
          {sidebarLinks.map((link, index) => (
            link.logout ? (
              <button
                key={index}
                onClick={handleLogout}
                disabled={isPending}
                className="d-flex align-items-center p-3 text-dark bg-light rounded-3 mb-2 hover-bg-dark transition-all border-0 w-100"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={`d-flex align-items-center p-3 text-decoration-none rounded-3 mb-2 transition-all ${isActive(link.href)
                  ? 'bg-primary text-white'
                  : 'text-dark hover-bg-light'
                  }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}