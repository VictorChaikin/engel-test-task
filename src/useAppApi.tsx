import { useEffect, useState } from 'react';

import { ICard } from './components/Card/Card.component';

export const useAppApi = () => {
  const [cards, setCards] = useState<ICard[]>([]);

  const getCards = () => {
    fetch('https://6438f9604660f26eb1a7568b.mockapi.io/api/properties')
    .then((data) => data.json())
    .then((res: Array<ICard>) => setCards(res.filter(card => card.title?.length)))
    .catch((e) => console.error(e));
  };

  useEffect(() => {
   getCards();
  }, []);

  const deleteCard = (id: string) => {
    fetch(`https://6438f9604660f26eb1a7568b.mockapi.io/api/properties/${id}`, { method: 'DELETE'})
    .then(() => getCards())
    .catch((e) => console.error(e));
  };

  const createCard = (title: string, price: number, plotSize: number, rooms: number) => {
    const body = JSON.stringify({
      "title": title,
      "address": "98350 Herzog Burg",
      "type": "apartment",
      "rooms": rooms,
      "price": price,
      "plotSurface": plotSize,
      "floor": 0
    });
    console.log(body);

    fetch('https://6438f9604660f26eb1a7568b.mockapi.io/api/properties', { method: 'POST', body})
    .then((res) => res.json())
    .then(data => console.log(data))
    .then(() => getCards())
    .catch((e) => console.error(e));
  };

  return {
    deleteCard,
    createCard,
    cards,
  }
}
