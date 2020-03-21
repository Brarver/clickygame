import React, { Component } from 'react';
import CharacterCard from "../CharacterCard";
import Wrapper from "../Wrapper";
import Frame from "../Frame";
import characters from "../../characters.json";


class Game extends Component {
  state = {
    characters,
    points: 0, 
    topScore: 0,
    message: 'Click an image to earn points. Don\'t click any image more than once!',
    lost: false,
    won: false
  }

 componentDidMount() {
  this.setState({ characters: this.shuffleCharacters(this.state.characters) });
 }

 shuffleCharacters = characters => {
   for (let i = characters.length -1; i > 0; i--) {    
     let j = Math.floor(Math.random() * (i + 1));       
     let temp = characters[i];                        
     characters[i] = characters[j];                   
     characters[j] = temp;
   }
   return characters;

 }

 reset = data => {
    const newData = data.map(character => ({ ...character, clicked: false }) );
    const newCharacters = this.shuffleCharacters(newData);
    return this.resetUI(newCharacters)
 }

 resetUI = newCharacters => {
   setTimeout(function () {
    this.setState({ won: false,
                    lost: false,
                    characters: newCharacters
                 })
   }.bind(this), 3000)
 }

 madeCorrectGuess = newData => {
    const { topScore, points } = this.state;
    const newScore = points + 1;
    var newTopScore
    var message = 'You guessed correctly!'
    if (newScore === 12) {
      this.setState({
        points: 0,
        topScore: 12,
        won: true,
        message: 'Click any image to restart!'
      });
      this.reset(newData)
      return
    
    }else if (topScore > newScore) {
      newTopScore = topScore
    } else if (newScore > topScore) {
      newTopScore = newScore
    } else {
      newTopScore = topScore
    }

    this.setState({
      characters: this.shuffleCharacters(newData),
      points: newScore,
      topScore: newTopScore,
      message: message
    });
 }

 madeIncorrectGuess = newData => {
  this.setState({
    points: 0,
    message: 'You lost! Click any image to restart.',
    lost: true
  })

  this.reset(newData)
  
 }

 handleClick = id => {
   let correct = false;
   const newData = this.state.characters.map(character => {
     const newCharacter = { ...character };
     if (newCharacter.id === id) {
       if (!newCharacter.clicked) {
        correct = true;
        newCharacter.clicked = true;
       }
     }
     return newCharacter
   })
   correct ? this.madeCorrectGuess(newData) : this.madeIncorrectGuess(newData)
 }

  render() {
    return (
      <Frame 
        points={this.state.points}
        topScore={this.state.topScore}
        message={this.state.message}
        won={this.state.won}
        lost={this.state.lost}
        >
      <Wrapper>
      {this.state.characters.map(character => (
        <CharacterCard
          id={character.id}
          key={character.id}
          clicked={character.clicked}
          lost={this.state.lost}
          won={this.state.won}
          image={character.image}
          handleClick={this.handleClick}

        />
      ))}
      </Wrapper>
      </Frame>
    )
  }
}

export default Game;