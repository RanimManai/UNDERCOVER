import React from 'react';
import getCookieValue from './getCookieValue.js';
function Welcome() {

    return (
        <div>
            <h2>Welcome, {getCookieValue("username")}!</h2>
            <h2>Your word is {getCookieValue("word")}</h2>
        </div>
    );
}

export default Welcome;
