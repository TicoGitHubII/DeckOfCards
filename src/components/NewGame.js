import React, { Fragment } from "react";

class NewGame extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="jumbotron text-center">
            <h1 className="display-4">Concentrate</h1>
            <p className="lead">Lets Play Concentration!</p>
            <hr className="my-4" />
            <button
              className="btn btn-primary btn-lg"
              onClick={this.props.startGame}
              role="button"
            >
              New Game
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default NewGame;
