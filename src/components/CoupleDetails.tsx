import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { WEDDING } from '../wedding';

export const CoupleDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-brand-beige/15 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-16 sm:mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-flex items-center gap-4 mb-6 mt-4">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-brand-beige-deep/60" />
            <span className="text-brand-beige-deep uppercase tracking-[0.5em] text-[11px] font-semibold font-sans drop-shadow-sm">The Protagonists</span>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-brand-beige-deep/60" />
          </div>
          <h2 className="text-5xl sm:text-7xl font-display text-stone-800 tracking-tight drop-shadow-sm">
            {WEDDING.brideName} <span className="italic text-brand-beige-deep font-light mx-2">&</span>&nbsp;{WEDDING.groomName}
          </h2>
        </motion.div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 relative z-10">
        {/* Groom Details (Left on Desktop, Bottom on Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-center lg:text-right flex-1 lg:pr-10 order-4 lg:order-1"
        >
          <div className="mb-4 flex flex-col items-center lg:items-end">
            <span className="text-brand-beige-deep uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">The Groom</span>
            <h3 className="text-4xl sm:text-5xl font-display text-stone-800 mb-2 drop-shadow-sm">{WEDDING.groomName}</h3>
            <p className="text-stone-500/90 font-serif italic text-base sm:text-lg">Son of {WEDDING.groomParents}</p>
          </div>
          <div className="hidden lg:flex justify-end mt-8">
            <Heart className="w-6 h-6 text-brand-beige/60 fill-brand-beige/20 transform hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </motion.div>

        {/* Center Couple Image (Arch Design) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative px-4 sm:px-0 order-1 lg:order-2 flex-shrink-0 group"
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-2 bg-gradient-to-b from-brand-beige-deep/30 to-transparent rounded-[12rem_12rem_1rem_1rem] blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative w-[300px] h-[400px] sm:w-[360px] sm:h-[500px] lg:w-[420px] lg:h-[580px] rounded-[12rem_12rem_16px_16px] overflow-hidden border-[6px] border-white/90 shadow-[0_20px_50px_rgba(176,137,104,0.2)] bg-brand-champagne mx-auto z-10 transition-transform duration-700 group-hover:-translate-y-2">
            <img
              src="/123.jpg"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800&h=1000";
                e.currentTarget.onerror = null;
              }}
              alt={`${WEDDING.brideName} and ${WEDDING.groomName}`}
              className="w-full h-full object-cover mix-blend-multiply transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            {/* Elegant inner shadow & overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-beige-deep/30 to-transparent pointer-events-none mix-blend-overlay" />
          </div>

          {/* Floating Sparkles decoration */}
          <Sparkles className="absolute top-8 left-0 w-8 h-8 text-brand-gold animate-pulse drop-shadow-sm z-20" />
          <Sparkles className="absolute bottom-10 -right-4 w-6 h-6 text-brand-beige animate-pulse delay-300 drop-shadow-sm z-20" />
        </motion.div>

        {/* Mobile divider between image and groom */}
        <div className="lg:hidden order-3 w-full flex justify-center py-4 opacity-50">
          <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-brand-beige-deep/40 to-transparent" />
        </div>

        {/* Bride Details (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="text-center lg:text-left flex-1 lg:pl-10 order-2 lg:order-3"
        >
          <div className="mb-4 flex flex-col items-center lg:items-start">
            <span className="text-brand-beige-deep uppercase tracking-[0.4em] text-[10px] font-bold mb-3 block">The Bride</span>
            <h3 className="text-4xl sm:text-5xl font-display text-stone-800 mb-2 drop-shadow-sm">{WEDDING.brideName}</h3>
            <p className="text-stone-500/90 font-serif italic text-base sm:text-lg">Daughter of {WEDDING.brideParents}</p>
          </div>
          <div className="hidden lg:flex justify-start mt-8">
            <Heart className="w-6 h-6 text-brand-beige/60 fill-brand-beige/20 transform hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
