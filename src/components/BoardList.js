import PropTypes from 'prop-types';
import React from 'react';
import Board from './Board';

const BoardList = ({ boards, onSelectBoard }) => {
  const boardComponents = boards.map((board, index) => {
    return (
      <div key={index}>
        <div onClick={() => onSelectBoard(board.id)}>{board.title}</div>
        {/* <Board
          id={board.id}
          title={board.title}
          owner={board.owner}
          cards={[]}
        /> */}
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
          setLikesCount: PropTypes.func,
          onDeleteCard: PropTypes.func.isRequired
        })
      ),
    })
  ).isRequired,
  onGetBoardList: PropTypes.func.isRequired,
  onSelectBoard: PropTypes.func,
};

export default BoardList;
