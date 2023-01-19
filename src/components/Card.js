import '../App.css';
import PropTypes from 'prop-types';
import { React, useState } from 'react';

const Card = (props) => {
  const [cardsColor, setCardsColor] = useState('lightseagreen');

  const changeCardColor = (event) => {
    const newColor = event.target.value;
    setCardsColor(newColor);
    console.log(newColor);
  };

  return (
    <div className='card-item' id={cardsColor}>
      <p className='card-message'>{props.message}</p>
      <li>
        <label>Change the card color: </label>
        <select id='card-color-selection' onChange={changeCardColor}>
          <option value='lightseagreen'>Teal</option>
          <option value='pink'>Pink</option>
          <option value='red'>Red</option>
          <option value='orange'>Orange</option>
          <option value='yellow'>Yellow</option>
          <option value='green'>Green</option>
          <option value='blue'>Blue</option>
          <option value='lavender'>Purple</option>
          <option value='grey'>Slate Grey</option>
        </select>
      </li>
      <li>
        <p className='card-total-likes'>{props.likes_count} 💕</p>
      </li>
      <li>
        <button
          className='card-like-button'
          onClick={() => props.onIncreaseLikes(props.id)}
        >
          +1
        </button>
      </li>
      <li>
        <button
          className='card-delete-button'
          onClick={() => props.onDeleteCard(props.id)}
        >
          Delete
        </button>
      </li>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string,
  likes_count: PropTypes.number,
  setLikesCount: PropTypes.func,
  onDeleteCard: PropTypes.func,
  onIncreaseLikes: PropTypes.func,
};

export default Card;
