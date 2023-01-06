import './Board.css';
import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

const Board = ({ id, title, owner, cards }) => {
  // const cardComponents = cards.map((card, index) => {
  //   return (
  //     <div key={index}>
  //       <Card
  //         card_id={card.card_id}
  //         message={card.message}
  //         likes_count={card.likes_count}
  //       />
  //     </div>
  //   );
  // });

  return <div>{title}<ol>{<CardList cards={cards}/>}</ol></div>;
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  owner: PropTypes.string,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      card_id: PropTypes.number.isRequired,
      message: PropTypes.string,
      likes_count: PropTypes.number,
    })
  ),
};

export default Board;
