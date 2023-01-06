import './App.css';
import { React, useEffect, useState } from 'react';
import BoardList from './components/BoardList';
import Board from './components/Board';
import axios from 'axios';

function App() {
  const [boardListData, setBoardListData] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState({
    title: '',
    owner: '',
    board_id: null,
  });
  const URL = 'https://llammmas-inspo-board-back-end.herokuapp.com';

  const boardInfoFromJson = (board) => {
    const { id, title, owner } = board;
    return { id, title, owner };
  };

  const getBoardList = () => {
    return axios
      .get(`${URL}/boards`)
      .then((response) => {
        const newBoardList = response.data.map(boardInfoFromJson);
        return newBoardList;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshBoards = () => {
    return getBoardList()
      .then((boards) => {
        setBoardListData(boards);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    refreshBoards();
  }, []);

  const getBoard = (id) => {
    axios
      .get(`${URL}/boards/${id}`)
      .then((response) => {
        const board = response.data;
        setSelectedBoard(board);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id='App'>
      <header className='App-header'>INSPIRATION BOARD</header>
      <main>
        <div className='board-container'>
          <section className='grid-item' id='boards'>
            <h2>BOARDS</h2>

            <BoardList
              boards={boardListData}
              onGetBoardList={getBoardList}
              onSelectBoard={getBoard}
            />
            {/* <Board id={} */}
          </section>
          <section className='grid-item' id='selected-board'>
            <h2>SELECTED BOARD</h2>
            <p>
              {selectedBoard.id
                ? `${selectedBoard.title} - ${selectedBoard.owner}`
                : 'Select a Board from the Board List!'}
            </p>
          </section>
          <section className='grid-item' id='new-board'>
            <h2>CREATE A NEW BOARD</h2>
            <form>
              <label>Title</label>
              <input type='text' />
              <br />
              <label>Owner's Name</label>
              <input type='text' />
              <p>Preview: Title - Owner's Name</p>
              <input type='Submit'></input>
            </form>
            <button className='toggle-new-board-form'>
              Hide New Board Form
            </button>
          </section>
        </div>
        <div className='card-container'>
          <section className='grid-item' id='board-display'>
            <h2>CARDS FOR BOARD TITLE</h2>
            {/* <Board board_id={boardData.board_id} /> */}
          </section>
          <section className='grid-item' id='new-card'>
            <h2>CREATE A NEW CARD</h2>
            <form>
              <label>Message</label>
              <input type='text' />
              <p>Preview: Message</p>
              <input type='Submit'></input>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
