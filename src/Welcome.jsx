// import React, { useEffect, useState } from 'react';

// function Welcome() {
//     const [word, setWord] = useState('');
//     const [playerName, setPlayerName] = useState('');

//     useEffect(() => {
//         const fetchWord = ync () => {
//             try {
//                 // Sending POST request to the server with the username
//                 const response = await fetch('/', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ username: playerName }), // Convert object to JSON string
//                 });
//                 const data = await response.json();
//                 setWord(data.word);
//             } catch (error) {
//                 console.error('Error fetching word:', error);
//             }
//         };

//         fetchWord();
//     }, [playerName]);

//     return (
//         <div>
//             <h2>Welcome, {playerName}!</h2>
//             <h2>Your assigned word is: {word}</h2>
//         </div>
//     );
// }

// export default Welcome;
import React from 'react';

function Welcome(props) {
    const { playerName, word } = props;

    return (
        <div>
            <h2>Welcome, {playerName}!</h2>
            <h2>Your assigned word is: {word}</h2>
        </div>
    );
}

export default Welcome;
