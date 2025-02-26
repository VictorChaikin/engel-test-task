import { useEffect, useState } from 'react';

import { ICard } from './components/Card/Card.component';

enum SortingEnum {
  'No Sorting' = 'NO_SORTING',
  'Plot size ASC' = 'PLOT_SIZE_ASC',
  'Plot size DESC' = 'PLOT_SIZE_DESC',
  'Price ASC' = 'PRICE_ASC',
  'Price DESC' = 'PRICE_DESC',
  'Rooms ASC' = 'ROOMS_ASC',
  'Rooms DESC' = 'Rooms_DESC',
}

const sortingOptions = [
  { label: 'No Sorting', value: SortingEnum['No Sorting'] },
  { label: 'Plot size ASC', value: SortingEnum['Plot size ASC'] },
  { label: 'Plot size DESC', value: SortingEnum['Plot size DESC'] },
  { label: 'Price ASC', value: SortingEnum['Price ASC'] },
  { label: 'Price DESC', value: SortingEnum['Price DESC'] },
  { label: 'Rooms ASC', value: SortingEnum['Rooms ASC'] },
  { label: 'Rooms DESC', value: SortingEnum['Rooms DESC'] }
];

enum FiltersEnum {
  'All' = 'ALL',
  'Houses' = 'HOUSES',
  'Appartments' = 'APPARTMENTS'
}

const filteringOptions = [
  { label: 'All', value: FiltersEnum.All },
  { label: 'Houses', value: FiltersEnum.Houses },
  { label: 'Appartments', value: FiltersEnum.Appartments },
];

const sortAsc = (field: string) => (a: any, b: any) => {
  if (a[field] < b[field]) {
    return -1;
  }
  if (a[field] > b[field]) {
    return 1;
  }
  return 0;
}

const sortDesc = (field: string) => (a: any, b: any) => {
  if (a[field] < b[field]) {
    return 1;
  }
  if (a[field] > b[field]) {
    return -1;
  }
  return 0;
}

export const useSortFilterCards = (cards: ICard[]) => {
  const [filteredAndSortedCards, setFilteredAndSortedCards] = useState<ICard[]>([]);
  const [currentSorting, setCurrentSoring] = useState<SortingEnum>(SortingEnum['No Sorting']);
  const [currentFiltering, setCurrentFiltering] = useState<FiltersEnum>(FiltersEnum.All);
  const [search, setSearch] = useState('');

  const onSelectSorting = (value: SortingEnum) => {
    setCurrentSoring(value);
  };

  const onSelectFiltering = (value: FiltersEnum) => {
    setCurrentFiltering(value)
  };

  const handleFiltering = (cards: ICard[], type?: FiltersEnum): ICard[] => {
    if (!type || type === FiltersEnum.All) {
      return cards;
    }

    if (type === FiltersEnum.Appartments) {
      return cards.filter(card => card.type === 'apartment');
    }

    return cards.filter(card => card.type === 'house');
  };

  const handleSorting = (cards: ICard[], type?: SortingEnum): ICard[] => {
    let sortedCards = cards;

    switch (type) {
      case SortingEnum['Plot size ASC']:
        sortedCards = cards.sort(sortAsc('plotSize')); break;
      case SortingEnum['Plot size DESC']:
        sortedCards = cards.sort(sortDesc('plotSize')); break;
      case SortingEnum['Price ASC']:
        sortedCards = cards.sort(sortAsc('price')); break;
      case SortingEnum['Price DESC']:
        sortedCards = cards.sort(sortDesc('price')); break;
      case SortingEnum['Rooms ASC']:
        sortedCards = cards.sort(sortAsc('rooms')); break;
      case SortingEnum['Rooms DESC']:
        sortedCards = cards.sort(sortDesc('rooms')); break;
    }

    return sortedCards;
  };

  const handleSearch = (cards: ICard[], search?: string): ICard[] => {
    if (!search?.length) {
      return cards;
    }

    return cards.filter(card => card.title.startsWith(search));
  };

  useEffect(() => {
    const searchedCards = handleSearch(cards, search);
    const newCards = [...handleFiltering(searchedCards, currentFiltering)];

    setFilteredAndSortedCards([...handleSorting(newCards, currentSorting)]);
  }, [cards, search, currentFiltering, currentSorting])

  return {
    currentSorting,
    currentFiltering,
    sortingOptions,
    filteringOptions,
    onSelectFiltering,
    onSelectSorting,
    onSetSearch: (val: string) => setSearch(val),
    filteredAndSortedCards
  }
}
