// Starting data for the mock API. Components never import this file;
// only ticketApi.js does, so the UI always goes through the "API".
export const seedTickets = [
  {
    id: 1,
    title: "Login page not working",
    description: "User receives an error when logging in.",
    status: "open",
    priority: "high",
    category: "Bug",
  },
  {
    id: 2,
    title: "Add dark mode",
    description: "Several users have asked for a dark theme in the settings page.",
    status: "open",
    priority: "low",
    category: "Feature Request",
  },
  {
    id: 3,
    title: "Invoice PDF is blank",
    description: "Downloading an invoice gives an empty PDF file.",
    status: "in-progress",
    priority: "high",
    category: "Bug",
  },
  {
    id: 4,
    title: "How do I reset my password?",
    description: "Customer cannot find the reset password option.",
    status: "resolved",
    priority: "medium",
    category: "Question",
  },
  {
    id: 5,
    title: "Slow search results",
    description: "Searching the knowledge base takes more than ten seconds.",
    status: "in-progress",
    priority: "medium",
    category: "Bug",
  },
  {
    id: 6,
    title: "Update company logo in emails",
    description: "Email templates still show the old logo.",
    status: "resolved",
    priority: "low",
    category: "Other",
  },
];
