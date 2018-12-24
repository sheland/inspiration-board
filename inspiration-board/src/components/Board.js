import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };

    this.mainBoard = props.boardName;
  }
  //displays list of cards
  makeCards(){

    return this.state.cards.map((card, index) => {
        return <Card
          key={index}
          cardText={card.cardText}
          cardEmoji={card.cardEmoji}
          cardId={card.cardId}
          deleteCardCallback= {this.deleteCard}
          />
      })
  }

  //componentDidMount is executed after the first render
  //retrieve card data from my board from api
  //url=https://inspiration-board.herokuapp.com/boards/shelan/cards
  componentDidMount(){

    // Make a check to see if my board exists.. if not create board

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
      console.log("ERROR")
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
    const {url,boardName} = this.props;
    axios.post(url + boardName +'/cards', apiPayload)
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
// AdaGold/inspiration-board-api git hub page shows you how to use the api
};

export default Board;
