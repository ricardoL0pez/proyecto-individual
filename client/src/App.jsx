import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import Detail from './views/detail/Detail';
import Form from './views/create/Form';
import NotFound from './utils/notFound/NotFound';
import { Routes, Route } from 'react-router-dom';


//import './App.css';

function App() {
  return (
    <div className="App">
      {/* <h1>Henry Pokemon</h1> */}

      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/> //Envio por params el ID
        <Route path="/create" element={<Form/>}/>

        {/* Ruta para manejar rutas no definidas */}
        <Route path="*" element={<NotFound />} />

      </Routes>

    </div>
  );
}

export default App;
