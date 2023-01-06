import '../App.css';
import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';

const CardList = ({ cards }) => {
  //   const [cardsData, setCardsData] = useState([]);

  //   useEffect(() => {
  //     console.log(props);
  //     // return axios
  //     //   .get(`${URL}/boards/${props.board.id}/cards`)
  //     //   .then((response) => {
  //     //     console.log(response);
  //     //   })
  //     //   .catch((error) => {
  //     //     console.log(error);
  //     //   });
  //   }, [props.board]);
  //   //   console.log(cardsData);

  const cardComponents = cards.map((card, index) => {
    return (
      <div key={index}>
        <Card card_id={card.card_id} />
      </div>
    );
  });
  return <div>{cardComponents}</div>;
};

CardList.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      card_id: PropTypes.number.isRequired,
      message: PropTypes.string,
      likes_count: PropTypes.number,
    })
  ),
};

export default CardList;
