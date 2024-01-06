import styles from './types.module.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../../../redux/actions";
import validation from "./validation";

const Types = ({ name, value, onChange }) => {
    const types = useSelector((state) => state.types);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState([]);
    const [errors, setErrors] = useState({});
    const [hasChanges, setHasChanges] = useState(false);
    
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const isNormalOrUnknown = value === 'normal' || value === 'unknown';

        if (isNormalOrUnknown) {
            if (checked) {
                // Si se selecciona 'normal' o 'unknown', deseleccionar otros tipos
                setUserData([value]);
            } else {
                // Si se deselecciona 'normal' o 'unknown', limpiar selección
                setUserData([]);
            }
        } else {
            setUserData((prevUserData) => {
                if (prevUserData.includes(value)) {
                    // Si se deselecciona un tipo que no es 'normal' o 'unknown'
                    return prevUserData.filter((type) => type !== value);
                } else if (prevUserData.length < 3) {
                    // Si se selecciona otro tipo y no hay 'normal' ni 'unknown' seleccionados aún y no se excede el límite de selección
                    return [...prevUserData, value];
                }
                // Límite alcanzado (no se permite seleccionar más tipos)
                return prevUserData;
            });
        }
        // Establece hasChanges como true para activar la validación
        setHasChanges(true);
    };


    const validate = () => {
        const validationErrors = validation({ type: userData });

        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    useEffect(() => {
        if (hasChanges) {
            validate();
            setHasChanges(false);
            onChange(userData); // Envía el nuevo valor al componente padre
        }
    }, [userData, hasChanges]);

    useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch]);

    return (
        <div>
            <h5>Seleziona al massimo tre tipi:</h5>

            <div className={styles.container}>

            {types.map((type) => (
                <div className={styles.containerinput} key={type.id}>
                    <input className={styles.input}
                        type="checkbox"
                        name={name}
                        value={type.name}
                        id={`type-${type.id}`}
                        onChange={handleCheckboxChange}

                        checked={userData.includes(type.name)}
                        disabled={
                            (userData.includes('908d0b42-b79e-4758-ba57-9ac31d420594') || userData.includes('3420682f-5aed-45a1-9654-489f21d9c621')) && !userData.includes(type.id)}

                    />
                    <div className={styles.label}><label  htmlFor={`type-${type.id}`}>{type.name}</label></div> {/* Muestra el nombre del tipo */}
                </div>
            ))}

            </div>

           
            <div>
                {Object.keys(errors).length > 0 && (
                    <p style={{ color: "red" }}>{errors.type}</p>
                )}
            </div>
        </div>

    );
};

export default Types;
