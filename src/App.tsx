import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BibleQuoteTool } from './components/BibleQuoteTool';
import { ResearchPanel } from './components/ResearchPanel';
import { DailyDevotion } from './components/DailyDevotion';

type Tab = 'devotion' | 'quotes' | 'research';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('devotion');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'devotion', label: 'Daily Devotion', icon: '✦' },
    { id: 'quotes', label: 'Scripture Finder', icon: '📖' },
    { id: 'research', label: 'Bible Research', icon: '🔍' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f4ec] relative overflow-hidden">
      {/* Paper texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative corner flourish */}
      <div className="fixed top-0 left-0 w-32 h-32 md:w-48 md:h-48 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b2635]">
          <path
            fill="currentColor"
            d="M0,0 Q50,20 20,50 Q40,80 0,100 L0,0 M10,10 Q30,25 25,45 Q35,65 10,80"
          />
        </svg>
      </div>
      <div className="fixed bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 opacity-10 pointer-events-none rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b2635]">
          <path
            fill="currentColor"
            d="M0,0 Q50,20 20,50 Q40,80 0,100 L0,0 M10,10 Q30,25 25,45 Q35,65 10,80"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="pt-6 md:pt-12 pb-4 md:pb-8 px-4 md:px-8 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-3 md:mb-4"
          >
            <span className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#8b2635] drop-shadow-sm" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              ✝
            </span>
          </motion.div>

          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-light text-[#2c1810] mb-2 tracking-wide"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Making Time for the Lord
          </h1>

          <p
            className="text-sm md:text-base text-[#6b5344] italic"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            {getGreeting()} — {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </motion.header>

        {/* Navigation Tabs */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="px-4 md:px-8 mb-6 md:mb-8"
        >
          <div className="max-w-2xl mx-auto flex justify-center gap-1 md:gap-2 bg-[#e8e0d4]/50 p-1.5 md:p-2 rounded-full backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative px-3 md:px-6 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? 'text-[#f8f4ec]'
                    : 'text-[#6b5344] hover:text-[#2c1810]'
                  }
                `}
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#8b2635] rounded-full shadow-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                  <span className="hidden sm:inline">{tab.icon}</span>
                  <span className="whitespace-nowrap">{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.nav>

        {/* Content Area */}
        <main className="flex-1 px-4 md:px-8 pb-20 md:pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              {activeTab === 'devotion' && <DailyDevotion />}
              {activeTab === 'quotes' && <BibleQuoteTool />}
              {activeTab === 'research' && <ResearchPanel />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 py-3 md:py-4 text-center bg-gradient-to-t from-[#f8f4ec] via-[#f8f4ec] to-transparent">
          <p
            className="text-[10px] md:text-xs text-[#a69783] tracking-wide"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Requested by @stringer_kade · Built by @clonkbot
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
