'use client';

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { formatUnits } from 'viem';

export function ConnectWallet() {
  const { connect, connectors, isPending } = useConnect({
    mutation: {
      onSuccess(data) {
        console.log('Connect Success:', data);
      },
      onError(error) {
        console.error('Connect Error:', error);
      },
    },
  });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  const formattedBalance = balance ? formatUnits(balance.value, balance.decimals) : '0';

  const handleConnect = () => {
    const sequenceConnector = connectors.find(c => c.id === 'sequence');
    console.log('Attempting to connect with Sequence connector:', sequenceConnector);
    if (sequenceConnector) {
      connect({ connector: sequenceConnector });
    } else {
      console.warn('Sequence connector not found. Falling back to MetaMask.');
      // Fallback to MetaMask if Sequence is not available
      const metaMaskConnector = connectors.find(c => c.id === 'io.metamask');
      if (metaMaskConnector) {
        connect({ connector: metaMaskConnector });
      } else {
        alert("No wallet found. Please install MetaMask or ensure Sequence is configured.");
        console.error("No suitable connector found.");
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (isConnected) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <p className="text-lg text-green-400">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
        {balance && (
          <p className="text-md text-gray-300">Balance: {Number(formattedBalance).toFixed(4)} {balance.symbol}</p>
        )}
        <button
          onClick={handleDisconnect}
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