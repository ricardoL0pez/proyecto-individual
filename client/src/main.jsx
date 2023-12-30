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


/* Explicación línea por línea:

import * as React from "react";: Importa la librería React.
import { createRoot } from "react-dom/client";: Importa la función createRoot de react-dom/client, la cual es utilizada para crear la raíz en la que se renderizará la aplicación.
import { BrowserRouter } from "react-router-dom";: Importa el componente BrowserRouter de react-router-dom, el cual permite habilitar el enrutamiento en la aplicación.
import App from './App';: Importa el componente principal de la aplicación desde el archivo './App'.
import { Provider } from 'react-redux';: Importa el componente Provider de react-redux, el cual se utiliza para conectar la aplicación con el store de Redux.
import store from './redux/store';: Importa el store de Redux desde el archivo './redux/store'.
const root = createRoot(document.getElementById("root"));: Crea una raíz para renderizar la aplicación en el elemento HTML con el ID "root".
root.render(...);: Utiliza la función render de la raíz creada para renderizar la aplicación. Dentro de esta función se utiliza JSX (JavaScript XML) para estructurar la interfaz de la aplicación:
<React.StrictMode>: Componente de React que habilita el modo estricto para detectar posibles problemas en la aplicación durante el desarrollo.
<Provider store={store}>: Componente Provider que envuelve la aplicación y la conecta con el store de Redux, proporcionando acceso al estado de Redux a lo largo de la aplicación.
<BrowserRouter>: Componente que habilita el enrutamiento mediante el componente BrowserRouter, permitiendo la navegación entre distintas vistas de la aplicación.
<App />: Componente principal de la aplicación que se renderizará dentro del enrutador. */