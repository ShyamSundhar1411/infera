const STEPS = [
  {
    title: "Play first",
    text: "Every page opens on a live canvas. Click to add points, drag them, switch datasets, crank the noise.",
  },
  {
    title: "Turn the knobs",
    text: "Depth, kernels, learning rates, priors. Each control says what it does, and the picture answers instantly.",
  },
  {
    title: "Then read why",
    text: "Underneath: the intuition, the step-by-step algorithm, the formulas, and experiments worth trying.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
        {STEPS.map((s, i) => (
          <div key={s.title} className="bg-surface p-7">
            <span className="font-mono text-xs text-muted">0{i + 1}</span>
            <h3 className="mt-3 font-display text-3xl tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
