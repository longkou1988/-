import React, { useState } from 'react';
import { SCRIPT_TECHNIQUES } from './constants';
import { TechniqueCard } from './components/TechniqueCard';
import { generateScript } from './services/geminiService';
import { ScriptDisplay } from './components/ScriptDisplay';
import { GeneratedScript } from './types';

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState<GeneratedScript | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setScript(null);

    try {
      const result = await generateScript(input);
      setScript(result);
    } catch (err) {
      setError("生成脚本失败。请检查您的 API 密钥并重试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Sidebar - Techniques & Branding */}
      <div className="lg:w-80 bg-white border-r border-slate-200 p-6 flex flex-col gap-6 h-auto lg:h-screen lg:sticky lg:top-0 overflow-y-auto z-10">
        <div className="flex items-center gap-2 text-indigo-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">爆款文案架构师</h1>
        </div>

        <div className="text-sm text-slate-500">
          基于经过验证的短视频心理学。此工具将6大核心技巧应用于您的原始创意。
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-xs font-bold uppercase text-slate-400 tracking-wider">核心技巧</h2>
          {SCRIPT_TECHNIQUES.map((tech) => (
            <TechniqueCard key={tech.id} technique={tech} />
          ))}
        </div>
        
        <div className="pt-6 border-t border-slate-100 text-xs text-slate-400">
          由 Gemini 2.5 Flash 驱动
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full">
        
        {/* Input Section */}
        <section className="mb-10">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">输入素材</h2>
            <p className="text-slate-500">粘贴文章、主题或草稿。我们将为您重构。</p>
          </div>
          
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="例如：如何制作完美的炒蛋，或者在此粘贴一篇长文章..."
              className="w-full h-40 p-4 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none text-slate-700 shadow-sm"
            />
            <div className="absolute bottom-3 right-3">
              <span className={`text-xs ${input.length > 0 ? 'text-indigo-500' : 'text-slate-300'}`}>
                {input.length} 字
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className={`
                px-8 py-3 rounded-lg font-semibold text-white shadow-lg shadow-indigo-200
                transition-all transform active:scale-95 flex items-center gap-2
                ${loading || !input.trim() 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'
                }
              `}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在撰写脚本...
                </>
              ) : (
                <>
                  <span>✨ 生成爆款脚本</span>
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm">
              {error}
            </div>
          )}
        </section>

        {/* Output Section */}
        {script && (
          <section className="animate-fade-in-up">
             <ScriptDisplay script={script} />
          </section>
        )}

        {!script && !loading && (
          <div className="text-center py-20 text-slate-300">
            <div className="text-6xl mb-4">🎬</div>
            <p>准备好打造您的下一个爆款视频了吗？</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;