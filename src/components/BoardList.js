import PropTypes from 'prop-types';
import React from 'react';

const BoardList = (props) => {
  const boardComponents = props.boards.map((board, index) => {
    return (
      <div key={index}>
        <div onClick={() => props.onSelectBoard(board.id)}>{board.title}</div>
      </div>
    );
  });

  return <div>{boardComponents}</div>;
};

BoardList.propTypes = {
  boards: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  onGetBoardList: PropTypes.func.isRequired,
  onSelectBoard: PropTypes.func,
};

export default BoardList;
