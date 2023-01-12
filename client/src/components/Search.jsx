import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../redux/actions";
import { ButtonCargar, InputSearch } from "./styles";

export default function SearchBar({setPaginaActual}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setName("");
        await dispatch(getNameVideogame(name));
        setPaginaActual(1);
    }

    return (
        <div style={{margin : "10px"}}>
            <InputSearch type="text" placeholder="Buscar por nombre..." onChange={handleInputChange} value={name}/>
            <ButtonCargar type="submit" onClick={handleSubmit}>Buscar</ButtonCargar>
        </div>
    )
}