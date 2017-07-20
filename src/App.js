import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      backgroundColor: '#000000',
      color: '#FFFFFF'
    };
    document.body.style.backgroundColor = '#000';
  }
  
  hashCode(str) {
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  
  colorCode(hash) {
    var c = (hash & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();
    return '#' + ('00000'.substring(0, 6 - c.length) + c);
  }
  
  handleChange = (event) => {
    var hash = this.hashCode(event.target.value);
    var colorCode = this.colorCode(hash);
    var red = (hash >> 16) & 0xFF;
    var green = (hash >> 8) & 0xFF;
    var blue = hash & 0xFF;
    this.setState({
      text: event.target.value,
      backgroundColor: colorCode,
      color: (red*0.299 + green*0.587 + blue*0.114) > 186 ? '#000000' : '#FFFFFF'
    });
    document.body.style.backgroundColor = colorCode;
  }
  
  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.text} onChange={this.handleChange} />
        <p style={{color: this.state.color}}>{this.state.backgroundColor}</p>
      </div>
    );
  }
}

export default App;
