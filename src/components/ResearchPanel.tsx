import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResearchResult {
  title: string;
  summary: string;
  source: string;
  keyPoints: string[];
}

// Simulated research results for common Bible topics
const researchDatabase: Record<string, ResearchResult> = {
  'sermon on the mount': {
    title: 'The Sermon on the Mount',
    summary: 'The Sermon on the Mount is a collection of teachings and sayings of Jesus Christ found in the Gospel of Matthew (chapters 5-7). It is considered one of the most important passages in the New Testament and contains some of the most well-known teachings of Jesus.',
    source: 'Matthew 5-7',
    keyPoints: [
      'The Beatitudes (Matthew 5:3-12) - Blessings for the poor in spirit, those who mourn, the meek, etc.',
      'Salt and Light (Matthew 5:13-16) - Believers are called to be a positive influence in the world',
      'The Lord\'s Prayer (Matthew 6:9-13) - A model for how to pray',
      'Do not judge (Matthew 7:1-5) - Warning against hypocritical judgment',
      'The Golden Rule (Matthew 7:12) - Treat others as you would want to be treated',
    ],
  },
  'parables of jesus': {
    title: 'The Parables of Jesus',
    summary: 'Jesus used parables—short stories with spiritual lessons—as a primary teaching method. The Gospels record over 30 distinct parables, each designed to illustrate truths about the Kingdom of God and Christian living.',
    source: 'Synoptic Gospels',
    keyPoints: [
      'Parable of the Sower (Matthew 13) - Different responses to God\'s Word',
      'Parable of the Prodigal Son (Luke 15) - God\'s unconditional love and forgiveness',
      'Parable of the Good Samaritan (Luke 10) - Love your neighbor without boundaries',
      'Parable of the Talents (Matthew 25) - Faithful stewardship of God\'s gifts',
      'Parable of the Mustard Seed (Matthew 13) - The Kingdom of God starts small but grows',
    ],
  },
  'ten commandments': {
    title: 'The Ten Commandments',
    summary: 'The Ten Commandments, also known as the Decalogue, are a set of biblical principles relating to ethics and worship. Given by God to Moses on Mount Sinai, they form the foundation of moral law in Judaism and Christianity.',
    source: 'Exodus 20:1-17, Deuteronomy 5:4-21',
    keyPoints: [
      'Commandments 1-4 focus on our relationship with God',
      'Commandments 5-10 focus on our relationships with others',
      'Jesus summarized them as loving God and loving neighbor (Matthew 22:37-40)',
      'They reveal God\'s character and His standard of righteousness',
      'Christians view them not as a means of salvation but as a guide for righteous living',
    ],
  },
  'fruits of the spirit': {
    title: 'The Fruit of the Spirit',
    summary: 'The Fruit of the Spirit is a biblical term that sums up nine attributes of a person living in accord with the Holy Spirit. These qualities contrast with the "works of the flesh" and represent the character of Christ being formed in believers.',
    source: 'Galatians 5:22-23',
    keyPoints: [
      'Love - Unconditional, self-sacrificing love (agape)',
      'Joy - Deep-seated gladness independent of circumstances',
      'Peace - Inner tranquility and harmony with God and others',
      'Patience - Longsuffering and endurance',
      'Kindness, Goodness, Faithfulness, Gentleness, Self-control - Character traits reflecting Christ',
    ],
  },
  'book of psalms': {
    title: 'The Book of Psalms',
    summary: 'The Book of Psalms is a collection of 150 Hebrew poems and hymns used in ancient Israelite and Jewish worship. Written by various authors including David, it covers the full range of human emotions and experiences before God.',
    source: 'Old Testament, Book of Psalms',
    keyPoints: [
      'Psalms of Praise - Celebrating God\'s greatness and works',
      'Psalms of Lament - Honest cries for help in times of trouble',
      'Wisdom Psalms - Teaching about righteous living',
      'Messianic Psalms - Prophetically pointing to Jesus Christ',
      'The longest chapter in the Bible is Psalm 119, celebrating God\'s Word',
    ],
  },
  'apostle paul': {
    title: 'The Apostle Paul',
    summary: 'Paul of Tarsus, originally named Saul, was a first-century apostle who wrote much of the New Testament. After his dramatic conversion on the road to Damascus, he became Christianity\'s most influential missionary and theologian.',
    source: 'Acts 9-28, Pauline Epistles',
    keyPoints: [
      'Wrote 13 epistles that comprise a significant portion of the New Testament',
      'Key theological contributions: justification by faith, the body of Christ, grace',
      'Established churches throughout the Roman Empire on three missionary journeys',
      'Transformed from persecutor of Christians to their greatest advocate',
      'His letters address practical Christian living and foundational doctrine',
    ],
  },
  'creation': {
    title: 'The Creation Account',
    summary: 'The creation narrative in Genesis describes God creating the universe, Earth, and all living things. It establishes fundamental truths about God\'s sovereignty, the goodness of creation, and humanity\'s unique role as image-bearers of God.',
    source: 'Genesis 1-2',
    keyPoints: [
      'God created everything from nothing (ex nihilo) by His word',
      'Creation was declared "very good" by God',
      'Humans are created in God\'s image (imago Dei)',
      'The Sabbath rest is established as a pattern for humanity',
      'Creation reveals God\'s power and divine nature (Romans 1:20)',
    ],
  },
  'resurrection': {
    title: 'The Resurrection of Jesus',
    summary: 'The resurrection of Jesus Christ is the central event of Christianity. According to the New Testament, Jesus rose from the dead on the third day after his crucifixion, demonstrating His victory over sin and death.',
    source: 'Matthew 28, Mark 16, Luke 24, John 20, 1 Corinthians 15',
    keyPoints: [
      'The empty tomb was discovered on the first day of the week',
      'Jesus appeared to many witnesses over 40 days',
      'Paul calls the resurrection essential to faith (1 Corinthians 15:14)',
      'It confirms Jesus\' identity as the Son of God',
      'Believers share in resurrection hope (1 Corinthians 15:20-22)',
    ],
  },
};

const suggestedTopics = [
  'Sermon on the Mount',
  'Parables of Jesus',
  'Ten Commandments',
  'Fruits of the Spirit',
  'Book of Psalms',
  'Apostle Paul',
  'Creation',
  'Resurrection',
];

export function ResearchPanel() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = async (searchTerm?: string) => {
    const term = searchTerm || query;
    if (!term.trim()) return;

    setIsSearching(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const normalizedQuery = term.toLowerCase();
    const foundResult = researchDatabase[normalizedQuery] ||
      Object.entries(researchDatabase).find(([key]) =>
        key.includes(normalizedQuery) || normalizedQuery.includes(key)
      )?.[1];

    if (foundResult) {
      setResult(foundResult);
      if (!searchHistory.includes(term)) {
        setSearchHistory(prev => [term, ...prev.slice(0, 4)]);
      }
    } else {
      setResult({
        title: `Research: "${term}"`,
        summary: `While this specific topic is not in our local database, we encourage you to explore this subject through prayer, Scripture reading, and trusted commentaries. The Bible has much to say about every aspect of life and faith.`,
        source: 'Try searching for: ' + suggestedTopics.slice(0, 3).join(', '),
        keyPoints: [
          'Start with prayer for understanding and wisdom',
          'Use a concordance to find related Scripture passages',
          'Consider the historical and cultural context',
          'Compare interpretations from trusted scholars',
          'Allow the Holy Spirit to guide your study',
        ],
      });
    }

    setIsSearching(false);
    setQuery('');
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Research Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-sm rounded-lg md:rounded-2xl p-5 md:p-8 shadow-xl border border-[#d4c4a8]/30"
      >
        <h2
          className="text-xl md:text-2xl text-[#2c1810] mb-2 flex items-center gap-2 md:gap-3"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          <span className="text-[#d4a853]">🔍</span>
          Bible Research Tool
        </h2>
        <p
          className="text-[#6b5344] text-sm md:text-base mb-5 md:mb-6"
          style={{ fontFamily: 'Crimson Pro, serif' }}
        >
          Explore biblical topics, themes, and teachings with curated research summaries.
        </p>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Enter a topic to research (e.g., 'Sermon on the Mount')"
            className="flex-1 px-4 py-3 md:py-4 rounded-lg md:rounded-xl bg-[#f8f4ec] border border-[#d4c4a8] text-[#2c1810] placeholder-[#a69783] focus:outline-none focus:ring-2 focus:ring-[#8b2635]/30 text-sm md:text-base"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          />
          <button
            onClick={() => handleSearch()}
            disabled={isSearching}
            className="px-6 md:px-8 py-3 md:py-4 bg-[#8b2635] text-[#f8f4ec] rounded-lg md:rounded-xl hover:bg-[#722030] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            {isSearching ? 'Searching...' : 'Research'}
          </button>
        </div>

        {/* Suggested Topics */}
        <div>
          <p
            className="text-xs md:text-sm uppercase tracking-[0.15em] text-[#6b5344] mb-3"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Suggested Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleSearch(topic)}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm bg-[#e8e0d4] text-[#4a3c32] hover:bg-[#d4c4a8] transition-all duration-300"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#d4c4a8]/50">
            <p
              className="text-xs uppercase tracking-[0.15em] text-[#a69783] mb-2"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Recent Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(item)}
                  className="px-2 md:px-3 py-1 rounded text-xs text-[#6b5344] bg-[#f8f4ec]/50 hover:bg-[#e8e0d4] transition-colors"
                  style={{ fontFamily: 'Crimson Pro, serif' }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Loading State */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="relative">
              <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-[#d4c4a8] rounded-full animate-spin border-t-[#8b2635]" />
              <span className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl">📖</span>
            </div>
            <p
              className="mt-4 text-[#6b5344] italic text-sm md:text-base"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Searching the Scriptures...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence mode="wait">
        {result && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/60 backdrop-blur-sm rounded-lg md:rounded-2xl p-6 md:p-8 shadow-xl border border-[#d4c4a8]/30"
          >
            {/* Title */}
            <div className="mb-4 md:mb-6">
              <h3
                className="text-2xl md:text-3xl text-[#2c1810] mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {result.title}
              </h3>
              <span
                className="inline-block px-3 py-1 bg-[#8b2635]/10 text-[#8b2635] rounded-full text-xs md:text-sm"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                📜 {result.source}
              </span>
            </div>

            {/* Summary */}
            <div className="mb-6 md:mb-8">
              <p
                className="text-[#4a3c32] text-base md:text-lg leading-relaxed"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                {result.summary}
              </p>
            </div>

            {/* Key Points */}
            <div className="bg-gradient-to-br from-[#8b2635]/5 to-[#d4a853]/5 rounded-lg md:rounded-xl p-5 md:p-6">
              <h4
                className="text-base md:text-lg text-[#2c1810] mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                <span className="text-[#d4a853]">✦</span>
                Key Points
              </h4>
              <ul className="space-y-3">
                {result.keyPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[#8b2635] mt-1 text-sm">•</span>
                    <span
                      className="text-[#4a3c32] text-sm md:text-base"
                      style={{ fontFamily: 'Crimson Pro, serif' }}
                    >
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Call to Action */}
            <div className="mt-6 md:mt-8 pt-6 border-t border-[#d4c4a8]/50 text-center">
              <p
                className="text-[#6b5344] text-sm md:text-base italic mb-4"
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth."
              </p>
              <p className="text-[#a69783] text-xs">— 2 Timothy 2:15 (KJV)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {!result && !isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 md:py-12"
        >
          <div className="text-5xl md:text-6xl mb-4 opacity-30">📚</div>
          <p
            className="text-[#6b5344] text-base md:text-lg"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Select a topic above or enter your own to begin researching.
          </p>
          <p
            className="text-[#a69783] text-xs md:text-sm mt-2 italic"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            "Your word is a lamp for my feet, a light on my path." — Psalm 119:105
          </p>
        </motion.div>
      )}
    </div>
  );
}
