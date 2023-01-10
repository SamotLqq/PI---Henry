import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getGenres, getPlatforms, postVideogame } from "../redux/actions";
import { renderGenres } from "./Home";
import { InputSearch } from "./Search";
import { ButtonCargar } from "./Home";
import { SelectFilter } from "./Home";
import { Titulo } from "./Home";
import { ButtonCreate as ButtonHome } from "./Home";
import swal from "sweetalert"
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
    padding: 0.5vh 1vh 0.5vh 1vh;
`

const ButtonSelect = styled.button `
    cursor:pointer;
    background: #CB3234;
    color: black;
    border: none;
    border-radius: 2vw;
    font-size: 2vw;
    font-weight: 900;
    margin: 1vh;
    &:hover {
        text-decoration:line-through;
        text-decoration-color: black;
        text-decoration-thickness: 0.4rem;
    }
`

const Error = styled.p `
    display: inline-block;
    font-size: 2vw;
    font-weight: 900;
    color: #CB3234;
    background: white;
`

// Realiza las validaciones.
function validar(input) {
    let errors = {};
    const extensions = /(.jpg|.png|.jpeg)$/i;

    // nombre
    if (!input.name) {
        errors.name = "Este campo no puede estar vacío";
    }
    // fecha
    else if (!input.released) {
        errors.released = "Este campo no puede estar incompleto";
    }
    // rating
    else if (!input.rating) {
        errors.rating = "Este campo no puede estar vacío";
    }
    else if (input.rating > 5) {
        errors.rating = "Debe ser menor que 5 o 5";
    }
    else if (input.rating < 0) {
        errors.rating = "Debe ser mayor que 0 o 0";
    }
    // imagen
    else if (!input.background_image) {
        errors.background_image = "Este campo no puede estar vacío";
    }
    else if (!extensions.test(input.background_image)) {
        errors.background_image = "Solo extensiones .jpg, .jpeg y .png";
    }
    // descripción
    else if (!input.description_raw) {
        errors.description_raw = "Este campo no puede estar vacío";
    }
    // generos
    else if (input.genres.length === 0) {
        errors.genres = "Este campo no puede estar vacío";
    }
    else if (input.platforms.length === 0) {
        errors.platforms = "Este campo no puede estar vacío"
    }
    return errors;
}

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

    const [errors, setErrors] = useState({vacio : "vacio"});

    useEffect(() => {
        dispatch(getPlatforms());
        dispatch(getGenres());
    }, [])

    // manejador de evento para los inputs del formulario.
    function handleChangeInput(e) {
        e.preventDefault();
        setInput({...input, [e.target.name] : e.target.value});
        setErrors(validar({...input, [e.target.name] : e.target.value}));
    }

    // manejador de evento para los selects del formulario
    function handleSelect(e) {
        e.preventDefault();
        if (!input[e.target.name].includes(e.target.value)){
            setInput({...input, [e.target.name] : [...input[e.target.name], e.target.value]})
            setErrors(validar({...input, [e.target.name] : [...input[e.target.name], e.target.value]}));
        }
    }

    // para eliminar algún genero o plataforma seleccionada
    function handleDelete(e) {
        e.preventDefault();
        let buffer = input[e.target.name].filter(element => element !== e.target.value);
        setInput({...input, [e.target.name]: buffer});
        setErrors(validar({...input, [e.target.name]: buffer}));
    }

    // manejador de evento del boton para subir el videojuego.
    function handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            dispatch(postVideogame(input));
            swal("Personaje creado con éxito", "", "success");
            setInput({name: "", released: "", rating: 0, platforms: [], genres: [], description_raw: "", background_image: ""});
            setErrors({vacio: "vacio"});
        }
        else {
            swal("Debe completar todos los campos", "", "error");
        }
    }

    // para mostrar los generos y plataformas seleccionadas
    function viewSelect(list, name) {
        return list.map((element, i) => {
            return <ButtonSelect value={element} name={name} key={i} onClick={handleDelete}>{element}</ButtonSelect>
        })
    }

    return (
        <div style={{minWidth: "100vw", minHeight: "100vh", backgroundImage: "url(https://img.freepik.com/vector-premium/fondo-transparente-videojuegos_6997-1230.jpg?w=2000)"}}>
            <Link to={"/main"}><ButtonHome style={{marginBottom: "5vh"}}>Volver</ButtonHome></Link>
            <div><Titulo>Crea tu videojuego</Titulo></div>
            <div style={{  minHeight: "75vh", display: "flex", justifyContent: "center", alignItems: "center"  }}>
            <form action="">
                <div>
                    <LabelTitle htmlFor="">Nombre: </LabelTitle>
                    <InputSearch type="text" name="name" value={input.name} onChange={handleChangeInput}/>
                    {errors.name && <Error>{errors.name}</Error>}
                </div>
                <div>
                    <LabelTitle htmlFor="">Fecha de estreno inicial: </LabelTitle>
                    <InputSearch type="date" name="released" value={input.released} onChange={handleChangeInput}/>
                    {errors.released && <Error>{errors.released}</Error>}
                </div>
                <div>
                    <LabelTitle htmlFor="">Rating: </LabelTitle>
                    <InputSearch type="number" name="rating" value={input.rating} onChange={handleChangeInput}/>
                    {errors.rating && <Error>{errors.rating}</Error>}
                </div>
                <div>
                    <LabelTitle htmlFor="">Imagen: </LabelTitle>
                    <InputSearch type="text" name="background_image" value={input.background_image} onChange={handleChangeInput}/>
                    {errors.background_image && <Error>{errors.background_image}</Error>}
                </div>
                <div>
                    <LabelTitle htmlFor="">Descripción: </LabelTitle>
                    <InputSearch type="text" name="description_raw" value={input.description_raw} onChange={handleChangeInput}/>
                    {errors.description_raw && <Error>{errors.description_raw}</Error>}
                </div>
                <div>
                    <LabelTitle htmlFor="">Géneros: </LabelTitle>
                    <SelectFilter defaultValue="Seleccione los generos" name="genres" onChange={handleSelect} style={{background: "black", color: "white", marginBottom: "1vh"}}>{renderGenres(genres)}</SelectFilter>
                    {errors.genres && <Error>{errors.genres}</Error>}
                </div>
                {viewSelect(input.genres, "genres")}
                <div>
                    <LabelTitle htmlFor="">Plataformas: </LabelTitle>
                    <SelectFilter defaultValue="Seleccione las plataformas" name="platforms" onChange={handleSelect} style={{background: "black", color: "white", marginTop: "1vh"}}>{renderPlatforms(platforms)}</SelectFilter>
                    {errors.platforms && <Error>{errors.platforms}</Error>}
                </div>
                {viewSelect(input.platforms, "platforms")}
                <div>
                {Object.keys(errors).length === 0 ? 
                <ButtonCargar type="submit" onClick={handleSubmit}>Enviar</ButtonCargar> : 
                <ButtonCargar type="submit" onClick={handleSubmit} style={{textDecoration: "line-through", textDecorationColor: "black", textDecorationThickness: "0.4rem"}}>Enviar</ButtonCargar>}
                </div>
            </form>
            </div>
        </div>
    )
}