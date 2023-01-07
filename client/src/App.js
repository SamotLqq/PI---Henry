import './App.css';
import { Route , Routes } from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/main' element={<Home/>}/>
        <Route path='/main/:id' element={<h1 style={{minHeight: "100vh"}}>Detail page</h1>}/>
        <Route path='/create' element={<h1 style={{minHeight: "100vh"}}>Create page</h1>}/>
        <Route path= '/:any' element={<h1 style={{minHeight: "100vh"}}>Not found page</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
