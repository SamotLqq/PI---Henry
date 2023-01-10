import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDescription } from "../redux/actions";
import { useLocation } from "react-router-dom";
import { ButtonCargar } from "./Home";
import Card from "./Card";

export default function Detail() {
    const dispatch = useDispatch();
    let location = useLocation();
    const id = location.pathname.split("/").pop();
    const [load, setLoad] = useState(false);

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
            <div style={{display: "flex", backgroundColor : "rgba(255,255,255,0.9)", alignItems: "center", justifyContent: "center", margin: "10vh"}}>
                <div style={{marginLeft : "10vh", marginRight: "5vh"}}>
                    <Card name={name} image={background_image} genres={genres ? genres : []} detail={true} platforms={platforms} released={released} rating={rating}/>
                </div>
                <div style={{ display: "block", textAlign: "center", marginLeft : "5vh", marginRight: "10vh"}}>
                    <h3>{description_raw}</h3>
                </div>
            </div>
            <Link to={"/main"}><ButtonCargar>Volver</ButtonCargar></Link>
        </div>

    )
}