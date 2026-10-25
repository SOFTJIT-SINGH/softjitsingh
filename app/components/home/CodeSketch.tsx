const TOKEN =
  /(--.*$|\/\/.*$)|("[^"]*"|`[^`]*`)|\b(begin|select|from|where|for|update|set|commit|const|await|return|if|of|new)\b|(\$\d)/g;

function highlight(line: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(line.slice(last, i));
    const [text, comment, str, kw, param] = m;
    const cls = comment ? "text-mist/70 italic" : str ? "text-amber" : kw ? "text-mint" : param ? "text-amber" : "";
    out.push(
      <span key={i} className={cls}>
        {text}
      </span>
    );
    last = i + text.length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

export default function CodeSketch({ file, code }: { file: string; code: string }) {
  return (
    <figure className="rounded-lg border border-line bg-[#070b16] overflow-hidden">
      <figcaption className="flex items-center justify-between px-4 py-2.5 border-b border-line font-mono text-[11px] text-mist">
        <span>{file}</span>
        <span>simplified sketch</span>
      </figcaption>
      <pre className="px-4 py-4 overflow-x-auto font-mono text-[12.5px] leading-[1.75] text-cream/90">
        <code>
          {code.split("\n").map((line, i) => (
            <div key={i} className="flex">
              <span className="select-none w-7 shrink-0 text-mist/40">{i + 1}</span>
              <span className="whitespace-pre">{highlight(line)}</span>
            </div>
          ))}
        </code>
      </pre>
    </figure>
  );
}
