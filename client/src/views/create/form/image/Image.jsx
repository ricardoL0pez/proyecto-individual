import validation from "./validation";
import { useState, useEffect } from "react";


const Image = ({ name, value, onChange }) => {
    // Estado local para almacenar el valor de la URL de la imagen
    const [userData, setUserData] = useState({
        image: value || "", // El estado inicial es el valor proporcionado o un string vacío si no se provee ninguno
    });

    // Estado local para manejar los errores de validación
    const [errors, setErrors] = useState({});

  
    // Función que se ejecuta cada vez que hay cambios en el input de la imagen
    const handleChange = (event) => {
        const inputValue = event.target.value;

        // Actualiza el estado de userData con el nuevo valor ingresado en el input
        setUserData({
            ...userData,
            image: inputValue, // Actualiza el campo 'image' en 'userData' con el valor del input
        });

        // Realiza la validación de la URL y actualiza los errores
        const userValidated = validation({ image: inputValue });
        setErrors(userValidated);

        // Envia el valor actualizado al componente padre mediante la función onChange
        onChange(inputValue);
    };

    // Efecto que se ejecuta cuando cambia el estado de userData
    useEffect(() => {
        // Verifica si el valor de la imagen no está vacío para realizar la validación
        if (userData.image.trim() !== '') {
            const userValidated = validation(userData); // Realiza la validación de la imagen
            setErrors(userValidated); // Actualiza los errores con el resultado de la validación
        }
    }, [userData]);

    return (
        <div>
            {/* Etiqueta label para el input de imagen */}
            <label htmlFor="image">url dell'immagine</label>
            {/* Input de tipo texto para ingresar la URL */}
            <input
                id="image"
                type="text"
                name={name}
                placeholder="URL dell'immagine"
                value={userData.image} // Valor del input es el estado actual de 'image' en 'userData'
                onChange={handleChange} // Función que se ejecuta cuando cambia el input
            />
            {/* Si hay un error en la URL, se muestra un mensaje en rojo */}
            {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
        </div>
    );
};

export default Image;
