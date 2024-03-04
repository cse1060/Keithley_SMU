// App.js
 import Home from './components/Home/Home';
// import LoginForm from './components/LoginForm/LoginForm';
// import RegisterForm from './components/RegisterForm/RegisterForm';
import Landing from './components/LandingPage/Landing';
import React, { Routes,Route} from 'react-router-dom'
import Error from './components/Error/Error';
import { NavLink } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
function App() {
  
  return (
   <>
   <BrowserRouter>
<Routes>
<Route path="/" element={<Landing/>}/>
<Route path="/Header" element={<Header/>}/>
{/* <Route path="/LoginForm" element={<LoginForm/>}/> */}

<Route path="/home" element={<Home/>}/>

{/* <Route path="*" element={<Error/>}/> */}
    </Routes>
    </BrowserRouter>
    </>
   );
 }
export default App;