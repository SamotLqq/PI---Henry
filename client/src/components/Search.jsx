import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame, updateGenres, updateOrder, updateOrigen } from "../redux/actions";
import { ButtonCargar, ContenedorFiltros, InputSearch } from "./styles";

export default function SearchBar({setPaginaActual, setLoading}) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (name === "") alert("Debe ingresar un nombre");
        else {
            setLoading(true);
            setName("");
            dispatch(updateGenres([]));
            dispatch(updateOrder(""));
            dispatch(updateOrigen(""));
            await dispatch(getNameVideogame(name));
            setPaginaActual(1);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        }
    }

    return (
        <ContenedorFiltros>
            <h1>Buscador</h1>
            <InputSearch type="text" placeholder="Buscar por nombre..." onChange={handleInputChange} value={name}/>
            <ButtonCargar type="submit" onClick={handleSubmit}>Buscar</ButtonCargar>
        </ContenedorFiltros>
    )
}