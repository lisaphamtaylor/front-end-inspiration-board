import './Board.css';
import PropTypes from 'prop-types';
import React from 'react';
import CardList from './CardList';

const Board = (props) => {
  return (
    <div>
      {props.title}
      <ol>{<CardList cards={props.cards} />}</ol>
    </div>
  );
};

Board.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  owner: PropTypes.string,
};

export default Board;
