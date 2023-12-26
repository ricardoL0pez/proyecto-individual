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
    console.log(userData);
    useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const isNormalOrUnknown = value === 'normal' || value === 'unknown';
        const maxUserData = 3;

        if (isNormalOrUnknown && checked) {
            setUserData([value]);
        } else if (isNormalOrUnknown && !checked) {
            setUserData([]);
        } else {
            setUserData((prevUserData) => {
                if (
                    prevUserData.includes('normal') ||
                    prevUserData.includes('unknown')
                ) {
                    return prevUserData;
                } else if (prevUserData.includes(value)) {
                    return prevUserData.filter((type) => type !== value);
                } else if (prevUserData.length < maxUserData) {
                    return [...prevUserData, value];
                }
                return prevUserData;
            });
        }
        setHasChanges(true);
    };//io

    const validate = () => {
        const validationErrors = validation({ type: userData });

        if (userData.length === 0) {
            setErrors({
                type: "Seleziona minimo un tipo.",
            });
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

    return (
        <div>
            <h1>Seleziona al massimo tre tipi:</h1>
            {types.map((type) => (
                <div key={type.id}>
                    <input
                        type="checkbox"
                        name={name}
                        value={type.id} // Cambia el valor del checkbox al id del tipo
                        id={`type-${type.id}`}
                        onChange={handleCheckboxChange}
                        checked={userData.includes(type.id)} // Verifica si el id está incluido en userData
                    />
                    <label htmlFor={`type-${type.id}`}>{type.name}</label> {/* Muestra el nombre del tipo */}
                </div>
            ))}
            <div>
                {Object.keys(errors).length > 0 && (
                    <p style={{ color: "red" }}>{errors.type}</p>
                )}
            </div>
        </div>

    );
};

export default Types;
