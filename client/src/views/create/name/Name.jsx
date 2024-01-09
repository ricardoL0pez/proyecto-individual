 /* import styles from './name.module.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../../redux/actions/index";
import validation from "./validation";

const Name = ({ name, value, onChange }) => {
    const pokemons = useSelector((state) => state.pokemons);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        name: value || "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        const updatedUserData = {
            ...userData,
            [name]: value, 
        };
    
        const userValidated = validation({ [name]: value }, pokemons);
        setErrors(userValidated);
    
        // Si el campo está vacío, se actualiza el estado userData y se limpian los errores
        if (value.trim() === '') {
            setUserData(updatedUserData);
            setErrors({});
        } else if (!userValidated[name]) {
            // Si no hay errores de validación, se actualiza el estado userData
            setUserData(updatedUserData);
        }
    
        // Llamar a onChange con el valor actual (incluso si hay errores)
        onChange(value);
    };

    useEffect(() => {
        if (userData.name.trim() !== '') {
            const userValidated = validation(userData, pokemons); 
            setErrors(userValidated); 
        }
    }, [userData, pokemons]);

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.label}>< label htmlFor="name">Nome</label></div>
            <input className={styles.nameinput}
                id="name"
                type="text"
                name={name}
                placeholder="Nome"
                value={userData.name}
                onChange={handleChange}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
    );
};

export default Name;  */

import styles from './name.module.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../../redux/actions/index";
import validation from "./validation";

const Name = ({ name, value, onChange }) => {
    const pokemons = useSelector((state) => state.pokemons);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        name: value || "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Actualiza el estado de userData con el nuevo valor ingresado en el input
        setUserData({
            ...userData,
            [name]: value, // Actualiza el campo 'image' en 'userData' con el valor del input
        });
        // Realiza la validación de la URL y actualiza los errores
        const userValidated = validation({ [name]: value }, pokemons);
        setErrors(userValidated);
        // Envia el valor actualizado al componente padre mediante la función onChange
        onChange(value);
    };

    // Efecto que se ejecuta cuando cambia el estado de userData
    useEffect(() => {
        // Verifica si el valor de la imagen no está vacío para realizar la validación
        if (userData.name.trim() !== '') {
            const userValidated = validation(userData, pokemons); // Realiza la validación de la imagen
            setErrors(userValidated); // Actualiza los errores con el resultado de la validación
        }
    }, [userData, pokemons]);



    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.label}>< label htmlFor="name">Nome</label></div>
            <input className={styles.nameinput}
                id="name"
                type="text"
                name={name}
                placeholder="Nome"
                value={userData.name}
                onChange={handleChange}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
    );
};

export default Name; 