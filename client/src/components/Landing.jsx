import React from "react";
import {Link} from "react-router-dom";
import { Button1 } from "./styles";

export default function Landing() {
    return (
        <div>
            <Link to="/main">
                <Button1>Press Start</Button1>
            </Link>
        </div>
    )
}