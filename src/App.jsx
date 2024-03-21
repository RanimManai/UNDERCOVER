import { useState } from 'react'
import Header from './Header.jsx'
import Username from './Username.jsx'
import Footer from './Footer.jsx'
// import Success from './Success.jsx'

// function App() {
//  return <><Header></Header>
//  <br /><br />
//  <Username ></Username>
//  <Footer />
//  </>
// }
function App(){
    return (
    <> <Header></Header>
    <Username></Username>
    {/* <Success></Success> */}
    <Footer></Footer>
    </>)
}
export default App
