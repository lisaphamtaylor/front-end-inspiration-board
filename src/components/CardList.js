import '../App.css';
import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

const CardList = ({ cards }) => {
    const cardComponents = cards.map((card, index) => {
        return (
            <div key={index}>
            <Card
                id={card.id} 
            />
            </div>
        );
    });
    return <div>{cardComponents}</div>

};

CardList.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            card_id: PropTypes.number.isRequired,
            message: PropTypes.string,
            likes_count: PropTypes.number,
        })
    )
};

export default CardList;