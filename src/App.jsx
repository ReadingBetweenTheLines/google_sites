import React, { useState } from 'react';
import examData from './examData.json';

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  const currentStage = examData.stages.find(stage => stage.id === activeTab);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans antialiased text-slate-800">
      
      {/* Header Banner */}
      <header className="mb-8 p-6 bg-gradient-to-r from-indigo-900 to-slate-950 rounded-2xl text-white shadow-md">
        <span className="text-xs font-semibold tracking-wider uppercase bg-indigo-500/30 px-3 py-1 rounded-full border border-indigo-400/20">
          Study Guide Portal
        </span>
        <h1 className="text-2xl md:text-3xl font-black mt-3">{examData.title}</h1>
        <p className="text-indigo-200 text-sm mt-2 max-w-2xl">{examData.description}</p>
      </header>

      {/* Dynamic Stage Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {examData.stages.map(stage => (
          <button
            key={stage.id}
            onClick={() => setActiveTab(stage.id)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === stage.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Tahap {stage.id}
          </button>
        ))}
      </div>

      {/* Content Rendering Box */}
      {currentStage && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{currentStage.title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{currentStage.summary}</p>
          </div>

          {/* Render Bullet Lists (Used in Tahap 1 for basic definitions) */}
          {currentStage.content && (
            <ul className="space-y-2 border-l-2 border-indigo-500 pl-4 bg-indigo-50/50 py-3 rounded-r-xl">
              {currentStage.content.map((bullet, idx) => (
                <li key={idx} className="text-sm text-slate-700 font-medium">{bullet}</li>
              ))}
            </ul>
          )}

          {/* Conditional Binary Weight Table (Only shows up on Tahap 1) */}
          {currentStage.hasTable && (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <th className="p-3">Posisi</th>
                    {currentStage.tableData.headers.map((h, i) => (
                      <th key={i} className="p-3 text-center">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center font-mono font-bold text-indigo-600">
                    <td className="p-3 text-left font-sans font-medium text-slate-500">Bobot</td>
                    {currentStage.tableData.weights.map((w, i) => (
                      <td key={i} className="p-3 bg-indigo-50/30">{w}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Render Examples Grid Card Layout */}
          {currentStage.examples && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Contoh & Latihan</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {currentStage.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                    <h4 className="text-xs font-bold text-indigo-900 mb-1">{ex.title}</h4>
                    <p className="text-xs text-slate-600 font-mono leading-relaxed">{ex.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render Multi-Section Topics (Used in Tahap 2 for Pseudo-code & Switches) */}
          {currentStage.sections && (
            <div className="space-y-6">
              {currentStage.sections.map((sec, i) => (
                <div key={i} className="space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">{sec.heading}</h3>
                  <div className="space-y-2">
                    {sec.items.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 text-xs text-slate-700 border border-slate-100 leading-relaxed">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}