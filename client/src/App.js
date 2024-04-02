import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header/Header';
import Op from './components/Output/Op';
import Graph from './components/Graph/graph';
import Home from './components/Home/Home';
import { Context } from "./context.js";
import { useState } from 'react';

function App() {

  const [user, setUser] = useState("");
  return (
    <Context.Provider value={[user, setUser]}>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/home" element={<Landing />} /> */}
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/Header" element={<Header />} />
          <Route path="/output" element={<Op />} />
          <Route path="/graph" element={<Graph />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}
export default App;