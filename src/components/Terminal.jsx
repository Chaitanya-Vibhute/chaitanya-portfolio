import { useEffect, useRef, useState } from "react";
import { profile, skillGroups, responsibilities } from "../data/profile";
import { usePrefersReducedMotion } from "../hooks/useReducedMotion";

// Every command's output is built from the supplied profile data only.
const COMMANDS = {
  help: () => ["Available commands:", "  whoami   skills   experience   contact   clear"],
  whoami: () => [profile.name, profile.title, `${profile.location} · ${profile.experienceYears} years experience`],
  skills: () => skillGroups.map((g) => `${g.title}: ${g.items.slice(0, 4).join(", ")}`),
  experience: () => [
    `${profile.position} @ ${profile.company}`,
    profile.employment,
    `• ${responsibilities[0]}`,
    `• ${responsibilities[3]}`,
  ],
  contact: () => [profile.email, profile.phone, profile.location],
};

const INTRO = [
  { type: "cmd", text: "whoami" },
  ...COMMANDS.whoami().map((t) => ({ type: "out", text: t })),
];

export default function Terminal() {
  const reduced = usePrefersReducedMotion();
  const [lines, setLines] = useState(reduced ? INTRO : []);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  // Typewriter intro (skipped for reduced motion)
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = setInterval(() => {
      setLines(INTRO.slice(0, ++i));
      if (i >= INTRO.length) clearInterval(id);
    }, 420);
    return () => clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
    } else {
      const out = COMMANDS[cmd]
        ? COMMANDS[cmd]().map((t) => ({ type: "out", text: t }))
        : [{ type: "err", text: `command not found: ${cmd}. Try "help".` }];
      setLines((l) => [...l, { type: "cmd", text: cmd }, ...out]);
    }
    setInput("");
  };

  return (
    <div className="glass overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(139,92,246,0.5)]" data-cursor="text">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">chaitanya@portfolio ~ zsh</span>
      </div>
      <div
        ref={bodyRef}
        className="h-56 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-6"
        aria-live="polite"
      >
        {lines.map((l, i) => (
          <div key={i} className={l.type === "err" ? "text-red-400" : l.type === "cmd" ? "text-soft" : "text-muted"}>
            {l.type === "cmd" && <span className="mr-2 text-cyan">❯</span>}
            {l.text}
          </div>
        ))}
        <form onSubmit={run} className="flex items-center">
          <label htmlFor="term-input" className="sr-only">
            Type a command
          </label>
          <span className="mr-2 text-cyan">❯</span>
          <input
            id="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='try "help"'
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-soft placeholder:text-muted/50 focus:outline-none"
          />
        </form>
      </div>
    </div>
  );
}
