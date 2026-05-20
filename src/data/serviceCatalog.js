/**
 * Local catalog placeholder until the backend exposes a /services endpoint.
 * Keeps the UI useful in the meantime and gives the user something to click.
 */
export const SERVICE_CATALOG = [
  {
    id: "consult-30",
    name: "Quick Consultation",
    icon: "💬",
    durationMinutes: 30,
    price: 80,
    description:
      "Short focused session to align expectations, scope and next steps.",
    tags: ["Discovery", "Online"],
  },
  {
    id: "consult-60",
    name: "In-Depth Session",
    icon: "🧠",
    durationMinutes: 60,
    price: 150,
    description:
      "A one-hour deep dive into the topic, with a follow-up summary delivered after the meeting.",
    tags: ["Deep work", "Online", "Most popular"],
  },
  {
    id: "support-90",
    name: "Implementation Support",
    icon: "⚙️",
    durationMinutes: 90,
    price: 220,
    description:
      "Hands-on session focused on execution: pair-coding, reviews or rollout assistance.",
    tags: ["Hands-on", "Online"],
  },
  {
    id: "audit-120",
    name: "Architecture Audit",
    icon: "🛠️",
    durationMinutes: 120,
    price: 320,
    description:
      "Two-hour structured review with written recommendations covering risks, gaps and roadmap.",
    tags: ["Senior", "Written report"],
  },
];

export function getServiceById(id) {
  return SERVICE_CATALOG.find((s) => s.id === id) || null;
}
