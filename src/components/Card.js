import '../App.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import URL from '../App.js'

const Card = ({ id, message, likes_count }) => {
  const [likesCount, setLikesCount] = useState(0);
  const card_id = id;

  const increaseLikes = () => {
    console.log("Inside increase likes!");
    console.log(card_id);
    // console.log(likesCount);
    // setLikesCount(likesCount +1);
    // console.log(likesCount);
    axios
      .put(`${URL}/cards/${card_id}/like`, {likes_count : likesCount})
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className='card-item'>
      <p className='card-message'>{message}</p>
      <li>
        <p className='card-total-likes'>{likes_count} 💕</p>
      </li>
      <li>
        <button className='card-like-button'>+1</button>
      </li>
      <li>
        <button className='card-delete-button'>Delete</button>
      </li>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string,
  likes_count: PropTypes.number,
  setLikesCount: PropTypes.func
};

export default Card;
