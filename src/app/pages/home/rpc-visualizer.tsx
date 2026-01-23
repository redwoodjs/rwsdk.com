"use client";
import React, { useState, useEffect } from "react";

interface RPCVisualizerProps {
  interactionKey: string;
}

export default function RPCVisualizer({ interactionKey }: RPCVisualizerProps) {
  const [phase, setPhase] = useState<"idle" | "request" | "server" | "response">("idle");
  const [stream, setStream] = useState<string[]>([]);

  useEffect(() => {
    setPhase("idle");
    setStream([]);
    
    const sequence = async () => {
      // Step 1: Request
      setPhase("request");
      await new Promise(r => setTimeout(r, 600));

      // Step 2: Server
      setPhase("server");
      await new Promise(r => setTimeout(r, 800));

      // Step 3: Response (Streaming)
      setPhase("response");
      const chunks = interactionKey === "rpc-query" 
        ? ['{"id": 1, "status": "done"}', '{"id": 2, "status": "pending"}']
        : ['1:"$Sreact.suspense"', '2:I["./AddTodo.tsx",[]]', '3:HL["/style.css"]'];
      
      for (const chunk of chunks) {
        setStream(prev => [...prev, chunk]);
        await new Promise(r => setTimeout(r, 400));
      }
    };

    sequence();
  }, [interactionKey]);

  return (
    <div className="bg-slate-900 rounded-lg p-4 font-mono text-[11px] border border-white/10 shadow-2xl">
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="ml-2 text-white/40 text-[10px] uppercase tracking-widest">Network Inspector</span>
      </div>

      <div className="space-y-4">
        {/* Request Line */}
        <div className={`transition-opacity duration-300 ${phase !== "idle" ? "opacity-100" : "opacity-0"}`}>
          <div className="text-green-400 mb-1">→ POST /__rpc</div>
          <div className="text-white/60 pl-4 border-l border-white/10">
            {interactionKey === "rpc-basic" && '{"action": "addTodo", "args": [...]}'}
            {interactionKey === "rpc-query" && '{"query": "getTodos", "args": ["user_123"]}'}
            {interactionKey === "rpc-action" && '{"action": "createTodo", "args": ["Buy milk"]}'}
          </div>
        </div>

        {/* Server Indicator */}
        <div className={`flex items-center gap-3 transition-all duration-300 ${phase === "server" || phase === "response" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
          <div className="text-blue-400">⚡ Server Logic</div>
          <div className="h-[1px] flex-1 bg-white/5" />
          {phase === "server" && <div className="animate-pulse text-blue-300">Executing...</div>}
        </div>

        {/* Response Line */}
        <div className={`transition-opacity duration-300 ${phase === "response" ? "opacity-100" : "opacity-0"}`}>
          <div className="text-purple-400 mb-2">← Response (Streaming)</div>
          <div className="space-y-1 pl-4 border-l border-purple-500/30">
            {stream.map((chunk, i) => (
              <div key={i} className="text-white/80 animate-in fade-in slide-in-from-left-2 duration-300">
                <span className="text-white/30 mr-2">chunk_{i}:</span>
                {chunk}
              </div>
            ))}
            {phase === "response" && stream.length === (interactionKey === "rpc-query" ? 2 : 3) && (
              <div className="mt-4 pt-2 border-t border-white/5">
                <div className={`text-[10px] uppercase font-bold tracking-wider ${interactionKey === "rpc-query" ? "text-yellow-500" : "text-green-500"}`}>
                  {interactionKey === "rpc-query" ? "✦ SKIPPING HYDRATION (DATA ONLY)" : "✦ TRIGGERING RSC RE-RENDER"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
