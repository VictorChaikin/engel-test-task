import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import './AddCardSidebar.styles.css'


interface IDrawerProps {
  onClose: () => void;
  onAdd: (title: string, price: number, plotSize: number, rooms: number) => void;
}

const AddCardSidebar = (props: IDrawerProps) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>();
  const [plotSize, setPlotSize] = useState<number>();
  const [rooms, setRooms] = useState<number>()

  const onCreateProperty = () => {
    if (!price || !plotSize || !rooms) {
      return;
    }

    props.onAdd(title, price, plotSize, rooms)
  }

  return (
    <Box component='form' sx={{ width: 350, xs: { width: '100%' } }} role="presentation">
        <div className='header'>
          New property

          <CloseIcon className='icon' onClick={props.onClose} />
        </div>

        <div className='content'>
          <TextField
            required
            label='Property title'
            type='text'
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
          />

          <TextField
            required
            label='Price'
            type='number'
            value={price} 
            onChange={(e) => setPrice(e.target.value as unknown as number)}
            variant="standard"
          />

          <TextField
            required
            label='Plot size'
            type='number'
            value={plotSize} 
            onChange={(e) => setPlotSize(e.target.value as unknown as number)}
            variant="standard"
          />

          <TextField
            required
            label='Rooms'
            type='number'
            value={rooms} 
            onChange={(e) => setRooms(e.target.value as unknown as number)}
            variant="standard"
          />

          <Button startIcon={<AddIcon />} onClick={onCreateProperty} variant='contained' color='error' type='submit'> Create property</Button>
        </div>
    </Box>
  );
};

interface AddCardSidebarBtnProps {
  onAdd: (title: string, price: number, plotSize: number, rooms: number) => void;
}

export const AddCardSidebarBtn = ({ onAdd } : AddCardSidebarBtnProps) => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button startIcon={<AddIcon />} variant='contained' color='error' onClick={toggleDrawer(true)}>Add property</Button>

      <Drawer anchor='right' open={open}>
        <AddCardSidebar onAdd={onAdd} onClose={toggleDrawer(false)} />
      </Drawer>
    </div>
  );
}