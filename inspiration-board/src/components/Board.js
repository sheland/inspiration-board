import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: []
    };
  }

  makeCards(){

    if (this.state.cards.length > 0) {
      console.log(this.state.cards)

      return this.state.cards.map((card, index) => {
        return <Card
          key={index}
          cardText={card.cardText}
          cardEmoji={card.cardEmoji}
          cardId={card.cardId}
          deleteCardCallback= {this.deleteCard}
          />
      })
    };
  }


  componentDidMount(){
    axios.get(this.props.url + this.props.boardName +'/cards')
    .then((response) => {
      console.log(response)
      const newCards = response.data.map((card, index) => {
        return {
          cardText: card.card.text,
          cardEmoji: card.card.emoji,
          cardId: card.card.id

        }
      });

      this.setState ({
        cards: newCards,
      })

    })
    .catch((error) => {
      console.log(error.message);
      console.log("this is the catch")
      this.setState({
        errorMessage: error.message,
      });

    });
  }

  addCard = (newCard) => {
    console.log("adding new card")
    const apiPayload = {
      ...newCard,
      text: newCard.cardText,
      emoji: newCard.cardEmoji,
    };
    console.log(apiPayload)

    axios.post(this.props.url + this.props.boardName +'/cards', apiPayload)
    .then( (response) => {

      const {card} = response.data;
      const myNewCard = {};
      myNewCard.cardText = card.text;
      myNewCard.cardEmoji = card.emoji;
      myNewCard.cardId = card.id



      const {cards} = this.state;

      cards.push(myNewCard);


      this.setState({
        cards,
        errorMessage: 'Card Added',
      });
    })

  }

  deleteCard = (cardId) => {
    console.log(cardId)
    axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardId}` )
    console.log(`https://inspiration-board.herokuapp.com/cards/${cardId}`)
    let deleteIndex = -1;
    const cards = [...this.state.cards];
    cards.forEach((card, index) => {
      if (cardId === card.cardId) {
        deleteIndex = index;
      }
    });

    cards.splice(deleteIndex, 1);

    this.setState({
      cards: cards
    })
  }
  render(){
    return (
      <main>
        <div className="board">
          {this.makeCards()}
        </div>


        <section>
          <NewCardForm addCardCallback={this.addCard} />
        </section>
      </main>
    )
  }

}


Board.propTypes = {
  cards: PropTypes.array,

};

export default Board;
