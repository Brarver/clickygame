import React from "react";
import "./style.css";

function CharacterCard(props) {
  return (
    <div className="card" onClick={() => props.handleClick(props.id)}>
      <div className={`img-container ${props.lost ? " lostflash" : ""}${props.won ? " wonflash" : ""}`}>
        <img alt={props.name} src={props.image} />
        
      </div>

    </div>
  );
}

export default CharacterCard;


