import React from 'react';
import { GeneratedScript } from '../types';

interface Props {
  script: GeneratedScript;
}

export const ScriptDisplay: React.FC<Props> = ({ script }) => {
  const handleCopy = () => {
    const plainText = script.segments
      .map((s) => `[${s.section}]\n(${s.visualCue})\n${s.audioText}`)
      .join('\n\n');
    navigator.clipboard.writeText(plainText);
    alert("脚本已复制到剪贴板！");
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header Analysis Card */}
      <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-lg bg-opacity-95 backdrop-blur-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">{script.title}</h2>
            <p className="text-indigo-200 text-sm">AI 优化脚本</p>
          </div>
          <button
            onClick={handleCopy}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            复制
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
          <div className="bg-white/10 p-3 rounded-lg">
            <span className="block text-indigo-300 mb-1 uppercase tracking-wider text-[10px]">基调</span>
            {script.analysis.tone}
          </div>
          <div className="bg-white/10 p-3 rounded-lg">
            <span className="block text-indigo-300 mb-1 uppercase tracking-wider text-[10px]">字数</span>
            {script.analysis.wordCount} 字
          </div>
          <div className="bg-white/10 p-3 rounded-lg col-span-2">
            <span className="block text-indigo-300 mb-1 uppercase tracking-wider text-[10px]">钩子策略</span>
            {script.analysis.hookStrategy}
          </div>
        </div>
      </div>

      {/* Script Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium w-24">时长</th>
                <th className="p-4 font-medium w-1/4">画面 / 动作</th>
                <th className="p-4 font-medium">口播 / 台词</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {script.segments.map((seg, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="p-4 align-top">
                    <span className="inline-block bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono">
                      {seg.durationEstimate}
                    </span>
                    <div className="mt-2 text-xs font-bold text-indigo-500 uppercase">
                      {seg.section}
                    </div>
                  </td>
                  <td className="p-4 align-top">
                    <p className="text-sm text-slate-600 italic leading-relaxed">
                      {seg.visualCue}
                    </p>
                  </td>
                  <td className="p-4 align-top">
                    <p className="text-base text-slate-800 font-medium leading-relaxed">
                      "{seg.audioText}"
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3 items-start">
        <span className="text-xl">💡</span>
        <div>
          <h4 className="font-bold text-yellow-800 text-sm">创作者贴士</h4>
          <p className="text-sm text-yellow-700 mt-1">
            录制前请大声朗读。如果你觉得拗口，就改掉它。AI遵循了“口语化”原则，但你个人的语感最重要。
          </p>
        </div>
      </div>
    </div>
  );
};