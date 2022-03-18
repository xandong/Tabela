const tabela = document.querySelector('#tabela')
const btnAddPlayer = document.querySelector('#add-player');
const btnRemovePlayer = document.querySelector('#remove-player')
const btnResetPlayers = document.querySelector('#reset-players')

const btnAdd = document.querySelectorAll('.btn-add')
const btnAddWin = document.getElementsByClassName('btn-add-win')
const btnAddPie = document.getElementsByClassName('btn-add-pie')
const btnAddLose = document.getElementsByClassName('btn-add-lose')



let players = [], 
    playersFormated = [],
    indexId = -1;


function createPlayer(name) { // CLASSE DE UM JOGADOR
    indexId++;
    return {
        id: indexId,
        name,
        win: Number = 0,
        tie: Number = 0,
        lose: Number = 0,
        points: Number = 0,
    };
}

function checkPlayer(name) {
    players.forEach(player => {
        if (player.name == name) {
            alert('PLAYER JÁ INSERIDO !!!');
            name = prompt('Insira o nome corretamente:')
            checkPlayer(name)
        }
    });
    return name;
}

function calculaPontos (player) {
    player.points = (player.win*3)+player.tie;
}

function addPlayer() {  // COMO ADICIONAR UM NOVO JOGADOR
    newNamePlayer = prompt("Nome do novo PLAYER:"); // RECEBE NOME DO NOVO JOGADOR    
    newNamePlayer = checkPlayer(newNamePlayer); // CHECA SE PLAYER JA ESTÁ INSERIDO
    // let invalidInput = [null, '', '\32'*Number]
    // console.log(invalidInput)
    let newPlayer = (createPlayer(newNamePlayer));
    console.log(newPlayer)
    if (newNamePlayer == null || newNamePlayer.length === 0|| newNamePlayer.match(/^(\s)+$/) ) return
    let newPlayerFormated = `<tr>\n
                    <td>${newPlayer.name}</td>\n
                    <td>${newPlayer.win}</td>\n
                    <td class="text-start"><button onClick="addWin(players[${newPlayer.id}])" id="btn-add-win${newPlayer.id}" class="btn-add btn-add-win">+</button></td>\n
                    <td>${newPlayer.tie}</td>\n
                    <td class="text-start"><button onClick="addTie(players[${newPlayer.id}])" id="btn-add-tie${newPlayer.id}" class="btn-add btn-add-tie">+</button></td>\n
                    <td>${newPlayer.lose}</td>\n
                    <td class="text-start"><button onClick="addLose(players[${newPlayer.id}])" id="btn-add-lose${newPlayer.id}" class="btn-add btn-add-lose">+</button></td>\n
                    <td>${newPlayer.points}</td>\n
                    </tr>`
    tabela.innerHTML += newPlayerFormated;
    playersFormated.push(newPlayerFormated)
    players.push(newPlayer)
}



function removePlayer() {
    let newPlayers = [];
    alert('Atenção! Insira o nome corretamente.')
    let nameRemove = prompt("Remover o PLAYER: ");

    players.forEach(player => {
        if(player.name != nameRemove) {
        newPlayers.push(player)
        }
    });
    players = newPlayers;
    newPlayers = [];
    console.log(players)
}

function resetPlayers() {
    players.forEach(player => {
        player.win = 0;
        player.tie = 0;
        player.lose = 0;
        player.points = 0;
    })    
}

function add() {
    //calculaPontos(player);
    console.log("Botão Adicionado")
}

function addWin(player) {
    //calculaPontos(player);
    player.win++;
    calculaPontos(player)
    console.log("Vitoria Adicionada")
}
function addTie(player) {
    //calculaPontos(player);
    console.log("Empate Adicionado")
    player.tie++;
    calculaPontos(player)
}
function addLose(player) {
    player.lose++;
    console.log("Derrota Adicionada")
}

btnAddPlayer.addEventListener('click', addPlayer, false); // ADICIONANDO NOVO JOGADOR
btnRemovePlayer.addEventListener('click', removePlayer, false); // REMOVE PLAYER DA LISTA
btnRemovePlayer.addEventListener('click', resetPlayers, false); // RESETA TODOS OS VALORES DO PLAYERS
