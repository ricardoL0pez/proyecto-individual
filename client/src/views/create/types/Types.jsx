import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTypes } from "../../../redux/actions";
import validation from "./validation";

const Types = () => {
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
                } else if (prevUserData.length < maxUserData) {
                    return [...prevUserData, value];
                }
                return prevUserData;
            });
        }
        setHasChanges(true);
    };

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
        }
    }, [userData, hasChanges]);

    return (
        <div>
            <h1>Seleziona al massimo tre tipi:</h1>
            {types.map((type, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        name="types"
                        value={type.name}
                        id={`type-${type.name}`}
                        onChange={handleCheckboxChange}
                        checked={userData.includes(type.name)}
                    />
                    <label htmlFor={`type-${type.name}`}>{type.name}</label>
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
