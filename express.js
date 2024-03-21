const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const port = 3333;

let i=1000;
let players = [];
let games=[];
let wordList = ['country', 'fruits', 'sports', 'makeup', 'animals', 'weapons', 'sand', "fruit juice"];
let underList = ['flags', 'vegetables', 'races', 'beauty', 'insects', 'swords', 'beach', 'water'];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.post('/submit', (req, res) => {
    console.log('POST request arrived');
    const playerName = req.body.username;
    const gameCode = req.body.code;
    const playerNum = req.body.num;
    let gameIndex= -1;
    const newPlayer = {
        name: playerName,
      word: '',
      game: 0
  };
  if (gameCode) {
    gameIndex = games.findIndex(game => game.code == gameCode);
    if (gameIndex !== -1) {
        games[gameIndex].numPlayers++;
        games[gameIndex].players.push(playerName);
        newPlayer.game=parseInt(gameCode);
        console.log(`Player '${playerName}' joined game ${gameCode}`);
        res.cookie("game",gameCode,{maxAge:30000})
      }}
  if (playerNum){
    let newGame={
        code:++i,
        maxPlayers:parseInt(playerNum),
        numPlayers:1,
        players:[playerName]
    }
    newPlayer.game=i;
    games.push(newGame);
    console.log(`player ${playerName}created a game id:${i}`)
    res.cookie("game",newGame.code,{maxAge:30000})
  }
  players.push(newPlayer);
    res.cookie('username', playerName, {maxAge: 30000 });


    if ((gameCode)&&(gameIndex==-1)){
        console.log("erreur 400")
        res.status(400).send()
    }
else{    res.status(200).send()}
  console.log(games);
  console.log(players);
  
});

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res) => {
    res.cookie("start",false,{maxAge:10000})
    res.sendFile(path.join(__dirname, "dist", "index.html"));

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/update-cookie', (req, res) => {

  games.forEach((game)=>{
    if (game.maxPlayers==game.numPlayers){
      if(req.cookies.game==game.code){
        res.cookie("start",true,{maxAge:5000})
        res.status(200).send()
        }
      }})
    }
  )




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
