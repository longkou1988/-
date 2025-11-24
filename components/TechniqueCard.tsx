import React from 'react';
import { Technique } from '../types';

interface Props {
  technique: Technique;
}

export const TechniqueCard: React.FC<Props> = ({ technique }) => {
  return (
    <div className="group relative bg-white p-4 rounded-lg shadow-sm border border-slate-100 hover:shadow-md hover:border-indigo-100 transition-all duration-200">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl bg-indigo-50 w-10 h-10 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform">
          {technique.icon}
        </span>
        <h3 className="font-semibold text-slate-800 text-sm">{technique.title}</h3>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">
        {technique.description}
      </p>
    </div>
  );
};