"use client"

import { useState } from 'react';
import SessionStatsChart from '@/components/admin/ui/SessionStatsChart';
import LoyaltyPointsChart from '@/components/admin/ui/LoyaltyPointsChart';

export default function AdminHome() {
  
  return (
    <>     
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <h1>Statistiques des Sessions</h1>

        <SessionStatsChart/>

         <h1 className='mt-5'>Statistiques des points et crédits</h1>

        <LoyaltyPointsChart />

      </div>
      {/* / Content */}
    </>    
  );
}