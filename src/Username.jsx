import { useState } from "react";
import Welcome from "./Welcome"; 
import axios from "axios";

function Username(props) {
    const formSubmitted= props.formSubmitted
    const setFormSubmitted=props.setFormSubmitted;
    const [newGame, setNewGame] = useState(false);
    const [joinGame, setJoinGame] = useState(false);
    const [username, setUsername] = useState("");
    const [code, setCode] = useState(0);
    const [num,setNum]= useState(0);

    const toggleNewGame = (e) => {
        e.preventDefault();
        setNewGame(!newGame);
        setJoinGame(false);
        setFormSubmitted(false);
    };
    
    const toggleJoinGame = (e) => {
        e.preventDefault();
        setJoinGame(!joinGame);
        setNewGame(false);
        setFormSubmitted(false);
    };  

    const handleGameSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                username: username,
                code: code,
                num: num
            };
            const response = await axios.post('http://localhost:3333/submit', formData);
            if (response.status === 200) {
                setFormSubmitted(true);
            } else {
                console.error('Server returned error:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };


    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleCodeChange = (e) => {
        setCode(e.target.value);
    }
    const handleNumChange = (e) => {
        setNum(e.target.value);
    }
    

    if (newGame && !formSubmitted) {
        return (
            <div className="Username">
                <form onSubmit={handleGameSubmit} method="POST"> 
                    <input type="text" name="username" placeholder="Enter your username" onChange={handleUsernameChange}></input>
                    <br></br><br></br>
                    <input type="number" name="num" placeholder="Enter the number of players " min="1" max="15" onChange={handleNumChange}></input>  
                    <br></br>    <br></br>
                    <div className="buttons">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }


    if (joinGame && !formSubmitted) {
        return (
            <div className="Username">
                <form onSubmit={handleGameSubmit} method="POST"> 
                    <input type="text" name="username" placeholder="Enter your username" onChange={handleUsernameChange}></input> 
                    <br></br><br></br>
                    <input type="number" name="code" placeholder="Enter the code " onChange={handleCodeChange}></input>  
                    <br></br>    <br></br>
                    <div className="buttons">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }

    return (   
        <div className="Username">
            <form  method="post"> 
                <div className="button">
                    <button onClick={toggleNewGame}>New Game</button>
                    <br />
                    <br />
                    <button onClick={toggleJoinGame}>Join Game</button>
                </div>
            </form>
        </div>
    );
}

export default Username;