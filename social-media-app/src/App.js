// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Hello World
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import {ParentComponent} from "./pages/Component";
import Counter from "./pages/Counter";
import Appy from "./pages/Context";
import Component from "./pages/useMemo";
import Form from "./pages/HForm";


function App() {
  return (
    <Routes>
      <Route path="/home/" element={<Home />} />
      <Route path="/" element={<ParentComponent />} />
      <Route path="/counter/" element={<Counter />} />
      <Route path="/appy/" element={<Appy />} />
      <Route path="/usememo/" element={<Component />} />
      <Route path="/form/" element={<Form />} />
    </Routes>
  );
}

export default App;