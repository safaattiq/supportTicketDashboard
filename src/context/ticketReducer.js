// Pure function: (state, action) => new state. It never mutates the old
// array and never talks to the API. The API call happens first, then the
// result is dispatched here.

export const initialTicketState = [];

export function ticketReducer(state, action) {
  switch (action.type) {
    case "SET_TICKETS":
      return action.payload;

    case "ADD_TICKET":
      return [...state, action.payload];

    case "DELETE_TICKET":
      // payload is the ticket id
      return state.filter((ticket) => ticket.id !== action.payload);

    case "UPDATE_TICKET":
      // payload is the full updated ticket
      return state.map((ticket) =>
        ticket.id === action.payload.id ? action.payload : ticket
      );

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
