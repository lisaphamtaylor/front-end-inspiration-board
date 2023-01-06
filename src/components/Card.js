import '../App.css';
import PropTypes from 'prop-types';
import React from 'react';

const Card = ({ message, likes_count }) => {
  return (
    <div className='card-item'>
      <p className='card-message'>{message}</p>
      <ul className='card-controls'>
        <li>
          <p className='card-total-likes'>{likes_count} 💕</p>
        </li>
        <li>
          <button className='card-like-button'>+1</button>
        </li>
        <li>
          <button className='card-delete-button'>Delete</button>
        </li>
      </ul>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string,
  likes_count: PropTypes.number,
};

export default Card;
