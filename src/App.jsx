import { useState,useEffect } from 'react'
import Header from './Header.jsx'
import Username from './Username.jsx'
import Footer from './Footer.jsx'
import Welcome from './Welcome.jsx'
import Chat from './Chat.jsx'
import getCookieValue from './getCookieValue.js'



function App(){
    
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [start, setStart] = useState(Boolean(getCookieValue("start")));

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
    
    if (!formSubmitted) return (
        <> <Header></Header>
    <Username formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></Username>
    <Footer></Footer>
    </>)
    else 
    {  
      if (!start) return(<> <Header></Header>
    <Welcome/>
    <Footer></Footer>
    </>)
    else { return <><Header></Header>
    <Chat/>
    <Footer></Footer>
    </>}
}
}
export default App
