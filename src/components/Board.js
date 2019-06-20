import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

const GET_CARDS_URL = 'https://inspiration-board.herokuapp.com/boards/Ada-Lovelace/cards'
class Board extends Component {
  constructor() {
    super();

    this.state = {
      cardList: [],
      currentCard: undefined,
    };
  }

  componentDidMount() {
    axios.get(GET_CARDS_URL)
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
