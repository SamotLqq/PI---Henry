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
    border-radius: 16px;
    font-size: 20px;
    font-weight: 900;
    position: static;
    height: 40px;
    width: 400px;
    padding-left: 20px;
    margin: 20px 10px 0px 0px;
    ::placeholder {
        color: white;
        opacity: 0.5;
    }
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button
    {
    -webkit-appearance: none;
    margin: 0;
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
        setName("");
        await dispatch(getNameVideogame(name));
        setPaginaActual(1);
    }

    return (
        <div style={{marginBottom : "1vw"}}>
            <InputSearch type="text" placeholder="Buscar por nombre..." onChange={handleInputChange} value={name}/>
            <ButtonCargar type="submit" onClick={handleSubmit}>Buscar</ButtonCargar>
        </div>
    )
}