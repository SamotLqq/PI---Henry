import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDescription } from "../redux/actions";
import { useLocation } from "react-router-dom";
import { ButtonCargar } from "./Home";
import Card from "./Card";
import styled from "styled-components";

const ContenedorDetail = styled.div `
    display: flex;
    background-color : rgba(255,255,255,0.9);
    align-items: center;
    justify-content: center;
    margin: 20px;
    @media (max-width: 600px) {
        display: block;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`
const MostrarOcultar = styled.button `
    cursor:pointer;

    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.02em;

    padding: 4px;
    margin: 8px;
    width: 200px;
    height: 40px;
    position: static;
    background: gray;
    border: 0px;
    border-radius: 16px;
    color: white;

`



export default function Detail() {
    const dispatch = useDispatch();
    let location = useLocation();
    const id = location.pathname.split("/").pop();
    const [load, setLoad] = useState(false);
    const [more, setMore] = useState(false);

    useEffect(() => {
        setLoad(true);
        dispatch(getDescription(id));
        setTimeout(() => {
            setLoad(false);
        }, 3000);

    }, [])

    const {name, released, rating, genres, background_image, platforms, description_raw} = useSelector(state => state.description);

    if (load) {
        return (
            <div>
                <img src="https://ikeasistencia.com/img/loading.gif" alt="Loading..." />
            </div>
        )
    }

    return (
        <div>
            <ContenedorDetail>
                <div style={{margin: "25px"}}>
                    <Card name={name} image={background_image} genres={genres ? genres : []} detail={true} platforms={platforms} released={released} rating={rating}/>
                </div>
                <div style={{margin: "25px"}}>
                    {more ? 
                    <div>
                        <h3>{description_raw}</h3>
                        <MostrarOcultar onClick={() => {setMore(false)}}>{"VER MENOS <"}</MostrarOcultar>
                    </div> : 
                    <div>
                        <h3>{description_raw ? description_raw.slice(0,100) + "..." : description_raw}</h3>
                        <MostrarOcultar onClick={() => {setMore(true)}}>{"VER MAS >"}</MostrarOcultar>
                    </div>}
                </div>
            </ContenedorDetail>
            <Link to={"/main"}><ButtonCargar>Volver</ButtonCargar></Link>
        </div>

    )
}