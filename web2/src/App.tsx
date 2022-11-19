import React from 'react';
import {routes} from './routes'
import {useRoutes} from 'react-router-dom'
import './App.css'
const App =()=> {
  const element=useRoutes(routes)
  return (
    <div className="App">
      {element}
    </div>
  );
}

export default App;
