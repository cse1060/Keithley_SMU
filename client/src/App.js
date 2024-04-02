import { Link, useNavigate } from 'react-router-dom';
import Get_devices from './components/Get_devices';
import verify_user from './middleware/verify_user';
import { useEffect } from 'react';

function App() {

  const ipcRenderer = window.ipcRenderer;

  const navigate = useNavigate();

  async function verify_token() {
    const res = await verify_user();
    console.log(res);
    if (res === 0) navigate("/login")
  }

  useEffect(() => {
    verify_token()
  }, [])

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p>The home directory is at </p>
      <Link to="/login" >Log in</ Link>
      <Get_devices />
      <button onClick={() => {
        ipcRenderer.send('change_size', { height: 500, width: 500 })
      }}>
        Change Size</button>
    </div>
  );
}

{/* <Route path="/home" element={<Home />} /> */ }

// {/* <Route path="*" element={<Error/>}/> */ }
//     </Routes >
//     </BrowserRouter >
//     </>
//    );
//  }
export default App;