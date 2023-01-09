import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getGenres, getPlatforms, postVideogame } from "../redux/actions";
import { renderGenres } from "./Home";
import { InputSearch } from "./Search";
import { ButtonCargar } from "./Home";
import { SelectFilter } from "./Home";
import { Titulo } from "./Home";
import { ButtonCreate as ButtonHome } from "./Home";
const renderPlatforms = renderGenres;

const LabelTitle = styled.label `
    background-image: url(https://img1.picmix.com/output/stamp/normal/0/4/1/6/1526140_3f2af.gif);
    background-size: cover;
    color: #CB3234;
    border: none;
    border-radius: 2vw;
    font-size: 2vw;
    font-weight: 900;
    margin: 2vh;
`

export default function Create() {
    const dispatch = useDispatch();
    const platforms = useSelector(state => state.platforms);
    const genres = useSelector(state => state.genres);

    const [input, setInput] = useState({
        name: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: [],
        description_raw: "",
        background_image: ""
    })

    useEffect(() => {
        dispatch(getPlatforms());
        dispatch(getGenres());
    }, [])

    function handleChangeInput(e) {
        e.preventDefault()
        setInput({...input, [e.target.name] : e.target.value})
    } 

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postVideogame(input));
    }

    return (
        <div style={{minWidth: "100vw", minHeight: "100vh", backgroundImage: "url(https://img.freepik.com/vector-premium/fondo-transparente-videojuegos_6997-1230.jpg?w=2000)"}}>
            <Link to={"/main"}><ButtonHome>Volver</ButtonHome></Link>
            <div><Titulo>Crea tu videojuego</Titulo></div>
            <div style={{  minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center"  }}>
            <form action="">
                <div>
                    <LabelTitle htmlFor="">Nombre: </LabelTitle>
                    <InputSearch type="text" name="name" value={input.name} onChange={handleChangeInput}/>
                </div>
                <div>
                    <LabelTitle htmlFor="">Fecha de estreno inicial: </LabelTitle>
                    <InputSearch type="date" name="released" value={input.released} onChange={handleChangeInput}/>
                </div>
                <div>
                    <LabelTitle htmlFor="">Rating: </LabelTitle>
                    <InputSearch type="number" name="rating" value={input.rating} onChange={handleChangeInput}/>
                </div>
                <div>
                    <LabelTitle htmlFor="">Imagen: </LabelTitle>
                    <InputSearch type="text" name="background_image" value={input.background_image} onChange={handleChangeInput}/>
                </div>
                <div>
                    <LabelTitle htmlFor="">Descripción: </LabelTitle>
                    <InputSearch type="text" name="description_raw" value={input.description_raw} onChange={handleChangeInput}/>
                </div>
                <div>
                    <LabelTitle htmlFor="">Géneros: </LabelTitle>
                    <SelectFilter style={{background: "black", color: "white", marginBottom: "2vh"}}>{renderGenres(genres)}</SelectFilter>
                </div>
                <div>
                    <LabelTitle htmlFor="">Plataformas: </LabelTitle>
                    <SelectFilter style={{background: "black", color: "white"}}>{renderPlatforms(platforms)}</SelectFilter>
                </div>
                <div>
                    <ButtonCargar type="submit" onSubmit={handleSubmit}>Enviar</ButtonCargar>
                </div>
            </form>
            </div>
        </div>
    )
}