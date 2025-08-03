'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim'; // loads tsparticles slim
import { ConnectWallet } from '@/components/ConnectWallet';
import { DebateList } from '@/components/DebateList';
import { RewardDisplay } from '@/components/RewardDisplay';
import { CreateDebate } from '@/components/CreateDebate';
import { Debate } from '@/types';

const initialMockDebates: Debate[] = [
  {
    id: 1,
    title: 'Crypto vs Fiat',
    options: ['Crypto', 'Fiat'],
    stakedAmount: 100,
    endTime: Date.now() + (1000 * 60 * 60 * 24 * 3), // Ends in 3 days
  },
  {
    id: 2,
    title: 'Should we introduce a new character?',
    options: ['Yes', 'No'],
    stakedAmount: 75,
    endTime: Date.now() + (1000 * 60 * 60 * 48), // Ends in 48 hours
  },
];

console.log('page.tsx: initialMockDebates', initialMockDebates);

export default function Home() {
  const [init, setInit] = useState(false);
  const [debates, setDebates] = useState<Debate[]>([]);

  // Load debates from local storage on initial mount
  useEffect(() => {
    const storedDebates = JSON.parse(localStorage.getItem('createdDebates') || '[]');
    console.log('page.tsx: storedDebates', storedDebates);
    setDebates([...initialMockDebates, ...storedDebates]);
    console.log('page.tsx: debates after setting', debates);
  }, []);

  // Callback to add a new debate and update local storage
  const handleDebateCreated = useCallback((newDebate: Omit<Debate, 'endTime'>, endTime: number) => {
    const debateWithEndTime: Debate = {
      ...newDebate,
      endTime: Date.now() + (1000 * 60 * 60 * 24 * endTime),
    };
    setDebates((prevDebates) => {
      const updatedDebates = [...prevDebates, debateWithEndTime];
      localStorage.setItem('createdDebates', JSON.stringify(updatedDebates.filter(d => d.id > 1000000000000)));
      return updatedDebates;
    });
  }, []);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0a0a0a", // Dark background for futuristic feel
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#00f0ff", // Cyan/electric blue for techy feel
        },
        links: {
          color: "#00f0ff",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {init && <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} className="absolute inset-0 z-0" />}

      <header className="relative z-10 text-center py-16 px-4 sm:py-20">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Oneste: Argue. Vote. Win.
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 font-light">Welcome to Oneste—the decentralized debate arena where your ideas earn crypto rewards on Etherlink.</p>
        <div className="mt-8">
          <ConnectWallet />
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto text-center space-y-8 px-4 pb-16 sm:space-y-12 sm:pb-20">
        <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
          Start or join a debate on anything—music, politics, sports, or wild hot takes.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
          Stake tez (XTZ) to support your argument.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
          Read arguments, tap to vote for the winner. Community or expert judges decide.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-200">
          Winners split the staked pot. Earn points for debating, voting, or starting topics.
        </p>

        <section className="mt-16 sm:mt-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            🎮 How It Works (Gamified & Simple)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-blue-300">Join a Debate</h3>
              <p className="text-gray-300">Pick a topic—music, politics, sports, or wild hot takes.</p>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-purple-300">Back Your Side</h3>
              <p className="text-gray-300">Stake tez (XTZ) to support your argument.</p>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-green-300">Vote</h3>
              <p className="text-gray-300">Read arguments, tap to vote for the winner. Community or expert judges decide.</p>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-yellow-300">Earn Rewards</h3>
              <p className="text-gray-300">Winners split the staked pot. Earn points for debating, voting, or starting topics.</p>
            </div>
          </div>
        </section>

        <button className="mt-12 sm:mt-16 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg sm:text-xl font-bold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50">
          Join the Debate
        </button>

        <DebateList debates={debates} />

        <RewardDisplay />

        <CreateDebate onDebateCreated={handleDebateCreated} />
      </main>

      <footer className="relative z-10 mt-16 sm:mt-20 py-6 sm:py-8 text-gray-500 text-xs sm:text-sm text-center">
        <p>&copy; 2025 Oneste. All rights reserved.</p>
      </footer>
    </div>
  );
}
