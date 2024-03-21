import React from 'react';
import getCookieValue from './getCookieValue.js';
function Welcome() {

    return ( <>
            <h2>Welcome, {getCookieValue("username")}!</h2>
            <h3 style={{textAlign:"center"}}>Waiting for players &#128515;</h3>
            <h3 style={{textAlign:"center"}}>{getCookieValue("game")}</h3>
    </>
    );
}

export default Welcome;
