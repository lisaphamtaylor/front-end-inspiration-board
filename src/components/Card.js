import '../App.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
// import URL from '../App.js'

const Card = ({ id, message, likes_count, onDeleteCard }) => {
  const [likesCount, setLikesCount] = useState(likes_count);
  const card_id = id;
  const URL = 'https://llammmas-inspo-board-back-end.herokuapp.com';

  const increaseLikes = () => {
    // console.log('hits increaseLikes');
    // console.log(card_id);

    axios
      .put(`${URL}/cards/${card_id}/like`, { likes_count: likesCount + 1 })
      .then((response) => {
        console.log(response.data);
        setLikesCount(likesCount + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const deleteCard = () => {
  //   axios
  //     .delete(`${URL}/cards/${card_id}`)
  //     .then((response) => {
  //       console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className='card-item'>
      <p className='card-message'>{message}</p>
      <li>
        <p className='card-total-likes'>{likes_count} 💕</p>
      </li>
      <li>
        <button className='card-like-button' onClick={increaseLikes}>
          +1
        </button>
      </li>
      <li>
        <button className='card-delete-button' onClick={() => onDeleteCard(id)}>
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
};

export default Card;
