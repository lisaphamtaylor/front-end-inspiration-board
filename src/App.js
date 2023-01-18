import './App.css';
import { React, useEffect, useState } from 'react';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import axios from 'axios';
import NewCardForm from './components/NewCardForm';
import NewBoardForm from './components/NewBoardForm';

function App() {
  const URL = 'https://llammmas-inspo-board-back-end.herokuapp.com';

  const [boardListData, setBoardListData] = useState([]);
  const [cardsData, setCardsData] = useState([]);

  const [selectedBoard, setSelectedBoard] = useState({
    title: '',
    owner: '',
    board_id: null,
  });

  const [boardFormVisible, setBoardFormVisible] = useState(true);
  const hideBoardForm = () => {
    setBoardFormVisible(!boardFormVisible);
  };

  const [cardContainerInvisible, setCardContainerVisible] = useState(false);
  const showCardContainer = () => {
    setCardContainerVisible(true);
  };

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
        console.log('Error:', error);
        alert("Couldn't get boards list.");
      });
  };

  const refreshBoards = () => {
    return getBoardList()
      .then((boards) => {
        setBoardListData(boards);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert("Couldn't refresh boards list.");
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
        showCardContainer();
        axios
          .get(`${URL}/boards/${id}/cards`)
          .then((response) => {
            const cardsArray = response.data;
            setCardsData(cardsArray);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log('Error:', error);
        alert("Couldn't get selected board.");
      });
  };

  const addNewBoard = (newBoard) => {
    axios
      .post(`${URL}/boards`, newBoard)
      .then((response) => {
        const newBoardList = [...boardListData];
        newBoardList.push({
          id: response.data.id,
          title: response.data.title,
          owner: response.data.owner,
        });
        setBoardListData(newBoardList);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert("Couldn't add new board");
      });
  };

  const addCardData = (newCard) => {
    axios
      .post(`${URL}/boards/${selectedBoard.id}/cards`, newCard)
      .then((response) => {
        const newCardList = [...cardsData];
        newCardList.push({
          id: response.data.id,
          message: response.data.message,
          likes_count: response.data.likes_count,
        });
        setCardsData(newCardList);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert("Couldn't add new card.");
      });
  };

  const increaseLikes = (card_id) => {
    let selectedCard = null;
    for (const card of cardsData) {
      if (card_id === card.id) {
        selectedCard = card;
      }
    }

    axios
      .put(`${URL}/cards/${card_id}/like`, {
        likes_count: selectedCard.likes_count + 1,
      })
      .then((response) => {
        const updatedCard = response.data;
        const newCardList = [...cardsData];

        for (let card of newCardList) {
          if (card_id === card.id) {
            card.likes_count = updatedCard.likes_count;
          }
        }

        setCardsData(newCardList);
      })
      .catch((error) => {
        console.log('Error:', error);
        alert("Couldn't increase card likes.");
      });
  };

  const deleteCard = (card_id) => {
    axios
      .delete(`${URL}/cards/${card_id}`)
      .then((response) => {
        setCardsData((oldCard) => {
          return oldCard.filter((card) => card.id !== card_id);
        });
      })
      .catch((error) => {
        console.log('Error:', error);
        alert("Couldn't delete card.");
      });
  };

  return (
    <div id='App'>
      <header className='App-header'>
        <img alt='cartoon of llama' src={require('./images/happy-llama.png')} />
        <img alt='cartoon of llama' src={require('./images/happy-llama.png')} />
        LLAMMMAS' INSPIRATION BOARD
        <img
          alt='cartoon of llama'
          src={require('./images/happy-llama.png')}
          className='flipped-llama'
        />
        <img
          alt='cartoon image of llama'
          src={require('./images/happy-llama.png')}
          className='flipped-llama'
        />
      </header>

      <main>
        <div className='board-container'>
          <section className='grid-item' id='boards'>
            <h2>BOARDS</h2>
            <div id='boards-scroll-list'>
              <BoardList
                boards={boardListData}
                onGetBoardList={getBoardList}
                onSelectBoard={getBoard}
              />
            </div>
          </section>

          <section className='grid-item' id='selected-board'>
            <h2>SELECTED BOARD</h2>
            <div>
              <h3>
                {selectedBoard.id
                  ? `${selectedBoard.title} - ${selectedBoard.owner}`
                  : 'Select a Board from the Board List!'}
              </h3>
              <br />
            </div>
          </section>
          <section className='grid-item' id='new-board'>
            <h2>CREATE A NEW BOARD</h2>
            <br />
            <div>
              {boardFormVisible ? (
                <NewBoardForm addFormCallback={addNewBoard}></NewBoardForm>
              ) : (
                ''
              )}
              <button className='toggle-new-board-form' onClick={hideBoardForm}>
                {boardFormVisible ? 'Hide Form' : 'Show Form'}
              </button>
            </div>
          </section>
        </div>

        <div>
          {cardContainerInvisible ? (
            <div className='card-container'>
              <section className='grid-item'>
                <h2>
                  CARDS FOR{' '}
                  {selectedBoard.id
                    ? `${selectedBoard.title.toUpperCase()}`
                    : ''}
                </h2>
                <div>
                  {selectedBoard.id ? (
                    <CardList
                      cards={cardsData}
                      onIncreaseLikes={increaseLikes}
                      onDeleteCard={deleteCard}
                    ></CardList>
                  ) : (
                    ''
                  )}
                </div>
              </section>

              <section className='grid-item' id='new-card'>
                <h2>CREATE A NEW CARD</h2>
                <NewCardForm addCardCallback={addCardData}></NewCardForm>
              </section>
            </div>
          ) : (
            ''
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
