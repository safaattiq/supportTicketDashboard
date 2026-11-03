# Support Ticket Dashboard

React practical assessment: a small support ticket dashboard built with React,
React Router and Vite.

## Run

```bash
npm install
npm run dev
```

The ticket data comes from a mock API (`src/services/ticketApi.js`). It is
asynchronous with a short delay, and the data is kept in `localStorage`.
Clear the `support-tickets` key in the browser to get the starting data back.

## Routes

| Route          | Page           |
| -------------- | -------------- |
| `/dashboard`   | Dashboard      |
| `/tickets`     | Tickets list   |
| `/tickets/new` | Create ticket  |
| `/tickets/:id` | Ticket details |
| `/login`       | Mock login     |

Everything except `/login` is behind `ProtectedRoute`. Log out from the navbar
to see the redirect to `/login`.

## Structure

```
src/
  components/   Navbar, Layout, ProtectedRoute, TicketCard, TicketList,
                TicketFilters, TicketForm, StatCard, Loader, ErrorMessage
  pages/        Dashboard, Tickets, TicketDetails, CreateTicket, Login
  context/      TicketContext, ticketReducer, AuthContext
  hooks/        useTickets, useTicket
  services/     ticketApi, seedTickets
  constants.js
```

## Design notes

**State: local vs shared.** The ticket list is shared (dashboard, list and
details all need it), so it is in `TicketContext` and managed with
`useReducer` (`SET_TICKETS`, `ADD_TICKET`, `DELETE_TICKET`, `UPDATE_TICKET`).
Search text, filters, form fields and "saving" flags are used by one
component only, so they are `useState` there. Dashboard numbers are not stored
at all; `useTickets` calculates them from the tickets.

**Where API calls live.** Calls are made inside the context functions
(`addTicket`, `removeTicket`, `changeStatus`), inside `useEffect` (initial
load, fetch by id) or inside event handlers. Never during render, because a
render can happen many times and an API call in it would also change state and
cause another render.

**useEffect.**
- `TicketProvider`: `[loadTickets]`. `loadTickets` is wrapped in `useCallback`
  with `[]`, so it never changes and the fetch runs once on load.
- `useTicket(id)`: `[id]`. It must re-run when the URL changes from
  `/tickets/1` to `/tickets/2`, otherwise the old ticket would stay on screen.
  If `id` were missing from the array the page would show stale data. If an
  object or function created during render were put in the array (a new
  reference every render), the effect would run after every render, set state,
  re-render and fetch again in a loop.
- `TicketForm`: `[]`, focus the title input once after mount.

**useRef.** `TicketForm` keeps a ref to the title input and focuses it when the
page opens. A ref is used because focusing is a DOM action and does not need a
re-render.

**useMemo.** Used for the filtered list in `Tickets` and the stats in
`useTickets`. With a few tickets it makes no real difference to speed; filtering
a short array is very cheap. It is used here to practise and to show how it is
written. It would matter for thousands of items or an expensive calculation.

**React.memo + useCallback.** Each render of `Tickets` creates a new
`handleDelete` function (functions are objects, and the function body runs again
on every render). `TicketCard` is wrapped in `React.memo`, which compares props
shallowly, so a new function reference would make it re-render every time, as if
memo was not there. `useCallback` keeps the same function between renders, so
typing in the search box does not re-render the cards that are still shown.
`useCallback` is not used on every function because it has its own cost and only
helps when the function is passed to a memoized child or used as a dependency.

**Keys.** `key={ticket.id}`. The id is unique and does not change when the list
is filtered, added to or deleted from, so React can match each card with the
right item. Using the index would make React reuse the wrong card when an item
before it is removed.

**Data flow.** Parent to child with props (`Tickets` -> `TicketList` ->
`TicketCard`). Child to parent with callbacks (`onDelete(ticket.id)`,
`onSearchChange`, `onSubmit`). Shared data through context.

**Link vs useNavigate.** `Link` for "View" and "New Ticket" because they are
plain navigation. `useNavigate` after creating a ticket, after logout and for
"Back to tickets" because the navigation follows logic.

**Routing without refresh.** `BrowserRouter` uses the History API to change
the URL without reloading. `Routes` then renders the component that matches the
URL, so only the changed part of the page updates and React state is kept.

**What causes re-renders.** A component re-renders when its own state changes,
when its parent re-renders (unless memoized and props are unchanged), or when a
context it uses changes value.
