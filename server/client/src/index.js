import React, { useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";


function Locations() {

    const [locations, setLocations] = useState("");

    //const locationData = require("./locationData.json");
    const sendLocations = () => {
        fetch('/api/locations')
            .then(response => response.json())
            .then(resp => setLocations(resp))
            .catch(err => console.log(err));
    };

    return (
        <>
            <div
                style={{ flexDirection: 'column', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <div>
                <button onClick={sendLocations} >See locations</button>
            </div>
            {locations && <div> {
                    locations.map(location => (
                    <Location key = {location.id} location = {location.location} />))
                    }
                </div>}
            </div>
    </>);
}

function Location({location}) {

    return ( <div>
                <h4> {location} </h4>
            </div>
    );

}

function Home() {

    return(
     <>
        <h1> Meteo reports </h1>
        <p> See and compare weather reports across the world </p>
        <Locations />
     </>
 );
}

ReactDOM.render(<Home />, document.getElementById('root'));
