import styles from './name.module.css';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../../redux/actions/index";
import validation from "./validation";

const Name = ({ name, value, onChange }) => {
    const [userData, setUserData] = useState({
        name: value || "",
    });
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemons);

    const handleChange = (event) => {
        const { name, value } = event.target;
        const userValidated = validation({ ...userData, [name]: value }, pokemons); //La función validation ahora recibe los datos y los pokémons como argumentos para realizar la validación correctamente.
        setErrors(userValidated);
        setUserData({
            ...userData,
            [name]: value,
        });
        onChange(value);
    };

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch]);

    useEffect(() => {
        const userValidated = validation(userData, pokemons);
        setErrors(userValidated);
    }, [userData, pokemons]);

    return (
        <div className= {styles.container}>
            <div className= {styles.label}>< label htmlFor="name">Nome</label></div>
            <input className= {styles.nameinput}
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
