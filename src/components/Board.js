import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cardList: [],
    };
  }

  componentDidMount() {
    const cardList = CARD_DATA["cards"].map((card) => {
      const newCard = {
        text: card.text,
        emoji: card.emoji || card.Emoji
      }
      return newCard;
    })

    console.log(cardList);

    this.setState({ cardList })
  }

  
  render() {
    const displayCards = this.state.cardList.map((card) => {
      return <Card text={card.text} emoji={card.emoji} />
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
