import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameVideogame, updateBusqueda, updateSearchActual, updateSearchOn } from "../redux/actions";
import { ButtonCargar, ContenedorFiltros, InputSearch, ButtonSelect } from "./styles";

export default function SearchBar({setPaginaActual, setLoading}) {
    const dispatch = useDispatch();
    const name = useSelector(state => state.busqueda);
    const search = useSelector(state => state.searchOn);
    const searchActual = useSelector(state => state.searchActual);

    function handleInputChange(e) {
        e.preventDefault();
        dispatch(updateBusqueda(e.target.value));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name === "") alert("Debe ingresar un nombre");
        else {
            setLoading(true);
            dispatch(updateSearchOn(true));
            dispatch(updateSearchActual(name));
            dispatch(getNameVideogame(name));
            setPaginaActual(1);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        }
    }

    function handleDeleteSearch() {
        setLoading(true);
        dispatch(updateSearchOn(false));
        dispatch(updateSearchActual(""));
        dispatch(updateBusqueda(""));
        dispatch(getNameVideogame("")); // trae todos los videogames ordenados y filtrados.
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }

    return (
        <ContenedorFiltros>
            <h1>Buscador</h1>
            <InputSearch type="text" placeholder="Buscar por nombre..." onChange={handleInputChange} value={name}/>
            <ButtonCargar type="submit" onClick={handleSubmit}>Buscar</ButtonCargar>
            {search && <div> <ButtonSelect onClick={handleDeleteSearch}>{searchActual.length <= 10 ? searchActual : searchActual.slice(0,10) + "..."}</ButtonSelect> </div>}
        </ContenedorFiltros>
    )
}