import './Board.css';
import PropTypes from 'prop-types';
import React from 'react';
import CardList from './CardList';

const Board = ({ id, title, owner, cards, onDeleteCard }) => {
  return (
    <div>
      {title}
      <ol>{<CardList cards={cards} />}</ol>
    </div>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  owner: PropTypes.string,
  // cards: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     card_id: PropTypes.number.isRequired,
  //     message: PropTypes.string,
  //     likes_count: PropTypes.number,
  // })
  // ),
};

export default Board;
