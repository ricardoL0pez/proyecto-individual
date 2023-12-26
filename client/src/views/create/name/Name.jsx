import validation from "./validation";
import { useState, useEffect } from "react"; 

const Name = ({ name, value, onChange }) => {
    // Estado local para almacenar el valor del nombre del usuario
    const [userData, setUserData] = useState({
        name: value || "", // El estado inicial es el valor proporcionado o un string vacío si no se provee ninguno
    });

    // Estado local para manejar los errores de validación
    const [errors, setErrors] = useState({});

    // Función que se ejecuta cada vez que hay cambios en el input del nombre
    const handleChange = (event) => {
        const { name, value } = event.target;

        // Realiza la validación del nombre y actualiza los errores
        const userValidated = validation({ ...userData, [name]: value });
        setErrors(userValidated);

        // Actualiza el estado de userData con el nuevo valor ingresado en el input
        setUserData({
            ...userData,
            [name]: value, //sobrescribiendo solo el campo específico del nombre con el nuevo valor ingresado.
        });

        // Envia el valor actualizado al componente padre mediante la función onChange
        onChange(value);
    };

    // Efecto que se ejecuta cuando cambia el estado de userData
    useEffect(() => {
        // Verifica si el nombre no está vacío para realizar la validación
        if (userData.name !== '') {
            const userValidated = validation(userData); // Realiza la validación del nombre
            setErrors(userValidated); // Actualiza los errores con el resultado de la validación
        }
    }, [userData]); // Se ejecuta cada vez que userData cambia

    return (
        <div>
            {/* Etiqueta label para el input de nombre */}
            <label htmlFor="name">Nome</label>
            {/* Input de tipo texto para ingresar el nombre */}
            <input
                id="name"
                type="text"
                name={name}
                placeholder="Nome"
                value={userData.name} // Valor del input es el estado actual de 'name' en 'userData'
                onChange={handleChange} // Función que se ejecuta cuando cambia el input
            />
            {/* Si hay un error en el nombre, se muestra un mensaje en rojo */}
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
    );
};

export default Name;
