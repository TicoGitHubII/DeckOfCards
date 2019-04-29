import React from "react";
import * as cardServices from "../services/cardServices";
const cardBack = require("../img/226pxintrinsic_Card_back.png");

export default function CardDeck(props) {
  if (props.facedown) {
    return (
      <div onClick={props.cardSelect}>
        <img src={cardBack} style={{ width: 100 }} />
      </div>
    );
  } else {
    return (
      <div onClick={event => this.props.cardSelect(event)}>
        <img src={props.img} style={{ width: 100 }} />
      </div>
    );
  }
}
