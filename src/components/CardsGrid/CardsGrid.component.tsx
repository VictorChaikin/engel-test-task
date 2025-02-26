import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ICard, Card } from '../Card/Card.component';

interface ICardsGridProps {
  cards: ICard[];
  onDeleteCard: (id: string) => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export const CardsGrid = ({ cards, onDeleteCard }: ICardsGridProps) => {
  
  return (
    <Box sx={{ width: 'calc(100% - 64px)', padding: 4 }}>
      <Grid container rowSpacing={3} columnSpacing={3}>

        {cards?.map((card) => (
          <Grid key={card.id} item xs={12} sm={6} md={4} lg={3}>
            <Item><Card card={card} onDelete={() => onDeleteCard(card.id)} /></Item>
          </Grid>
        ))}

        {!cards?.length && (
          <div style={{fontSize: 24, textAlign: 'center', paddingTop: 140, margin: 'auto'}}>No data</div>
        )}
      </Grid>
    </Box>
  );
}
