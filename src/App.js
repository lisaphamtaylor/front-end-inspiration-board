import './App.css';
import { React, useEffect, useState } from 'react';
import BoardList from './components/BoardList';
import CardList from './components/CardList';
import Card from './components/Card';
import Board from './components/Board';
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
  const [selectedCard, setSelectedCard] = useState({
    id: null,
    message: '',
    likes_count: 0,
  });

  // const [likesCount, setLikesCount] = useState(likes_count);

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
  // useEffect(() => {
  //   refreshBoards();
  // }, [cardsData]);

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
        console.log(error);
      });
  };

  const addCardData = (newCard) => {
    axios
      .post(`${URL}/boards/${selectedBoard.id}/cards`, newCard)
      .then((response) => {
        console.log(response.data);
        const newCardList = [...cardsData];
        newCardList.push({
          id: response.data.id,
          message: response.data.message,
          likes_count: response.data.likes_count,
        });
        setCardsData(newCardList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const increaseLikes = (card_id) => {
    //loop over cardsData,
    //if id===card_id
    //selectedCard variable to call likes_count
    //in .then response, duplicate cardData find position of selectedCard and update
    let selectedCard = null;
    for (const card of cardsData) {
      if (card_id === card.id) {
        selectedCard = card;
        console.log(
          `card id ${selectedCard.id}. likesCount before put ${selectedCard.likes_count}`
        );
        // const newLikesCount = selectedCard.likes_count + 1;
      }
    }

    axios
      .put(`${URL}/cards/${card_id}/like`, {
        likes_count: selectedCard.likes_count + 1,
      })
      .then((response) => {
        console.log(`after put:`);
        console.log(response.data);
        const updatedCard = response.data;
        const newCardList = [...cardsData];

        for (let card of newCardList) {
          if (card_id === card.id) {
            card.likes_count = updatedCard.likes_count;
          }
        }

        console.log(newCardList);
        setCardsData(newCardList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete function, look into filter() function

  const addNewBoard = (newBoard) => {
    axios
      .post(`${URL}/boards`, newBoard)
      .then((response) => {
        console.log(response.data);
        console.log(boardListData);
        const newBoardList = [...boardListData];
        newBoardList.push({
          id: response.data.id,
          title: response.data.title,
          owner: response.data.owner,
        });
        setBoardListData(newBoardList);
      })
      .catch((error) => {
        console.log(error);
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
            <p>
              {selectedBoard.id
                ? `${selectedBoard.title} - ${selectedBoard.owner}`
                : 'Select a Board from the Board List!'}
            </p>
          </section>
          <section className='grid-item' id='new-board'>
            <h2>CREATE A NEW BOARD</h2>
            {boardFormVisible ? (
              <NewBoardForm addFormCallback={addNewBoard}></NewBoardForm>
            ) : (
              ''
            )}
            <button className='toggle-new-board-form' onClick={hideBoardForm}>
              {boardFormVisible ? 'Hide Form' : 'Show Form'}
            </button>
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
                {selectedBoard.id ? (
                  <CardList
                    cards={cardsData}
                    onIncreaseLikes={increaseLikes}
                  ></CardList>
                ) : (
                  ''
                )}

                {/* <Card onIncreaseLikes={increaseLikes}></Card> */}
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
