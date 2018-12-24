import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

class NewCardForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardText: '',
      cardEmoji: '',
    };
  }

  resetState = () => {
    this.setState({

      cardText: '',
      cardEmoji: '',

    });
  }

  onFormChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;


    const updatedState = {};
    updatedState[field] = value;
    this.setState(updatedState);
  }

  onSubmit = (event) => {
    console.log(event)
    event.preventDefault();
    const { cardText, cardEmoji } = this.state;

    if (cardText === '' && cardEmoji === '') return;

    console.log(event);
    this.props.addCardCallback(this.state);
    this.resetState();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} name="new-card-form" id="new-card-form" className="new-card-form">
        <h3 className="new-card-form__header">Add a New Card</h3>

        <div>
          <label className="new-card-form__form-label" htmlFor="cardText">Text</label>
          <input className="new-card-form__form-textarea" name="cardText" placeholder="Inspire!" onChange={this.onFormChange} value={this.state.cardText}/>
        </div>

        <div>
          <label className="new-card-form__form-label">Select Emoji:</label>
          <select
            className="new-card-form__form-select"
            name="cardEmoji"
            onChange={this.onFormChange}
            value={this.state.cardEmoji}
            >

            {EMOJI_LIST.map((emojiText, index) => {
              return <option
                key={index}
                value={`${emojiText}`}>{emoji.getUnicode(emojiText)}</option>
            })}
          </select>
        </div>

        <input className="btn btn-success new-card-form__form-button" type="submit" name="submit" value="Add Card" />
      </form>
    );
  }


}

NewCardForm.propTypes = {
  addCardCallback: PropTypes.func.isRequired,
};

export default NewCardForm;
