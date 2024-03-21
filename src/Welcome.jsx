import { useEffect,useState } from 'react';
import getCookieValue from './getCookieValue.js';
function Welcome(props) {
    const start=props.start
    const setStart=props.setStart
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch('http://localhost:3333/update-cookie')
            .then(response => { console.log("updating!")})
            .catch(error => {
                console.error('Error updating cookie:', error);
            });
            const initialStartValue = Boolean(getCookieValue("start"));
            setStart(start=>initialStartValue);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    return ( <>
            <h2>Welcome, {getCookieValue("username")}!</h2>
            <h3 style={{textAlign:"center"}}>Waiting for players &#128515;</h3>
            <h3 style={{textAlign:"center"}}>{getCookieValue("game")}</h3>
    </>
    );
}

export default Welcome;
