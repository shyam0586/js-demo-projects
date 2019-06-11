import React from 'react';

function PointsLayout(props) {    
  return (
    <div className="col-lg-3 pointsLayout">
      <table>
          <tbody>
          <tr><th>Correct</th><th>Incorrect</th></tr>
          <tr><td>{props.correct}</td><td>{props.incorrect}</td></tr>
          </tbody>
      </table>
    </div>
  );
}

export default PointsLayout;

