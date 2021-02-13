import React from "react";
import HeroImage from "./assets/fb-coverphoto.jpg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={HeroImage} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
