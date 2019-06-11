import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'

import CenterLayout from './components/CenterLayout/CenterLayout';
import SummaryLayout from './components/SummaryLayout/SummaryLayout';
import PointsLayout from './components/PointsLayout/PointsLayout';

class App extends Component {
    constructor (props) {
      super(props)
      
      this.state = {
        guessedTemp : 0,
        actualTemp : 0,
        correct : 0,
        incorrect : 0,
        cities : ["delhi", "mumbai", "tijuana", "lisbon", "london"],
        currentCityCount : 0,
        summary : []        
      }
    }
    

    getActualTemp = () =>{
      let cityName = this.state.cities[this.state.currentCityCount];
      let apiKey = "bac2c461b67054a953ca4dab10dd11c1";
      let unit = "metric";
      let weatherReqUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&units=" + unit + "&APPID=" + apiKey;
      axios.get(weatherReqUrl)
        .then(response => {
          const actualTemp = response.data.main.temp
          alert(actualTemp)          
        })        
    }

    guessedTempClick = () => {    
      this.getActualTemp()   
      this.setState({
        currentCityCount : this.state.currentCityCount + 1
      })
    }

    guessedTemp = (e) => {
      alert(this.state.currentCity)
      this.setState({
        "guessedTemp" : e.target.value
      })
    }

    render() {
        return ( 
            <div className = "App" >
              <SummaryLayout></SummaryLayout>
              <CenterLayout correct = {this.state.correct} cityCount = {this.state.currentCityCount} cityName = {this.state.cities[this.state.currentCityCount]} 
               guessTempVal={this.guessedTemp} guessClick={this.guessedTempClick}></CenterLayout>  
              <PointsLayout correct = {this.state.correct} incorrect = {this.state.incorrect}></PointsLayout>
            </div>
        );
    }
}

export default App;