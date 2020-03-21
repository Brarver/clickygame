import React from "react";
import "./style.css";

function Frame(props) {
  return (
    <div className="main">
      <div className="header">
        <div className="title">Clicky Game</div>
      </div>
      <div className={`board ${((props.lost || props.won) ? " boardpadding" : "")}`}>
        <div className={`status ${props.won ? " showwin" : ""}`}>YOU WIN!</div>
        <div className={`status ${props.lost ? " showlost" : ""}`}>YOU LOST!</div>
        <div className={`message ${props.won || props.lost ? " hide" : ""}`}>{props.message}</div>
        <div className={`score ${props.won || props.lost ? " hide" : ""}`}>Score: {props.points} | Top Score: {props.topScore}</div>
      </div>
      
      <div className="frame">{props.children}</div>;
    </div>
    
  )
}

export default Frame;