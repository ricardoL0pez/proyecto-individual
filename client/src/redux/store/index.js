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

export default store;