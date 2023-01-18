import '../App.css';
import PropTypes from 'prop-types';
import React from 'react';

const Card = (props) => {
  return (
    <div className='card-item'>
      <p className='card-message'>{props.message}</p>
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
