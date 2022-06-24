import React from "react";
import { ReactDOM } from "react/client";
import "./styles/style.css";

class Square extends React.Component {
  render() {
    return <button className="square">{/* TODO */}</button>;
  }
}

class Board extends React.Component {
  renderSquare(number) {
    <Square id={number} />;
  }
  render() {
    const status = "X";
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class GameBoard extends React.Component {
  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("contianer"));
root.render(<GameBoard />);
