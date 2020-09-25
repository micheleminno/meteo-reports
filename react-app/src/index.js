import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

function Hello() {

    return(
        <div>
            <h1> Meteo reports</h1>
            <p>See and compare weather reports across the world</p>
        </div>
    );
}

ReactDOM.render(

    <Hello/>,

    document.getElementById("root")
);
