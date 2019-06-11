import React from 'react';

function SummaryLayout({ guesses }) {
  return (
    <div className="col-lg-3 summaryLayout">
      <table>
          <tbody>
          <tr><th>City</th><th>Real</th><th>Yours</th></tr>          
          </tbody>
      </table>
    </div>
  );
}

export default SummaryLayout;

