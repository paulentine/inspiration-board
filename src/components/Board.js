import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

const CARD_API_URL = 'https://inspiration-board.herokuapp.com/boards/Pauline/cards'
class Board extends Component {
  constructor() {
    super();

    this.state = {
      cardList: [],
      currentCard: undefined,
    };
  }

  componentDidMount() {
    axios.get(CARD_API_URL)
    .then((response) => {
      console.log(response.data);

      const cardList = response.data.map((card) => {
        const newCard = {
          id: card.card.id,
          text: card.card.text,
          emoji: card.card.emoji
        }
        return newCard;
      })
  
      console.log(cardList);
  
      this.setState({ cardList });
    })
    .catch((error) => {
      this.setState({ error: error.message })
    })
  }

  onDeleteCard = (cardID) => {
    const newCardList = this.state.cardList.filter(card => card.id !== cardID);

    this.setState({ cardList: newCardList })
  }

  addCardCallback = (card) => {
    const cardIDs = this.state.cardList.map(card => card.id)

    axios.post(CARD_API_URL, card)
    .then((response) => {
      console.log(response)
      card.id = response.data.id;
      console.log(card);

      const newCards = this.state.cardList;
      newCards.push(card);
      this.setState({ cardList: newCards })
    })
    .catch((error) => {
      this.setState({ error: error.message })
    })

  }
  
  render() {
    const displayCards = this.state.cardList.map((card, i) => {
      return <Card 
                key={i}
                id={card.id}
                text={card.text}
                emoji={card.emoji}
                onDeleteCard={this.onDeleteCard}
              />
    })

    return (
      <div>
        <NewCardForm addCardCallback={this.addCardCallback} />
        { displayCards }
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string,
  boardName: PropTypes.string
};

export default Board;
