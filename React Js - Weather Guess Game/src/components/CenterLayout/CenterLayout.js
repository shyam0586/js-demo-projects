import React from 'react';

function CenterLayout(props) {
  if(props.cityCount === 5){
    return <div>GAME OVER!! You have answered {props.correct} questions correctly!</div>
  }else{
    return (
      <div className="col-lg-3 centerLayout">
        <p>Guess the temperature for the {props.cityName}</p>
        <input type = "text" onChange = {props.guessTempVal}></input>
        <button onClick = {props.guessClick}>Guess</button>
      </div>
    );
  }
}

export default CenterLayout;

