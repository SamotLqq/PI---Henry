import './App.css';
import { Route , Routes } from 'react-router-dom'
import Landing from './components/Landing';
import Home from './components/Home';
import Create from './components/Create';
import Detail from './components/Detail';
import { Titulo } from './components/styles';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/main' element={<Home/>}/>
        <Route path='/main/:id' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path= '/:any' element={<Titulo style={{minWidth: "100vw"}}>Not found page</Titulo>}/>
      </Routes>
    </div>
  );
}

export default App;
