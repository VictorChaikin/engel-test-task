import React from 'react';

import './App.css';
import { CardsGrid } from './components/CardsGrid/CardsGrid.component';
import { AddCardSidebarBtn } from './components/AddCardSidebar/AddCardSidebar.component';
import { useAppApi } from './useAppApi';
import { CustomSelect } from './components/Select/Select.component';
import { useSortFilterCards } from './useSortFilterCards';
import { TextField } from '@mui/material';

const App = () => {
  const { createCard, deleteCard, cards } = useAppApi();
  const sortingFilteringData = useSortFilterCards(cards);

  return (
    <div className="App">
      <header className="App-header">
        <div className='selectors'>
          <TextField
            style={{ minWidth: 400 }}
            placeholder="Search..."
            type='text'
            onChange={(e) => sortingFilteringData.onSetSearch(e.target.value)}
          />

          <CustomSelect
            label='Sort by'
            value={sortingFilteringData.currentSorting}
            options={sortingFilteringData.sortingOptions}
            onSelect={sortingFilteringData.onSelectSorting as unknown as (value: string) => void}
          />

          <CustomSelect
            label='Filter by'
            value={sortingFilteringData.currentFiltering}
            options={sortingFilteringData.filteringOptions}
            onSelect={sortingFilteringData.onSelectFiltering as unknown as (value: string) => void}
          />
        </div>

        <AddCardSidebarBtn onAdd={createCard} />
      </header>

      <CardsGrid onDeleteCard={deleteCard} cards={sortingFilteringData.filteredAndSortedCards} />
    </div>
  );
}

export default App;
