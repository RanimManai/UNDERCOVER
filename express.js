const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = 3333;
const nbPlayers= 5;

let players = [];
let wordList = ['country', 'fruits', 'sports', 'makeup', 'animals', 'weapons', 'sand', "fruit juice"];
let underList = ['flags', 'vegetables', 'races', 'beauty', 'insects', 'swords', 'beach', 'water'];

function assignRoles() {
  const j = Math.floor(Math.random() * underList.length);
  const k = Math.floor(Math.random() * nbPlayers);
  const undercoverWord = underList[j];
  const civilianWord = wordList[j];

  players.forEach((player, i) => {
  if (i===k)
  {player.word= undercoverWord}
  else{player.work=civilianWord}
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/src/assets', (req, res) => {
  const playerName = req.body.username;
  const newPlayer = {
      name: playerName,
      word: '',
  };
  console.log(playerName);
  players.push(newPlayer);

  if (players.length !== 1) {
      assignRoles();
  }

  const response = {
      playerName: playerName,
      word: newPlayer.word,
  };

  res.json(response);
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



