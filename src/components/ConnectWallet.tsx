'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';

export function ConnectWallet() {
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  const handleConnect = () => {
    const sequenceConnector = connectors.find(c => c.id === 'sequence');
    if (sequenceConnector) {
      connect({ connector: sequenceConnector });
    } else {
      console.error("Sequence connector not found. Please ensure it's configured in wagmi.");
      // Fallback to the first available connector if Sequence is not found
      if (connectors.length > 0) {
        connect({ connector: connectors[0] });
      }
    }
  };

  if (isConnected) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <p className="text-lg text-green-400">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>

        <button
          onClick={() => disconnect()}
          className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
      disabled={isPending}
    >
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
