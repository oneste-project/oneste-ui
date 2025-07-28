'use client';

import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

const WagmiConfigProvider = dynamic(() => import('./WagmiConfigProvider').then(mod => mod.WagmiConfigProvider), { ssr: false });

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfigProvider>
      {children}
      <ToastContainer position="bottom-right" theme="dark" />
      <Tooltip id="gamelike-tooltip" className="z-50 !bg-gray-800 !text-white !border !border-blue-500 !rounded-lg !shadow-lg !px-3 !py-2 !text-sm !font-mono" />
    </WagmiConfigProvider>
  );
}
