'use client';

import { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { sequenceWallet } from '@0xsequence/wagmi-connector';
import { injected } from 'wagmi/connectors';

const etherlinkTestnet = {
  id: 128123,
  name: 'Etherlink Testnet',
  nativeCurrency: { name: 'Tezos', symbol: 'XTZ', decimals: 18 },
  rpcUrls: { default: { http: ['https://node.ghostnet.etherlink.com'] } },
  blockExplorers: { default: { name: 'Etherlink Explorer', url: 'https://explorer.etherlink.com' } },
} as const;

const projectAccessKey = process.env.NEXT_PUBLIC_SEQUENCE_PROJECT_ACCESS_KEY;

if (!projectAccessKey) {
  console.error('CRITICAL: NEXT_PUBLIC_SEQUENCE_PROJECT_ACCESS_KEY is not defined. Web3 functionality will be disabled.');
}

const wagmiConfig = createConfig({
  chains: [etherlinkTestnet],
  connectors: [
    injected(),
    sequenceWallet({
      connectOptions: {
        app: 'Oneste',
        projectAccessKey: projectAccessKey!,
      },
      defaultNetwork: etherlinkTestnet.id,
    }),
  ],
  transports: {
    [etherlinkTestnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export function WagmiConfigProvider({ children }: { children: ReactNode }) {
  if (!projectAccessKey) {
    // Render children without WagmiProvider if the key is missing
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}