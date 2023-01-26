import logo from './logo.svg';
import './App.css';
import React from 'react';


const OtherComponent = React.lazy(()=> import('./otherComponent'))

function App() {
  return (
    <div className="App">
      <OtherComponent />
    </div>
  );
}

export default App;
