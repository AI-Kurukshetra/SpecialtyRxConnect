const capabilities = [
  {
    title: "Enrollment that captures the full case upfront",
    description:
      "Collect demographics, therapy context, payer details, and patient support needs in one structured intake path."
  },
  {
    title: "A real operational dashboard",
    description:
      "Move beyond welcome cards. Highlight urgent cases, auth blockers, affordability gaps, and outreach due today."
  },
  {
    title: "Prior authorization visibility",
    description:
      "Track pending documentation, payer review, approvals, denials, and appeal readiness from the same case record."
  },
  {
    title: "Affordability coordination",
    description:
      "Tie copay programs, patient assistance, and savings estimates directly to the treatment journey."
  },
  {
    title: "Embedded communication history",
    description:
      "Keep patient, provider, payer, and pharmacy touchpoints in one timeline instead of scattered inboxes."
  },
  {
    title: "RLS-ready Supabase data model",
    description:
      "The backend is organized for organization-scoped security, server-side data access, and future storage workflows."
  }
];

export function CapabilityGrid() {
  return (
    <section className="section-stack">
      <div className="max-w-3xl">
        <span className="eyebrow">MVP scope, upgraded</span>
        <h2 className="mt-3 font-display text-4xl tracking-tight text-slate-950">
          The first release focuses on the access layer where therapy delays
          are created.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {capabilities.map((item) => (
          <article className="panel p-6" key={item.title}>
            <h3 className="font-display text-2xl tracking-tight text-slate-950">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
