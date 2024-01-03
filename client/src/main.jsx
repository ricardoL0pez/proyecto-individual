import React from "react"; // Importa React
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; // Importa BrowserRouter de react-router-dom
import { Provider } from 'react-redux'; // Importa el componente Provider de react-redux
import store from './redux/store'; // Importa el store de Redux desde el archivo './redux/store'
import App from './App'; // Importa el componente principal 'App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root")); // Crea una raíz para renderizar la aplicación en el elemento con el ID "root"

root.render( // Renderiza la aplicación en la raíz creada
  <React.StrictMode> {/* Modo estricto de React para detectar posibles problemas */}
    <Provider store={store}> {/* Proveedor que conecta la aplicación con el store de Redux. Así App podra acceder a las actions*/}
      <BrowserRouter> {/* Componente para habilitar el enrutamiento mediante BrowserRouter */}
        <App /> {/* Componente principal de la aplicación */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);