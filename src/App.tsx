import { useCallback, useEffect, useMemo, useState } from "react";
import { Ticket } from "./types";
import { fetchTickets } from "./model/tickets";
import { TicketComponent } from "./components/Ticket";

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>();
  const [selectedStops, setSelectedStops] = useState<number[]>([]);

  useEffect(() => {
    fetchTickets().then(res => setTickets(res.sort((a, b) => a.price - b.price)));
  }, []);

  const stops = useMemo(() => {
	if (!tickets?.length) {
		return [];
	}

	const allStops = tickets.map(item => item.stops);
	return allStops.filter((item, i) => allStops.indexOf(item) === i).sort((a, b) => a - b);
  }, [tickets]);

  const getLabel = (stop: number) => {
	switch (stop) {
		case 0: return 'Без пересадок';
		case 1: return `${stop} пересадка`;
		case 2:
		case 3:
		case 4: return `${stop} пересадки`;
		default: return `${stop} пересадок`;
	}
  }

  const handleStops = useCallback((stop: number) => {
	if (selectedStops.includes(stop)) {
		setSelectedStops(prev => prev.filter(item => item !== stop));
	} else {
		setSelectedStops(prev => [...prev, stop]);
	}
  }, [selectedStops]);

  const ticketsFiltered = useMemo(() => {
	if (!selectedStops.length) return tickets;

	return tickets.filter(ticket => selectedStops.includes(ticket.stops));
  }, [selectedStops, tickets]);

  return (
    <div className="App">
      {!tickets && <div>...loading</div>}
	  {stops?.map((stop, i) => {
		const label = getLabel(stop);
		return (
			<div key={i}>
				<input type="checkbox" id={`stop_${i}`} onChange={() => handleStops(stop)} />
				<label htmlFor={`stop_${i}`}>{label}</label>
			</div>
		)
	  })}
	  {ticketsFiltered?.map((ticket, i) => {
        return <TicketComponent {...ticket} key={i} />;
      })}
    </div>
  );
}
