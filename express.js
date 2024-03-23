const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const port = 3333;

let i=1000;
let games=[];
let wordList = ['country', 'fruits', 'sports', 'makeup', 'animals', 'weapons', 'sand', "fruit juice"];
let underList = ['flags', 'vegetables', 'races', 'beauty', 'insects', 'swords', 'beach', 'water'];
let prevgameids=[]


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
        games[gameIndex].players.push(newPlayer);
        newPlayer.game=parseInt(gameCode);
        console.log(`Player '${playerName}' joined game ${gameCode}`);
        res.cookie("game",gameCode,{maxAge:30000})
      }}
  if (playerNum){
    let newGame={
        code:++i,
        maxPlayers:parseInt(playerNum),
        numPlayers:1,
        players:[newPlayer],
        numkick: 0,
        end: false,
        voted: []
    }
    newPlayer.game=i;
    games.push(newGame);
    console.log(`player ${playerName} created a game id: ${i}`)
    res.cookie("game",newGame.code,{maxAge:120000})
  }
    res.cookie('username', playerName, {maxAge: 120000 });


    if ((gameCode)&&(gameIndex==-1)){
        console.log("erreur 400")
        res.status(400).send()
    }
else{    res.status(200).send()}
  
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/',(req, res) => {
  
    res.cookie("start",false,{maxAge:120000})
    res.sendFile(path.join(__dirname, "dist", "index.html"));

});

app.listen(port, () => {
    console.log(`Undercover est sur le port : ${port}`);
});


app.get('/update-cookie', (req, res) => {

  games.forEach((game)=>{
    if(req.cookies.game==game.code){
        if (game.maxPlayers==game.numPlayers){
          assignRoles(game.code)
          game.players.forEach((player)=> {
            if (player.name==req.cookies.username){
              res.cookie("word",player.word,{maxAge:120000})
            }
            res.cookie("start",true,{maxAge:3000})
          })
        }
        if (game.maxPlayers<game.numPlayers){
        game.players.forEach((player)=> {
          if (player.name==req.cookies.username){
            if(!player.word){
              player.word=game.word;
            }
            res.cookie("word",player.word,{maxAge:120000})
          }
          res.cookie("start",true,{maxAge:3000})
        })
      }
      res.status(200).send()
      }})
    }
  )




function assignRoles(gameid) {
  if (!prevgameids.includes(gameid)) {
  games.forEach((game)=>{if (game.code==gameid){
 const j = Math.floor(Math.random() * underList.length);
  const k = Math.floor(Math.random() * game.players.length);
  const undercoverWord = underList[j];
  const civilianWord = wordList[j];
  game.word=civilianWord;
  game.under=game.players[k];
    game.players.forEach((player,i)=>{
      if (i===k)
  {player.word= undercoverWord}
  else{player.word=civilianWord}
    })
  }
  });
  prevgameids.push(gameid);}
}

// socket.io
const io = require('socket.io')(port+1,{cors: {origin: "*" }});
io.on('connection', (socket) => {
  const gameRoom = socket.handshake.query.game
  const gameUser =socket.handshake.query.username
  socket.join(gameRoom);
  socket.on('chat message', (msg) => {
    if(msg.includes('/vote')){
      let timer=0;
      let intervalvote;
      games.forEach((game)=>{
        if (game.code==gameRoom){
          game.players.forEach((player)=>{
            let whovoted=msg.replace("/vote"+player.name,"")
            if (msg.includes("/vote"+player.name)&& !game.voted.includes(whovoted)){
              io.to(gameRoom).emit('chat message', "Someone voted "+player.name)}
              player.vote++
              game.voted.push(whovoted);
              intervalvote=setInterval(()=>{timer++
                let countdownmsg= "Time before kick " + (10-timer).toString()
                console.log(countdownmsg)
              io.to(gameRoom).emit('chat message',countdownmsg)
            },1000)
              setTimeout(()=>{ 
                clearInterval(intervalvote)
                game.players.sort((player1,player2)=>{return player2.vote-player1.vote})
                if (player==game.players[0]&&timer>=10){
                  io.to(gameRoom).emit('chat message',player.name+" kicked !")
                  game.numkick++
                  if ((game.numkick+2>=game.players.length)&&!game.end){
                    game.end=true
                    io.to(gameRoom).emit('chat message', "The undecover is victorious!")
                    io.emit('changeCookie', { name: 'kicked', value: 'true', options: { maxAge: 180000 } });
                  }
                if(gameUser==player.name){
                
                  io.emit('changeCookie', { name: 'kicked', value: 'true', options: { maxAge: 180000 } });
                }
                if(player.name==game.under.name&&!game.end){
                  game.end=true
                  io.to(gameRoom).emit('chat message',"Civilians win ! "+player.name+" was the undercover.")
                  io.emit('changeCookie', { name: 'kicked', value: 'true', options: { maxAge: 180000 } });
                }
              }    
              },11000)
              })
              
          }})
        }
        else if (msg.includes("/guess")){
          io.to(gameRoom).emit('chat message', "Someone is trying to guess the word...")
          games.forEach((game)=>{
            if (game.code==gameRoom){
              if(msg.includes("/guess"+game.word)&&!game.end){
                game.end=true
                io.to(gameRoom).emit('chat message', "The undercover is victorious!")
                io.emit('changeCookie', { name: 'kicked', value: 'true', options: { maxAge: 180000 } });
              }
        }})}
        else if (msg.includes("help")){
          io.to(gameRoom).emit('chat message', "/vote[name] to vote a suspect.") 
          io.to(gameRoom).emit('chat message',"/guess[word] for the undecover to guess a word.")
        }
      
    else{
      console.log('Message:', msg);
      io.to(gameRoom).emit('chat message', msg); 
    }
  });
  
  socket.on('disconnect', () => {
  });
});
