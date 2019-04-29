import React, { Component, Fragment } from "react";
import NewGame from "./components/NewGame";
import * as cardServices from "./services/cardServices";
import "./App.css";
import CardDeck from "./components/CardDeck";
import ReactCardFlip from "react-card-flip";
import { thisTypeAnnotation } from "@babel/types";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      launch: false,
      cardArray: [],
      deckId: "",
      isSelected: false,
      initIndex: null,
      initValue: null,
      nextSelect: null
    };
  }
  toggleHidden = () => {
    this.setState({
      isHidden: !this.state.isHidden,
      launch: !this.state.launch
    });
  };

  handleGameStart = event => {
    this.toggleHidden();

    cardServices
      .getDrawCards(this.state.deckId)
      .then(response => this.cardSetup(response))
      .catch(error => console.log("error on load" + error));
  };
  handleCardSelect = (event, index) => {
    console.log(event);
    if (event === this.state.initIndex) {
      return;
    }
    //let index = event;
    let lastIndex = this.state.initIndex;
    let tempArr = [...this.state.cardArray];
    let card = { ...tempArr[index] };

    if (this.state.initValue === card.value) {
      card.facedown = false;
      tempArr[index] = card;
      this.setState({
        cardArray: tempArr
      });
      setTimeout(this.isMatched, 500, index, lastIndex, tempArr);
    } else if (
      this.state.initValue !== null &&
      this.state.initValue !== card.value
    ) {
      card.facedown = false;
      tempArr[index] = card;
      this.setState({ cardArray: tempArr });
      setTimeout(this.isNotMatched, 500, index, lastIndex, tempArr);
    } else {
      card.facedown = false;
      tempArr[index] = card;
      this.setState({
        initValue: card.value,
        initIndex: lastIndex,
        cardArray: tempArr
      });
    }
  };

  isMatched = (index, lastIndex, arr) => {
    let tmpCard1 = { ...arr[index] };
    let tmpInit = { ...arr[lastIndex] };

    tmpCard1.matched = true;

    if (lastIndex != null) {
      tmpInit.matched = true;
      arr[lastIndex] = tmpInit;
    }
    this.setState({
      initValue: null,
      initIndex: null,
      cardArray: arr
    });
  };

  isNotMatched = (indexCur, lastIndex, arr) => {
    let tmpCard1 = { ...arr[indexCur] };
    let tmpInit = { ...arr[lastIndex] };

    tmpCard1.matched = false;
    tmpCard1.facedown = true;
    arr[indexCur] = tmpCard1;

    if (lastIndex != null) {
      tmpInit.matched = false;
      tmpInit.facedown = false;
      arr[lastIndex] = tmpInit;
    }
    this.setState({
      initValue: null,
      initIndex: null,
      cardArray: arr
    });
  };

  componentDidMount = () => {
    cardServices
      .getShuffleCards()
      .then(this.onSuccess)
      .catch(error => console.log("error on load" + error));
  };

  onSuccess = response => {
    this.setState({
      deckId: response.data.deck_id
    });

    console.log(response, "Success");
  };

  cardSetup = response => {
    let mergeCardSideArr = [...response.data.cards];
    mergeCardSideArr.forEach(element => {
      element.matched = false;
      element.facedown = true;
    });

    this.setState({
      cardArray: mergeCardSideArr
    });
  };

  render() {
    var cardDisplay = null;
    const isGameStarted = this.state.launch;

    if (!isGameStarted) {
      return (
        <div className="App">
          {" "}
          <NewGame startGame={this.handleGameStart} />
        </div>
      );
    }
    if (isGameStarted) {
      cardDisplay = this.state.cardArray.map((item, index) => {
        return (
          <CardDeck
            key={index}
            drawCards={this.state.cardArray}
            selected={this.isSelected}
            img={item.image}
            matched={item.matched}
            facedown={item.facedown}
            cardSelect={event => this.handleCardSelect(event, index)}
          />
        );
        {
          console.log(this.props);
        }
      });
    }
    return <div>{cardDisplay}</div>;
  }
}
export default App;
