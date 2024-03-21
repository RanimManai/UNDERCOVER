import { useState } from "react";
import Welcome from "./Welcome"; 

function Username() {
    const [formSubmitted, setFormSubmitted] = useState(false); 
    const [newGame, setNewGame] = useState(false);
    const [username, setUsername] = useState("");
    const [joinGame, setJoinGame] = useState(false);
    const [code, setCode] = useState("");

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

    const handleNewGameSubmit = (e) => {
        setFormSubmitted(true); 
    };

    const handleJoinGameSubmit = (e) => {
        setFormSubmitted(true); 
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handelCodeChange = (e) => {
        setCode(e.target.value);
    }

    if (newGame && !formSubmitted) {
        return (
            <div className="Username">
                <form onSubmit={handleNewGameSubmit} method="POST"> 
                    <input type="text" name="username" placeholder="Enter your username" onChange={handleUsernameChange}></input>
                    <br></br><br></br>
                    <input type="number" name="num" placeholder="Enter the number of players " min="0" max="100"></input>  
                    <br></br>    <br></br>
                    <div className="buttons">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }

    if (formSubmitted && newGame) {
        return <Welcome playerName={username}/>;
    }

    if (joinGame && !formSubmitted) {
        return (
            <div className="Username">
                <form onSubmit={handleJoinGameSubmit} method="POST"> 
                    <input type="text" name="username" placeholder="Enter your username" onChange={handleUsernameChange}></input> 
                    <br></br><br></br>
                    <input type="number" name="code" placeholder="Enter the code " onChange={handelCodeChange}></input>  
                    <br></br>    <br></br>
                    <div className="buttons">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }

    if (formSubmitted && joinGame) {
        return <Welcome playerName={username}/>;
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