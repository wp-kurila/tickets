import { Ticket } from "../types";

interface TicketProps extends Ticket {
  onClick?: () => void;
}

export const TicketComponent = (props: TicketProps) => {
  return (
    <div style={{ border: "1px solid #EEE", marginTop: 10, padding: 10 }}>
      <h3>{props.price}$</h3>
      <div>
        {props.origin} – {props.destination}
      </div>
      <div>Stops: {props.stops}</div>
    </div>
  );
};
