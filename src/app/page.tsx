'use client';

import { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { type Container, type ISourceOptions } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim'; // loads tsparticles slim

export default function Home() {
  const [init, setInit] = useState(false);

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

      <header className="relative z-10 text-center py-20 px-4">
        <h1 className="text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse">
          Argue. Vote. Win.
        </h1>
        <p className="text-2xl text-gray-300 font-light">Welcome to Oneste—where your ideas earn you cash.</p>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto text-center space-y-12 px-4 pb-20">
        <p className="text-xl leading-relaxed text-gray-200">
          Start or join a debate on anything—music, politics, sports, or hot takes.
          Back your side with real money.
        </p>
        <p className="text-xl leading-relaxed text-gray-200">
          Vote for the strongest argument—as a community or let expert judges decide.
          Winners split the pot.
        </p>
        <p className="text-xl leading-relaxed text-gray-200">
          No fuss. Just brains, boldness, and rewards.
          Ready to make your voice count? Join the debate.
        </p>

        <section className="mt-20">
          <h2 className="text-5xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            🎮 How It Works (Gamified & Simple)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-semibold mb-4 text-blue-300">Join a Debate</h3>
              <p className="text-gray-300">Pick a topic you care about.</p>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-semibold mb-4 text-purple-300">Pick a Side</h3>
              <p className="text-gray-300">Support your side with real money.</p>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-semibold mb-4 text-green-300">Vote</h3>
              <p className="text-gray-300">Read both arguments. Tap to vote for the one you believe wins.</p>
            </div>
            <div className="bg-gray-800/70 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-3xl font-semibold mb-4 text-yellow-300">Earn Rewards</h3>
              <p className="text-gray-300">If your side wins, you split the pot. You also earn points for voting, winning, and starting debates.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-20 py-8 text-gray-500 text-sm text-center">
        <p>&copy; 2025 Oneste. All rights reserved.</p>
      </footer>
    </div>
  );
}
