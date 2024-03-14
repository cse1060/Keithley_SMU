import './App.css';
import { Link } from 'react-router-dom';
import Get_devices from './components/Get_devices';

function App() {

  const ipcRenderer = window.ipcRenderer;

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p>The home directory is at </p>
      <Link to="/signup" >Signup</ Link>
      <Get_devices />
      <button onClick={() => {
        ipcRenderer.send('change_size', { height: 500, width: 500 })
      }}>
        Change Size</button>
    </div>
  );
}

export default App;
