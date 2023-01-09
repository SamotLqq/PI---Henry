import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getNameVideogame } from "../redux/actions";
import { ButtonCargar } from "./Home";

export const InputSearch = styled.input `
    background: black;
    color: white;
    border: none;
    border-radius: 2vw;
    font-size: 2vw;
    font-weight: 900;
    padding-left: 2vh;
    margin: 2vh;
    ::placeholder {
        color: white;
        opacity: 0.5;
    }
`

export default function SearchBar({setPaginaActual}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await dispatch(getNameVideogame(name));
        setPaginaActual(1);
    }

    return (
        <div style={{marginBottom : "1vw"}}>
            <InputSearch type="text" placeholder="Buscar por nombre..." onChange={handleInputChange}/>
            <ButtonCargar type="submit" onClick={handleSubmit}>Buscar</ButtonCargar>
        </div>
    )
}