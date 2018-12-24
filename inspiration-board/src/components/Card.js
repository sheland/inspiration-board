import React from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

const InspirationCard = (props) => {
  return (
    <div className="card">
      <section className="card__content">
        <p className="card__content-text">{props.cardText}</p>

        {props.cardEmoji && (
          <p className="card__content-emoji">
            {emoji.getUnicode(props.cardEmoji)}
          </p>)}

          <button
            onClick={() => props.deleteCardCallback(props.cardId)}
            type="button"
            className="card__delete"
            > Delete </button>
          </section>
        </div>
      )
    }


    InspirationCard.propTypes = {
      cardText: PropTypes.string.isRequired,
    };

    export default InspirationCard;
