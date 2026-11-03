import { seedTickets } from "./seedTickets";

// A tiny mock REST API. Data lives in localStorage so it survives a page
// refresh, and every call is async with a small delay so the UI really has
// to deal with loading states.

const STORAGE_KEY = "support-tickets";
const DELAY_MS = 400;

const delay = (ms = DELAY_MS) => new Promise((resolve) => setTimeout(resolve, ms));

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // storage unavailable or corrupted: fall back to the seed data
  }
  return seedTickets;
}

function writeStore(tickets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch {
    // ignore, data just won't persist
  }
}

// GET /tickets
export async function getTickets() {
  await delay();
  return readStore();
}

// GET /tickets/:id
export async function getTicketById(id) {
  await delay();
  const ticket = readStore().find((t) => t.id === Number(id));
  if (!ticket) throw new Error("Ticket not found");
  return ticket;
}

// POST /tickets
export async function createTicket(data) {
  await delay();
  const tickets = readStore();
  const nextId = tickets.reduce((max, t) => Math.max(max, t.id), 0) + 1;
  const ticket = { ...data, id: nextId, status: "open" };
  writeStore([...tickets, ticket]);
  return ticket;
}

// PATCH /tickets/:id
export async function updateTicket(id, changes) {
  await delay();
  const tickets = readStore();
  const existing = tickets.find((t) => t.id === Number(id));
  if (!existing) throw new Error("Ticket not found");
  const updated = { ...existing, ...changes };
  writeStore(tickets.map((t) => (t.id === updated.id ? updated : t)));
  return updated;
}

// DELETE /tickets/:id
export async function deleteTicket(id) {
  await delay();
  const tickets = readStore();
  if (!tickets.some((t) => t.id === Number(id))) {
    throw new Error("Ticket not found");
  }
  writeStore(tickets.filter((t) => t.id !== Number(id)));
  return id;
}
