import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BibleVerse {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

// Comprehensive collection of Bible verses organized by topic
const bibleVerses: Record<string, BibleVerse[]> = {
  love: [
    { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", book: "John", chapter: 3, verse: 16 },
    { reference: "1 Corinthians 13:4-7", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.", book: "1 Corinthians", chapter: 13, verse: 4 },
    { reference: "1 John 4:19", text: "We love because he first loved us.", book: "1 John", chapter: 4, verse: 19 },
    { reference: "Romans 8:38-39", text: "For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.", book: "Romans", chapter: 8, verse: 38 },
  ],
  faith: [
    { reference: "Hebrews 11:1", text: "Now faith is confidence in what we hope for and assurance about what we do not see.", book: "Hebrews", chapter: 11, verse: 1 },
    { reference: "Matthew 17:20", text: "He replied, 'Because you have so little faith. Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, \"Move from here to there,\" and it will move. Nothing will be impossible for you.'", book: "Matthew", chapter: 17, verse: 20 },
    { reference: "Romans 10:17", text: "Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.", book: "Romans", chapter: 10, verse: 17 },
    { reference: "James 2:17", text: "In the same way, faith by itself, if it is not accompanied by action, is dead.", book: "James", chapter: 2, verse: 17 },
  ],
  hope: [
    { reference: "Romans 15:13", text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.", book: "Romans", chapter: 15, verse: 13 },
    { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.", book: "Jeremiah", chapter: 29, verse: 11 },
    { reference: "Isaiah 40:31", text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.", book: "Isaiah", chapter: 40, verse: 31 },
    { reference: "Psalm 42:11", text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.", book: "Psalm", chapter: 42, verse: 11 },
  ],
  peace: [
    { reference: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", book: "Philippians", chapter: 4, verse: 6 },
    { reference: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.", book: "John", chapter: 14, verse: 27 },
    { reference: "Isaiah 26:3", text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.", book: "Isaiah", chapter: 26, verse: 3 },
    { reference: "Psalm 46:10", text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.", book: "Psalm", chapter: 46, verse: 10 },
  ],
  strength: [
    { reference: "Philippians 4:13", text: "I can do all this through him who gives me strength.", book: "Philippians", chapter: 4, verse: 13 },
    { reference: "Isaiah 41:10", text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", book: "Isaiah", chapter: 41, verse: 10 },
    { reference: "2 Corinthians 12:9", text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.", book: "2 Corinthians", chapter: 12, verse: 9 },
    { reference: "Nehemiah 8:10", text: "Do not grieve, for the joy of the LORD is your strength.", book: "Nehemiah", chapter: 8, verse: 10 },
  ],
  wisdom: [
    { reference: "James 1:5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.", book: "James", chapter: 1, verse: 5 },
    { reference: "Proverbs 3:5-6", text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", book: "Proverbs", chapter: 3, verse: 5 },
    { reference: "Proverbs 9:10", text: "The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.", book: "Proverbs", chapter: 9, verse: 10 },
    { reference: "Colossians 3:16", text: "Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom through psalms, hymns, and songs from the Spirit, singing to God with gratitude in your hearts.", book: "Colossians", chapter: 3, verse: 16 },
  ],
  forgiveness: [
    { reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.", book: "1 John", chapter: 1, verse: 9 },
    { reference: "Ephesians 4:32", text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", book: "Ephesians", chapter: 4, verse: 32 },
    { reference: "Matthew 6:14", text: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you.", book: "Matthew", chapter: 6, verse: 14 },
    { reference: "Psalm 103:12", text: "As far as the east is from the west, so far has he removed our transgressions from us.", book: "Psalm", chapter: 103, verse: 12 },
  ],
  anxiety: [
    { reference: "Matthew 6:34", text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.", book: "Matthew", chapter: 6, verse: 34 },
    { reference: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you.", book: "1 Peter", chapter: 5, verse: 7 },
    { reference: "Psalm 55:22", text: "Cast your cares on the LORD and he will sustain you; he will never let the righteous be shaken.", book: "Psalm", chapter: 55, verse: 22 },
    { reference: "Matthew 11:28-30", text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.", book: "Matthew", chapter: 11, verse: 28 },
  ],
};

const topics = Object.keys(bibleVerses);

export function BibleQuoteTool() {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<BibleVerse[]>([]);
  const [savedVerses, setSavedVerses] = useState<BibleVerse[]>([]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setResults(bibleVerses[topic] || []);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase();
    const searchResults: BibleVerse[] = [];

    // Search through all verses
    Object.values(bibleVerses).forEach((verses) => {
      verses.forEach((verse) => {
        if (
          verse.text.toLowerCase().includes(query) ||
          verse.reference.toLowerCase().includes(query) ||
          verse.book.toLowerCase().includes(query)
        ) {
          if (!searchResults.find(v => v.reference === verse.reference)) {
            searchResults.push(verse);
          }
        }
      });
    });

    setResults(searchResults);
    setSelectedTopic('');
  };

  const handleSaveVerse = (verse: BibleVerse) => {
    if (!savedVerses.find(v => v.reference === verse.reference)) {
      setSavedVerses([...savedVerses, verse]);
    }
  };

  const handleRemoveVerse = (reference: string) => {
    setSavedVerses(savedVerses.filter(v => v.reference !== reference));
  };

  const getRandomVerse = () => {
    const allVerses = Object.values(bibleVerses).flat();
    const randomVerse = allVerses[Math.floor(Math.random() * allVerses.length)];
    setResults([randomVerse]);
    setSelectedTopic('');
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-sm rounded-lg md:rounded-2xl p-5 md:p-8 shadow-xl border border-[#d4c4a8]/30"
      >
        <h2
          className="text-xl md:text-2xl text-[#2c1810] mb-4 md:mb-6 flex items-center gap-2 md:gap-3"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          <span className="text-[#d4a853]">📖</span>
          Scripture Finder
        </h2>

        {/* Search Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for a word, phrase, or reference..."
            className="flex-1 px-4 py-3 md:py-4 rounded-lg md:rounded-xl bg-[#f8f4ec] border border-[#d4c4a8] text-[#2c1810] placeholder-[#a69783] focus:outline-none focus:ring-2 focus:ring-[#8b2635]/30 text-sm md:text-base"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          />
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handleSearch}
              className="flex-1 sm:flex-none px-5 md:px-6 py-3 md:py-4 bg-[#8b2635] text-[#f8f4ec] rounded-lg md:rounded-xl hover:bg-[#722030] transition-colors shadow-md text-sm md:text-base"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Search
            </button>
            <button
              onClick={getRandomVerse}
              className="flex-1 sm:flex-none px-5 md:px-6 py-3 md:py-4 bg-[#d4a853] text-[#2c1810] rounded-lg md:rounded-xl hover:bg-[#c49843] transition-colors shadow-md text-sm md:text-base"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              Random
            </button>
          </div>
        </div>

        {/* Topic Buttons */}
        <div className="mb-4">
          <p
            className="text-xs md:text-sm uppercase tracking-[0.15em] text-[#6b5344] mb-3"
            style={{ fontFamily: 'Crimson Pro, serif' }}
          >
            Browse by Topic
          </p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicSelect(topic)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm capitalize transition-all duration-300 ${
                  selectedTopic === topic
                    ? 'bg-[#8b2635] text-[#f8f4ec] shadow-md'
                    : 'bg-[#e8e0d4] text-[#4a3c32] hover:bg-[#d4c4a8]'
                }`}
                style={{ fontFamily: 'Crimson Pro, serif' }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h3
              className="text-base md:text-lg text-[#6b5344] px-1"
              style={{ fontFamily: 'Crimson Pro, serif' }}
            >
              {results.length} verse{results.length !== 1 ? 's' : ''} found
            </h3>

            {results.map((verse, index) => (
              <motion.div
                key={verse.reference}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/60 backdrop-blur-sm rounded-lg md:rounded-xl p-5 md:p-6 shadow-lg border border-[#d4c4a8]/30 group"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3 md:mb-4">
                  <span
                    className="text-[#8b2635] font-semibold text-base md:text-lg"
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  >
                    {verse.reference}
                  </span>
                  <button
                    onClick={() => handleSaveVerse(verse)}
                    className={`self-start px-3 py-1.5 rounded-lg text-xs transition-all ${
                      savedVerses.find(v => v.reference === verse.reference)
                        ? 'bg-[#d4a853]/20 text-[#8b6914]'
                        : 'bg-[#e8e0d4] text-[#6b5344] hover:bg-[#d4c4a8]'
                    }`}
                    style={{ fontFamily: 'Crimson Pro, serif' }}
                  >
                    {savedVerses.find(v => v.reference === verse.reference) ? '★ Saved' : '☆ Save'}
                  </button>
                </div>
                <p
                  className="text-[#2c1810] text-base md:text-lg leading-relaxed italic"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  "{verse.text}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Verses */}
      {savedVerses.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-[#8b2635]/10 to-[#d4a853]/10 rounded-lg md:rounded-2xl p-5 md:p-8 border border-[#8b2635]/20"
        >
          <h3
            className="text-lg md:text-xl text-[#2c1810] mb-4 flex items-center gap-2"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            <span className="text-[#d4a853]">★</span>
            Your Saved Verses ({savedVerses.length})
          </h3>

          <div className="space-y-3">
            {savedVerses.map((verse) => (
              <div
                key={verse.reference}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:justify-between bg-white/50 rounded-lg p-3 md:p-4"
              >
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[#8b2635] font-semibold block text-sm md:text-base"
                    style={{ fontFamily: 'Crimson Pro, serif' }}
                  >
                    {verse.reference}
                  </span>
                  <p
                    className="text-[#4a3c32] text-xs md:text-sm truncate"
                    style={{ fontFamily: 'Crimson Pro, serif' }}
                  >
                    {verse.text.substring(0, 60)}...
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveVerse(verse.reference)}
                  className="self-end sm:self-auto text-[#a69783] hover:text-[#8b2635] transition-colors p-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
