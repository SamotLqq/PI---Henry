import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Button1 = styled.button `
   cursor:pointer;
   background-image: url(https://img1.picmix.com/output/stamp/normal/0/4/1/6/1526140_3f2af.gif);
   color: #CB3234;
   border: 5px solid black;
   width: 15vw;
   height: 10vh;
   border-radius: 1vw;
   font-size: 2vw;
   font-weight: 900;
`

export default function Landing() {
    return (
        <div>
            <Link to="/main">
                <Button1>Press Start</Button1>
            </Link>
        </div>
    )
}