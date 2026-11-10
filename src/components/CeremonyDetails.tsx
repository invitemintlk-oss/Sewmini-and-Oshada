import React from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, MapPin, Heart, Sparkles } from 'lucide-react';
import { WEDDING } from '../wedding';

export const CeremonyDetails: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      {/* Premium ambient backdrop */}
      <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-gradient-radial from-brand-beige/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="text-brand-beige-deep uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[10px] sm:text-[11px] font-bold drop-shadow-sm">
                The Sacred Union
              </span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-brand-beige-deep/60 to-transparent" />
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display text-stone-800 mb-8 leading-[1.1] drop-shadow-sm">
              A Celebration of <br />
              <span className="italic font-light text-brand-beige-deep">Tradition & Love</span>
            </h2>

            <p className="text-stone-500/90 font-serif text-lg sm:text-xl leading-relaxed mb-16 max-w-lg">
              We are honored to invite you to witness our union as we exchange vows at {WEDDING.venueName}, {WEDDING.venueArea}, surrounded by the warmth of our loved ones.
            </p>

            {/* Premium Timeline */}
            <div className="relative space-y-12 ml-10 sm:ml-12 border-l-[1.5px] border-brand-beige/30 pl-10 sm:pl-12 py-4">

              {/* Calendar */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-beige/40 shadow-lg flex items-center justify-center group-hover:border-brand-beige-deep group-hover:shadow-[0_4px_15px_rgba(176,137,104,0.3)] transition-all duration-500">
                  <Calendar className="w-5 h-5 text-brand-beige-deep group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-stone-800 mb-2 group-hover:text-brand-beige-deep transition-colors duration-500">{WEDDING.dayLong}</h4>
                  <p className="text-stone-500/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">{WEDDING.yearWords}</p>
                </div>
              </div>

              {/* Clock */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-beige/40 shadow-lg flex items-center justify-center group-hover:border-brand-beige-deep group-hover:shadow-[0_4px_15px_rgba(176,137,104,0.3)] transition-all duration-500">
                  <Clock className="w-5 h-5 text-brand-beige-deep group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-stone-800 mb-2 group-hover:text-brand-beige-deep transition-colors duration-500">{WEDDING.timeRange}</h4>
                  <p className="text-stone-500/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">Poruwa Ceremony at 09:48 AM</p>
                </div>
              </div>

              {/* Location */}
              <div className="relative group">
                <div className="absolute top-1/2 -translate-y-1/2 -left-[64px] sm:-left-[74px] w-12 h-12 bg-white rounded-full border border-brand-beige/40 shadow-lg flex items-center justify-center group-hover:border-brand-beige-deep group-hover:shadow-[0_4px_15px_rgba(176,137,104,0.3)] transition-all duration-500">
                  <MapPin className="w-5 h-5 text-brand-beige-deep group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-stone-800 mb-2 group-hover:text-brand-beige-deep transition-colors duration-500">{WEDDING.venueName}</h4>
                  <p className="text-stone-500/80 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold">{WEDDING.venueArea}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Composition */}
        <div className="lg:w-1/2 w-full relative mt-16 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Artistic Background Frame */}
            <div className="absolute -inset-4 sm:-inset-6 border-[2px] border-brand-beige/30 rounded-[2rem] sm:rounded-[3rem] -z-10 translate-x-4 sm:translate-x-8 translate-y-4 sm:translate-y-8" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-champagne/40 rounded-[2rem] sm:rounded-[3rem] blur-2xl -z-20" />

            {/* Main Creative Image Frame */}
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-[6px] sm:border-[8px] border-white shadow-[0_20px_50px_rgba(176,137,104,0.2)] bg-white group">
              <img
                src="/2.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1519225421980-715cb02151ff?auto=format&fit=crop&q=80&w=800&h=1000";
                  e.currentTarget.onerror = null;
                }}
                alt="Ceremony Venue"
                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none mix-blend-overlay opacity-opacity-70 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>

            {/* Decorative Floating Circles */}
            <div className="absolute -top-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 rounded-full border-[1.5px] border-dashed border-brand-beige/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute -top-2 -right-2 w-16 sm:w-24 h-16 sm:h-24 rounded-full border-[1.5px] border-brand-beige/20" />
          </motion.div>

          {/* Reception Card — Placed Below Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
            className="mt-10 sm:mt-14 bg-white/85 backdrop-blur-xl p-6 sm:p-10 shadow-[0_30px_60px_rgba(176,137,104,0.15)] rounded-2xl border border-white relative overflow-hidden"
          >
            <div className="absolute inset-x-8 -top-px h-[2px] bg-gradient-to-r from-transparent via-brand-beige-deep/60 to-transparent" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <div className="flex items-center gap-3">
                <Heart className="text-brand-beige-deep w-8 h-8 sm:w-10 sm:h-10 fill-brand-beige/20 drop-shadow-sm flex-shrink-0" />
                <Sparkles className="w-4 h-4 text-brand-gold animate-pulse flex-shrink-0" />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-2xl sm:text-4xl text-stone-800 mb-1 sm:mb-2 tracking-tight">The Celebration</h4>
                <p className="text-stone-500/90 font-serif text-sm sm:text-base leading-relaxed">
                  Followed by a grand celebratory buffet and festivities at {WEDDING.venueName}.
                </p>
              </div>
              <div className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-brand-champagne rounded-full border border-brand-beige/30 shadow-sm self-start sm:self-center flex-shrink-0">
                <span className="text-brand-beige-deep font-sans font-bold tracking-[0.1em] sm:tracking-[0.2em] text-[9px] sm:text-[11px] uppercase block drop-shadow-sm">Buffet 12:30 PM</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
