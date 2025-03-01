"use client";

import { useEffect, useRef } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { noctisLilac } from "@uiw/codemirror-theme-noctis-lilac";
import { EditorView } from "@codemirror/view";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

const editorSetup = EditorView.theme({
  "&": {
    height: "100%",
    fontSize: "16px",
  },
  ".cm-scroller": {
    fontFamily: "JetBrains Mono, monospace",
  },
  ".cm-content": {
    padding: "16px 0",
  },
  ".cm-line": {
    padding: "0 16px",
  },
  "&.cm-focused": {
    outline: "none",
  },
  "& ::-webkit-scrollbar": {
    width: "6px",
    height: "6px",
  },
  "& ::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "3px",
  },
  "& ::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
  "& scrollbar": {
    width: "6px",
    height: "6px",
  },
  "& scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "3px",
  },
  "& scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "& scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
});

const extensions = [sql(), editorSetup, EditorView.lineWrapping];

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const initialCode = `-- Welcome to Qube
SELECT
  users.id,
  users.name,
  users.email,
  orders.order_date
FROM
  users
JOIN
  orders ON users.id = orders.user_id
WHERE
  orders.status = 'completed'
ORDER BY
  orders.order_date DESC
LIMIT 10;`;

  const { setContainer } = useCodeMirror({
    container: editorRef.current,
    extensions,
    value: initialCode,
    theme: noctisLilac,
    height: "100%",
    width: "100%",
    basicSetup: {
      lineNumbers: true,
      highlightActiveLine: true,
      highlightSelectionMatches: true,
      autocompletion: true,
    },
  });

  useEffect(() => {
    if (editorRef.current) {
      setContainer(editorRef.current);
    }
  }, [setContainer]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 overflow-hidden border border-slate-300 dark:border-slate-700 rounded-md m-4 bg-white dark:bg-slate-900 relative">
        <div ref={editorRef} className="h-full w-full" />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <RunQueryButton />
        </div>
      </div>
    </div>
  );
}

const RunQueryButton = () => {
  return (
    <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
        <Play className="mr-2" size={15} /> <span>Run Query</span>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </button>
  );
};
