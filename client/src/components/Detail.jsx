import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDescription } from "../redux/actions";
import { useLocation } from "react-router-dom";
import { ContenedorDetail, MostrarOcultar, ButtonCargar, Titulo } from "./styles";
import Card from "./Card";

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
        <div >
            <Titulo style={{minWidth: "100vw"}}>DETALLE DE {name}</Titulo>
            <ContenedorDetail>
                <div style={{margin: "25px"}}>
                    <Card image={background_image} genres={genres ? genres : []} detail={true} platforms={platforms} released={released} rating={rating}/>
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