import { Ticket } from "../types";
import { generateTicket } from "../utils/generateTicket";

const tickets: Ticket[] = Array(10)
  .fill(null)
  .map(() => generateTicket());

export const fetchTickets = (): Promise<Ticket[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(tickets);
    }, 500);
  });
};
