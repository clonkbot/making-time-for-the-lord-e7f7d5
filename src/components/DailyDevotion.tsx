import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Devotion {
  verse: string;
  reference: string;
  reflection: string;
  prayer: string;
}

const devotions: Devotion[] = [
  {
    verse: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    reference: "Psalm 46:10",
    reflection: "In the chaos of daily life, God calls us to stillness. Not passivity, but a confident rest in His sovereignty. Today, find moments to pause, breathe, and remember that the Creator of the universe holds you in His hands.",
    prayer: "Lord, quiet my restless heart. Help me to trust in Your perfect timing and Your unfailing love. May I find peace in Your presence today."
  },
  {
    verse: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    reflection: "Our human wisdom is limited, but God sees the full picture. When we surrender our plans to Him, we discover a path we never could have charted ourselves—one that leads to abundant life.",
    prayer: "Father, I release my need to control. Guide my steps today, and give me faith to follow where You lead, even when the path is unclear."
  },
  {
    verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28",
    reflection: "Jesus doesn't call the strong—He calls the tired, the overwhelmed, the broken. His invitation is not to try harder, but to come closer. Today, lay your burdens at His feet.",
    prayer: "Jesus, I come to You with all my weariness. Thank You for accepting me as I am. Fill me with Your rest and renew my strength."
  },
  {
    verse: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    reflection: "Even in exile, God promised restoration to His people. Whatever wilderness you find yourself in today, know that God's plans for you are good. He is working all things together for your benefit.",
    prayer: "Lord, when I cannot see the way forward, help me to trust Your plans. Thank You for the hope and future You have prepared for me."
  },
  {
    verse: "The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul.",
    reference: "Psalm 23:1-3",
    reflection: "Like a shepherd who knows each sheep by name, God tends to your every need. He leads you to places of nourishment and peace. Let Him restore what life has depleted.",
    prayer: "Good Shepherd, lead me today to the places of rest my soul needs. Restore what is broken and fill what is empty within me."
  },
  {
    verse: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
    reference: "Matthew 6:33",
    reflection: "When we prioritize God's kingdom above our anxieties, something shifts. Our worries don't disappear, but they are reordered. What we need is provided as we pursue what matters most.",
    prayer: "Father, help me to put You first today—before my worries, before my ambitions, before my fears. May Your kingdom be my priority."
  },
  {
    verse: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
    reflection: "This is not a promise of worldly success, but of spiritual sufficiency. Whatever you face today—abundance or need, triumph or trial—Christ's strength is enough to carry you through.",
    prayer: "Lord Jesus, be my strength today. Not for my own glory, but so that Your power may be displayed in my weakness."
  }
];

export function DailyDevotion() {
  const [devotion, setDevotion] = useState<Devotion | null>(null);
  const [showPrayer, setShowPrayer] = useState(false);

  useEffect(() => {
    // Get a consistent devotion for the day based on the date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const index = dayOfYear % devotions.length;
    setDevotion(devotions[index]);
  }, []);

  if (!devotion) return null;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Main Verse Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative bg-white/60 backdrop-blur-sm rounded-lg md:rounded-2xl p-6 md:p-10 shadow-xl border border-[#d4c4a8]/30"
      >
        {/* Decorative illuminated initial */}
        <div className="absolute -top-3 md:-top-4 -left-3 md:-left-4 w-12 h-12 md:w-16 md:h-16 bg-[#8b2635] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg transform -rotate-3">
          <span
            className="text-2xl md:text-4xl text-[#d4a853] font-bold"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {devotion.verse.charAt(0)}
          </span>
        </div>

        <div className="pt-4 md:pt-6">
          <blockquote
            className="text-lg md:text-xl lg:text-2xl text-[#2c1810] leading-relaxed mb-4 md:mb-6 italic"
            style={{ fontFamily: 'Cormorant Garamond, serif', textIndent: '2rem' }}
          >
            "{devotion.verse}"
          </blockquote>

          <p
            className="text-right text-[#8b2635] font-semibold text-base md:text-lg"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            — {devotion.reference}
          </p>
        </div>

        {/* Gold decorative line */}
        <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4a853] to-transparent" />
          <span className="text-[#d4a853] text-lg md:text-xl">✦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4a853] to-transparent" />
        </div>
      </motion.div>

      {/* Reflection Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-[#2c1810]/5 rounded-lg md:rounded-xl p-5 md:p-8 border border-[#2c1810]/10"
      >
        <h3
          className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#8b2635] mb-3 md:mb-4 font-medium"
          style={{ fontFamily: 'Crimson Pro, serif' }}
        >
          Today's Reflection
        </h3>
        <p
          className="text-[#4a3c32] text-base md:text-lg leading-relaxed"
          style={{ fontFamily: 'Crimson Pro, serif' }}
        >
          {devotion.reflection}
        </p>
      </motion.div>

      {/* Prayer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <button
          onClick={() => setShowPrayer(!showPrayer)}
          className="w-full bg-[#8b2635] hover:bg-[#722030] text-[#f8f4ec] py-4 md:py-5 px-6 md:px-8 rounded-lg md:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          style={{ fontFamily: 'Crimson Pro, serif' }}
        >
          <span className="text-lg md:text-xl">🙏</span>
          <span className="text-base md:text-lg font-medium">
            {showPrayer ? 'Close Prayer' : 'Open in Prayer'}
          </span>
        </button>

        <motion.div
          initial={false}
          animate={{ height: showPrayer ? 'auto' : 0, opacity: showPrayer ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden"
        >
          <div className="mt-4 md:mt-6 bg-gradient-to-br from-[#8b2635]/10 to-[#d4a853]/10 rounded-lg md:rounded-xl p-5 md:p-8 border border-[#8b2635]/20">
            <p
              className="text-[#2c1810] text-base md:text-lg leading-relaxed italic text-center"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              "{devotion.prayer}"
            </p>
            <p
              className="text-center mt-4 md:mt-6 text-[#8b2635] font-medium"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Amen.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Time commitment reminder */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center py-4 md:py-6"
      >
        <p
          className="text-[#6b5344] text-xs md:text-sm italic"
          style={{ fontFamily: 'Crimson Pro, serif' }}
        >
          "But when you pray, go into your room, close the door and pray to your Father, who is unseen."
        </p>
        <p className="text-[#a69783] text-xs mt-1">— Matthew 6:6</p>
      </motion.div>
    </div>
  );
}
