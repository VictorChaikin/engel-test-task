import React from 'react';
import { ReactComponent as CardImg } from './image.svg';
import CloseIcon from '@mui/icons-material/Close';
import './Card.styles.css';

export interface ICard {
  name: string;
  address: string;
  price: string;
  title: string;
  plotSurface: number;
  plotSize: number;
  type: "apartment" | "house",
  rooms: number;
  floor: number;
  id: string;
}

interface ICardProps {
  card: ICard;
  onDelete: () => void;
}

export const Card = ({ card, onDelete}: ICardProps) => {
  const isHouse = card.type === 'house';

  const property = (title: string, value: any, customClassName?: string) => (
    <div className={`${customClassName} property`}>
      <div className='label'>{title}:</div>
      <div className='value'>{value}</div>
    </div>
  );

  return (
    <div className="card">
      <div className='card-header'>
        {card.title}

        <CloseIcon className='icon' onClick={onDelete} />
      </div>

      <div className='card-content'>
        <CardImg />

        <div className='card-props'>
          {property('Rooms', card.rooms)}
         
          {isHouse ? 
            property('Plot size',<>{card.plotSize} m<sup>2</sup></>)
          : 
            property('Floor', card.floor)
          }
          
          {property('Price', `${card.price} EUR`, 'price')}
        </div>
      </div>
    </div>
  );
}
