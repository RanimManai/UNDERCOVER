const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const port = 3333;

let players = [];
let wordList = ['country', 'fruits', 'sports', 'makeup', 'animals', 'weapons', 'sand', "fruit juice"];
let underList = ['flags', 'vegetables', 'races', 'beauty', 'insects', 'swords', 'beach', 'water'];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.post('/submit', (req, res) => {
    const playerName = req.body.username;
    const newPlayer = {
        name: playerName,
      word: '',
  };
  console.log(playerName);
  console.log('jet');
  players.push(newPlayer);
    res.cookie('username', playerName, {
      maxAge: 2000, 
    });
    res.cookie('word', "word", {
        maxAge: 2000, 
      });
  res.status(200).send();
  
  
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




function assignRoles() {
  const j = Math.floor(Math.random() * underList.length);
  const k = Math.floor(Math.random() * players.length);
  const undercoverWord = underList[j];
  const civilianWord = wordList[j];

  players.forEach((player, i) => {
  if (i===k)
  {player.word= undercoverWord}
  else{player.work=civilianWord}
  });
}