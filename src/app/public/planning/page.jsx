// components/calendar/CalendarBookingSystemServer.tsx
import HeroHeader from "@/components/HeroSection";
import EnhancedPopularClasses from "@/components/popular-class";
import { heroHeaders } from "@/data/data";
import CalendarBookingSystemClient from "../../../components/public/planning/CalendarBookingSystemClient";
import prisma from "../../../lib/prisma";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import { redirect } from "next/navigation";
import { seanceService } from "../../../services/ seanceService";


async function fetchClassesData() {
  return {
    '2025-01-06': [
      { id: 1, time: '18:00 - 19:00', title: 'FULL BODY - MICRO LAGREE', instructor: 'with Lena Bachelier', capacity: '5/8', available: true },
      { id: 2, time: '19:00 - 20:00', title: 'FULL BODY - MICRO LAGREE', instructor: 'with Lena Bachelier', capacity: '8/8', available: false },
      { id: 3, time: '20:00 - 21:00', title: 'FULL BODY - MICRO LAGREE', instructor: 'with Lena Bachelier', capacity: '5/8', available: true }
    ],
    '2025-01-07': [{ id: 7, time: '09:00 - 10:00', title: 'YOGA MATINAL', instructor: 'with Sarah Martin', capacity: '3/6', available: true }],
    '2025-01-08': [{ id: 8, time: '18:30 - 19:30', title: 'PILATES ADVANCED', instructor: 'with Tom Wilson', capacity: '6/8', available: true }],
    '2025-09-26': [
      { id: 4, time: '18:00 - 19:00', title: 'FULL BODY - MICRO LAGREE', instructor: 'Avec Lena Bachelier', capacity: '5/8', available: true },
      { id: 5, time: '19:00 - 20:00', title: 'FULL BODY - MICRO LAGREE', instructor: 'Avec Lena Bachelier', capacity: '8/8', available: false },
      { id: 6, time: '20:00 - 21:00', title: 'FULL BODY - MICRO LAGREE', instructor: 'Avec Lena Bachelier', capacity: '5/8', available: true }
    ]
  };
}

export default async function CalendarBookingSystemServer() {
  const classesData = await fetchClassesData();

  const h = await headers();
  const session = await auth.api.getSession({ headers: h });

  // const seances = await prisma.seance.findMany({
  //   include: { reservations: true },
  //   orderBy: { heure: 'asc' },
  // });

  const seances = await seanceService.getAll();


  // ⚠️ Si l'utilisateur n'est pas connecté
  if (!session) {
    return (
      <>
        <HeroHeader
          title={heroHeaders.planning.title}
          breadcrumbs={heroHeaders.planning.breadcrumbs}
          backgroundImage="/img/new/planning.jpeg"
        />

        {/* user = null */}
        <CalendarBookingSystemClient seances={seances} user={null} />

        <EnhancedPopularClasses />
      </>
    );
  }
  console.log(seances);


  // ✔️ Si l'utilisateur est connecté
  return (
    <>
      <HeroHeader
        title={heroHeaders.planning.title}
        breadcrumbs={heroHeaders.planning.breadcrumbs}
        backgroundImage="/img/new/planning.jpeg"
      />

      <CalendarBookingSystemClient seances={seances} user={session.user} />

      <EnhancedPopularClasses />
    </>
  );
}
