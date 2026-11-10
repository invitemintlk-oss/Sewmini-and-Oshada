import React from 'react';
import { motion } from 'motion/react';
import { Heart, Music, Camera, Utensils, PartyPopper } from 'lucide-react';

const events = [
  { time: '09:10 AM', title: 'Registration', icon: Heart, desc: 'A warm welcome to our loved ones' },
  { time: '09:48 AM', title: 'Poruwa Ceremony', icon: Music, desc: 'The traditional and sacred Poruwa ceremony at Rock House' },
  { time: '12:30 PM', title: 'Buffet Opens', icon: Utensils, desc: 'A grand celebratory feast' },
  { time: '03:30 PM', title: 'Wedding Ends', icon: PartyPopper, desc: 'Farewell as we begin our journey together' },
];

export const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-20">
        <span className="text-brand-beige-deep uppercase tracking-[0.4em] text-[10px] font-medium mb-4 block">
          The Day's Flow
        </span>
        <h2 className="text-5xl font-display text-stone-800 tracking-tight">Wedding Timeline</h2>
        <div className="w-12 h-px bg-brand-beige/30 mx-auto mt-6" />
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-beige/20 to-transparent" />

        <div className="space-y-24">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Time */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <span className="text-2xl font-serif text-brand-beige-deep italic">{event.time}</span>
              </div>

              {/* Icon Node */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white border border-brand-beige/30 flex items-center justify-center shadow-xl">
                <event.icon className="w-5 h-5 text-brand-beige-deep" />
              </div>

              {/* Content */}
              <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <h4 className="text-xl font-display text-stone-800 mb-1">{event.title}</h4>
                <p className="text-stone-400 text-sm leading-relaxed">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
