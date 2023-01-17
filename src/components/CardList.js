import '../App.css';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
// import refreshBoards from '../App';

const CardList = ({ cards }) => {
  const URL = 'https://llammmas-inspo-board-back-end.herokuapp.com';
  const [cardsData, setCardsData] = useState([]);

  const deleteCard = (card_id) => {
    axios
      .delete(`${URL}/cards/${card_id}`)
      .then((response) => {
        console.log(response.data);
        // refreshBoards();
        setCardsData((oldCard) => {
          return oldCard.filter((card) => card.id !== card_id);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // useEffect(deleteCard, []);

  const cardComponents = cards.map((card, index) => {
    // console.log(card);
    return (
      <div key={index}>
        <Card
          id={card.id}
          message={card.message}
          likes_count={card.likes_count}
          onDeleteCard={deleteCard}
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
      setLikesCount: PropTypes.func,
    })
  ),
  onDeleteCard: PropTypes.func,
};

export default CardList;
