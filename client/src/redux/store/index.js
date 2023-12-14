import { createStore, applyMiddleware, compose } from "redux"; // Importa funciones y herramientas de Redux
import rootReducer from "../reducer"; // Importa el rootReducer que combina todos los reducers de la aplicación
import thunk from "redux-thunk"; // Importa el middleware 'redux-thunk' para manejar acciones asíncronas

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
// Configuración para la integración de la extensión de Redux DevTools del navegador.
// Si la extensión Redux DevTools está disponible en el navegador, utiliza la función de composición avanzada.
// Si no está disponible, utiliza la función 'compose' de Redux por defecto.

const store = createStore(
  rootReducer, // El rootReducer que combina todos los reducers de la aplicación.
  composeEnhancers(applyMiddleware(thunk))
);
// Crea el store de Redux usando la función createStore de Redux.
// Recibe como parámetros el rootReducer, el cual define la estructura del estado de la aplicación,
// y la configuración definida por composeEnhancers, que incluye la integración de la extensión de Redux DevTools
// y la aplicación del middleware 'redux-thunk'.

export default store; // Exporta el store creado para que esté disponible y pueda ser utilizado en otros archivos de la aplicación.


/* Explicación detallada por línea:

import { createStore, applyMiddleware, compose } from "redux";: Importa las funciones necesarias de Redux para crear el store, aplicar middlewares y realizar la composición de herramientas para el desarrollo.
import rootReducer from "./reducer";: Importa el rootReducer que combina todos los reducers de la aplicación. Este archivo generalmente contiene la combinación de todos los reducers individuales en un solo reducer raíz.
import thunk from "redux-thunk";: Importa el middleware redux-thunk, el cual permite manejar acciones asíncronas dentro de Redux, como peticiones a APIs.
const composeEnhancers = ...: Configura la composición de herramientas para utilizar la extensión Redux DevTools del navegador si está disponible. Si no está disponible, utiliza la función compose de Redux por defecto.
const store = createStore(...);: Crea el store de Redux usando la función createStore de Redux. Recibe como parámetros el rootReducer, el cual define la estructura del estado de la aplicación, y la configuración definida por composeEnhancers, que incluye la integración de la extensión de Redux DevTools y la aplicación del middleware redux-thunk.
export default store;: Exporta el store creado para que esté disponible y pueda ser utilizado en otros archivos de la aplicación. Este store es la pieza central de Redux donde se almacena el estado global y se gestiona el flujo de datos en la aplicación. */