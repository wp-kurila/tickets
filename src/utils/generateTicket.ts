import { Ticket } from "../types";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function generateTicket(): Ticket {
  return {
    origin: "MOW",
    destination: "LED",
    stops: random(0, 5),
    price: random(150, 250)
  };
}
