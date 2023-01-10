import './App.css';
import { Route , Routes } from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import Create from './components/Create';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/main' element={<Home/>}/>
        <Route path='/main/:id' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path= '/:any' element={<h1 style={{minHeight: "100vh"}}>Not found page</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
