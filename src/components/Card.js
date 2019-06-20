import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {


  render() {

    const displayText = (this.props.text) ? this.props.text : ""

    const displayEmoji = (this.props.emoji) ? emoji.getUnicode(this.props.emoji) : ""


    return (
      <div className="card">
        #{ this.props.id }: { displayText } { displayEmoji }
      </div>
    )
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  emoji: PropTypes.string
};

export default Card;
