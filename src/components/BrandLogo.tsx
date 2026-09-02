import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'white';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '', variant = 'full' }) => {
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Medical Crest Emblem */}
      <div className="relative flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 p-0.5 shadow-md shadow-teal-900/15 border border-teal-400/40 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          {/* Subtle Outer Concentric Circle */}
          <circle cx="22" cy="22" r="19" stroke="#5eead4" strokeWidth="1.2" strokeDasharray="2 2" />
          
          {/* Domestic Sanctuary Roof */}
          <path
            d="M22 8L9 19H13V33H31V19H35L22 8Z"
            stroke="#a7f3d0"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Medical Clinical Cross */}
          <path
            d="M19 18H25V21H28V27H25V30H19V27H16V21H19V18Z"
            fill="#34d399"
          />

          {/* Clinical Caring Pulse Line */}
          <path
            d="M14 24H17L19 20L22 28L25 22L27 24H30"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Text Hierarchy */}
      {variant !== 'compact' && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-wider text-base sm:text-lg leading-none uppercase font-heading ${
                isWhite ? 'text-white' : 'text-slate-900'
              }`}
            >
              ANUMAN
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 tracking-wider">
              CARE
            </span>
          </div>

          <span
            className={`text-[10.5px] sm:text-[11px] font-extrabold tracking-wider uppercase mt-0.5 ${
              isWhite ? 'text-teal-300' : 'text-teal-700'
            }`}
          >
            HOME HEALTH CARE CENTRE
          </span>

          <span
            className={`text-[9.5px] font-medium tracking-tight ${
              isWhite ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            A Complete Home Care Solution • Patna
          </span>
        </div>
      )}
    </div>
  );
};
