// Avatar de iniciais on-brand — segue o atom "Avatares" do Design System.
// Tons de verde determinísticos a partir do nome (sem dependência de imagem externa).

const TINTS = [
  { bg: "#19302B", fg: "#8DD596" },
  { bg: "#0E7C4A", fg: "#EDF0F2" },
  { bg: "#102823", fg: "#8DD596" },
  { bg: "#02976E", fg: "#FFFFFF" },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

export function Avatar({ name }: { name: string }) {
  const tint = TINTS[name.length % TINTS.length];
  return (
    <div
      className="flex aspect-[4/5] w-full items-center justify-center"
      style={{ background: `linear-gradient(140deg, ${tint.bg}, ${tint.bg}cc)` }}
      role="img"
      aria-label={name}
    >
      <span className="font-heading text-5xl font-bold" style={{ color: tint.fg }}>
        {initials(name)}
      </span>
    </div>
  );
}
