import React, { useState, useEffect } from "react";
import { WEDDING, getGuestDisplayName } from '../wedding';

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [opened, setOpened] = useState(false);
  
  const guestName = getGuestDisplayName();

  useEffect(() => {
    if (opened) {
      if (onMusicStart) onMusicStart();
      const timer = setTimeout(() => {
        onComplete();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [opened, onComplete, onMusicStart]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
        }

        html, body, #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          background: #FAF9F6;
        }

        .scene {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: radial-gradient(ellipse at 30% 20%, #FFFFFF 0%, #FAF9F6 40%, #EAE3D2 100%);
          perspective: 1500px;
          overflow: hidden;
          font-family: "Cormorant Garamond", serif;
        }

        /* Ambient floating orbs */
        .scene::before,
        .scene::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .scene::before {
          width: 400px;
          height: 400px;
          top: -100px;
          right: -100px;
          background: radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%);
        }
        .scene::after {
          width: 300px;
          height: 300px;
          bottom: -80px;
          left: -80px;
          background: radial-gradient(circle, rgba(9,121,105,0.2) 0%, transparent 70%);
        }

        .envelope-container {
          position: relative;
          width: min(460px, 92vw);
          height: min(680px, 85vh);
          cursor: pointer;
          transition: transform 0.6s ease;
          transform-style: preserve-3d;
        }

        .envelope-container:not(.is-open):hover {
          transform: scale(1.02);
        }

        /* Envelope Back Base */
        .envelope-base {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #722F37, #3B1C22);
          border-radius: 6px;
          box-shadow: 0 30px 60px -15px rgba(59,28,34,0.3), 0 0 0 1px rgba(212,175,55,0.4);
          z-index: 1;
        }

        /* Card Container */
        .card-container {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF9F6 50%, #FDFBF7 100%);
          border-radius: 6px;
          z-index: 2;
          overflow: hidden;
          box-shadow: inset 0 0 30px rgba(9,121,105,0.1);
          transform: scale(1);
          transition: transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .envelope-container.is-open .card-container {
          transform: scale(1.03);
          z-index: 4;
        }

        /* Elegant Gold Double Border */
        .card-border {
          position: absolute;
          inset: 18px;
          border: 1.5px solid rgba(212,175,55,0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          text-align: center;
        }

        .card-border::before {
          content: '';
          position: absolute;
          inset: 7px;
          border: 0.5px solid rgba(212,175,55,0.2);
        }

        /* Corner Ornaments */
        .corner-ornament {
          position: absolute;
          width: 60px;
          height: 60px;
          pointer-events: none;
          z-index: 3;
        }
        .corner-tl { top: 10px; left: 10px; }
        .corner-tr { top: 10px; right: 10px; transform: scaleX(-1); }
        .corner-bl { bottom: 10px; left: 10px; transform: scaleY(-1); }
        .corner-br { bottom: 10px; right: 10px; transform: scale(-1, -1); }

        /* Decorative Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 16px 0;
          z-index: 2;
        }
        .divider-line {
          width: 50px;
          height: 0.5px;
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
        }
        .divider-diamond {
          width: 6px;
          height: 6px;
          background: #D4AF37;
          transform: rotate(45deg);
          opacity: 0.7;
        }

        /* Typography */
        .text-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #3B1C22;
          margin-bottom: 20px;
          margin-top: auto;
          z-index: 2;
          font-weight: 400;
        }

        .text-names {
          font-family: "Great Vibes", cursive;
          font-size: 60px;
          line-height: 1.1;
          color: #3B1C22;
          margin: 0 0 10px 0;
          font-weight: 400;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .text-ampersand {
          font-family: "Great Vibes", cursive;
          font-size: 40px;
          display: block;
          margin: -2px 0;
          color: #D4AF37;
          text-shadow: 0 1px 2px rgba(212,175,55,0.3);
        }

        .text-details {
          font-family: 'Montserrat', sans-serif;
          font-size: 9.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #722F37;
          line-height: 2.2;
          margin-bottom: auto;
          z-index: 2;
          font-weight: 300;
        }

        .text-date {
          display: block;
          margin: 12px 0;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          color: #3B1C22;
        }

        .text-church {
          font-family: "Cormorant Garamond", serif;
          font-size: 14px;
          font-style: italic;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: #3B1C22;
          margin-top: 4px;
          text-transform: none;
        }

        /* Envelope Fold (Left Flap) */
        .flap-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 66%;
          height: 100%;
          background: linear-gradient(135deg, #097969 0%, #722F37 50%, #3B1C22 100%);
          background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
          border-right: 1px solid rgba(212,175,55,0.3);
          box-shadow: 10px 0 30px -10px rgba(59,28,34,0.2);
          transform-origin: left center;
          transform: rotateY(0deg);
          transition: transform 1.5s cubic-bezier(0.25, 1, 0.3, 1), box-shadow 1.5s ease;
          z-index: 5;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        .flap-left::after {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow: inset -3px 0 8px rgba(0,0,0,0.04);
          pointer-events: none;
        }

        .envelope-container.is-open .flap-left {
          transform: rotateY(-140deg);
          box-shadow: -15px 0 25px -10px rgba(0,0,0,0.15);
        }

        /* Satin Ribbon */
        .ribbon-wrap {
          position: absolute;
          top: 55%;
          transform: translateY(-50%);
          width: 100%;
          z-index: 6;
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .envelope-container.is-open .ribbon-wrap {
          opacity: 0;
          transform: translateY(-50%) scale(1.05);
          pointer-events: none;
        }

        .ribbon-band {
          width: 100%;
          height: 54px;
          background: linear-gradient(
            to bottom, 
            #F0F0F0 0%, 
            #FFFFFF 25%, 
            #E8E8E8 50%, 
            #FFFFFF 75%, 
            #DCDCDC 100%
          );
          box-shadow: 0 4px 6px rgba(0,0,0,0.1), inset 0 1px rgba(255,255,255,0.5);
        }

        /* Bow Container */
        .bow-center {
          position: absolute;
          top: 27px;
          left: 55%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 100px;
        }

        /* Image Bow styling */
        .bow-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: multiply;
          filter: drop-shadow(0 6px 8px rgba(0,0,0,0.15)) contrast(1.05);
          transform: scale(1.6);
        }

        .instruction-toast {
          position: absolute;
          bottom: -60px;
          left: 50%;
          transform: translateX(-50%);
          color: #3B1C22;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          opacity: 1;
          transition: opacity 0.5s;
          white-space: nowrap;
          font-weight: 400;
        }

        .envelope-container.is-open .instruction-toast {
          opacity: 0;
        }

        /* Shimmer animation for gold accents */
        @keyframes shimmer {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        @media (max-width: 600px) {
          .envelope-container {
            width: 340px;
            height: 520px;
          }
          .text-names {
            font-size: 46px;
          }
          .text-ampersand {
            font-size: 32px;
          }
          .corner-ornament {
            width: 45px;
            height: 45px;
          }
          .card-border {
            padding: 30px 16px;
          }
          .bow-center {
            width: 140px;
            height: 90px;
          }
        }
      `}</style>

      <div className="scene">
        <div
          className={`envelope-container ${opened ? 'is-open' : ''}`}
          onClick={() => {
            if (!opened) setOpened(true);
          }}
        >
          {/* Base shadow behind the card */}
          <div className="envelope-base"></div>

          {/* Inner Card */}
          <div className="card-container">
            <div className="card-border">
              {/* 4 Corner Gold Ornaments */}
              <svg className="corner-ornament corner-tl" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
                <path d="M5,5 L5,18 C5,12 12,5 18,5 L5,5 Z" fill="#D4AF37" opacity="0.08"/>
                <circle cx="5" cy="5" r="2" fill="#D4AF37" opacity="0.5"/>
                <path d="M8,5 Q12,8 5,12" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <path d="M5,8 Q8,12 12,5" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4" className="shimmer"/>
              </svg>
              <svg className="corner-ornament corner-tr" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
                <path d="M5,5 L5,18 C5,12 12,5 18,5 L5,5 Z" fill="#D4AF37" opacity="0.08"/>
                <circle cx="5" cy="5" r="2" fill="#D4AF37" opacity="0.5"/>
                <path d="M8,5 Q12,8 5,12" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <path d="M5,8 Q8,12 12,5" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4" className="shimmer"/>
              </svg>
              <svg className="corner-ornament corner-bl" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
                <path d="M5,5 L5,18 C5,12 12,5 18,5 L5,5 Z" fill="#D4AF37" opacity="0.08"/>
                <circle cx="5" cy="5" r="2" fill="#D4AF37" opacity="0.5"/>
                <path d="M8,5 Q12,8 5,12" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <path d="M5,8 Q8,12 12,5" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4" className="shimmer"/>
              </svg>
              <svg className="corner-ornament corner-br" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <path d="M5,5 L5,25 C5,15 15,5 25,5 L5,5 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" opacity="0.6"/>
                <path d="M5,5 L5,18 C5,12 12,5 18,5 L5,5 Z" fill="#D4AF37" opacity="0.08"/>
                <circle cx="5" cy="5" r="2" fill="#D4AF37" opacity="0.5"/>
                <path d="M8,5 Q12,8 5,12" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4"/>
                <path d="M5,8 Q8,12 12,5" stroke="#D4AF37" strokeWidth="0.5" fill="none" opacity="0.4" className="shimmer"/>
              </svg>

              <div className="text-eyebrow">
                {guestName ? `Dear ${guestName},` : 'Promise of Love'}
              </div>

              <div className="divider">
                <div className="divider-line" />
                <div className="divider-diamond" />
                <div className="divider-line" />
              </div>

              <h1 className="text-names">
                {WEDDING.brideName}
                <span className="text-ampersand">&</span>
                &nbsp;{WEDDING.groomName}
              </h1>

              <div className="divider">
                <div className="divider-line" />
                <div className="divider-diamond" />
                <div className="divider-line" />
              </div>

              <div className="text-details">
                Request the honour of your presence<br />
                <span className="text-date">{WEDDING.dateFull} · 8:00 AM</span>
                <span className="text-church">{WEDDING.venueName}</span><br />
                {WEDDING.venueArea}
              </div>
            </div>
          </div>

          {/* Opening Left Flap */}
          <div className="flap-left"></div>

          {/* Ribbon Wrapper */}
          <div className="ribbon-wrap">
            <div className="ribbon-band"></div>
            <div className="bow-center">
              {/* Photorealistic Satin Bow Image */}
              <img src="/ivory_satin_bow-removebg-preview.png" alt="Satin Bow" className="bow-image" />
            </div>
          </div>

          <div className="instruction-toast">Click to unwrap</div>
        </div>
      </div>
    </>
  );
}