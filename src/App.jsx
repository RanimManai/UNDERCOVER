import { useState } from 'react'
import Header from './Header.jsx'
import Username from './Username.jsx'
import Footer from './Footer.jsx'
import Welcome from './Welcome.jsx'


function App(){
    const [formSubmitted, setFormSubmitted] = useState(false);
   if (!formSubmitted) return (
    <> <Header></Header>
    <Username formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></Username>
    <Footer></Footer>
    </>)
    else return(<> <Header></Header>
    <Welcome/>
    <Footer></Footer>
    </>)
}
export default App
