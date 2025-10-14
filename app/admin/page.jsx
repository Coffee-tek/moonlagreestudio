"use client"

import { useState } from 'react';
import SessionStatsChart from '@/components/admin/ui/SessionStatsChart';
import LoyaltyPointsChart from '@/components/admin/ui/LoyaltyPointsChart';

export default function AdminHome() {
  
  return (
    <>     
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <h1>ADMIN</h1>

        <SessionStatsChart/>

        <LoyaltyPointsChart />

      </div>
      {/* / Content */}
    </>    
  );
}