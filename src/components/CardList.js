import '../App.css';
import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

const CardList = (props) => {
  const cardComponents = props.cards.map((card, index) => {
    return (
      <div key={index}>
        <Card
          id={card.id}
          message={card.message}
          likes_count={card.likes_count}
          onDeleteCard={props.onDeleteCard}
          onIncreaseLikes={props.onIncreaseLikes}
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
  onIncreaseLikes: PropTypes.func,
};

export default CardList;
