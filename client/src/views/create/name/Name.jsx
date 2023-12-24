import validation from "./validation"; 
import { useState, useEffect } from "react"; 

const Name = ({ name, value, onChange }) => {
    const [userData, setUserData] = useState({
        name: value || "", // Usa el valor proporcionado o un string vacío si es nulo o indefinido
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { value } = event.target;

        const userValidated = validation({ name: value });
        setErrors(userValidated);

        setUserData({
            name: value,
        });

        // Envía el valor actualizado al componente padre
        onChange(value);
    };

    useEffect(() => {
        if (userData.name !== '') {
            const userValidated = validation({ name: userData.name });
            setErrors(userValidated);
        }
    }, [userData]);

    return (
        <div>
            <label htmlFor="name">Nome</label>
            <input
                id="name"
                type="text"
                name="name"
                placeholder="Nome"
                value={userData.name}
                onChange={handleChange}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
    );
};

export default Name;
