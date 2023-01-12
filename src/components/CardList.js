import '../App.css';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const CardList = ({ cards }) => {
  const cardComponents = cards.map((card, index) => {
    console.log(card);
    return (
      <div key={index}>
        <Card
          id={card.id}
          message={card.message}
          likes_count={card.likes_count}
        />
      </div>
    );
  });
  return <div id='board-display'>{cardComponents}</div>;
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string,
      likes_count: PropTypes.number,
    })
  ),
};

export default CardList;
