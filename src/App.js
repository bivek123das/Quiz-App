import React from 'react';

import './App.css';
import Quiz from './components /Quiz';

const App = () => {
    return (
        <div>
        <nav className="navbar bg-dark">
         <div className="container-fluid p-3">
           <span className="navbar-brand mb-0 m-auto h1 text-white fs-1 fw-bold helo">Online Quiz App</span>
         </div>
       </nav> 
      <main>
          <Quiz/> 
      </main>
   
   </div>
    );
};

export default App;

