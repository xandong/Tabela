const tabela = document.querySelector('#tabela')
const btnAddPlayer = document.querySelector('#add-player');
const btnRemovePlayer = document.querySelector('#remove-player')
const btnResetPlayers = document.querySelector('#reset-players')

let players = [], 
    playersFormated = [],
    indexId = -1,
    valueWin = 3,
    valueTie = 1;

function headerTable () {
    return `<tr>
    <th>Name</th>
    <th>Wins</th>
    <th></th>
    <th>Tie</th>
    <th></th>
    <th>Points</th>
    </tr>`
}
tabela.innerHTML = headerTable()

function lineBodytable (player) {
    return `<tr>
                <td>${player.name}</td>
                <td>${player.win}</td>
                <td class="text-start"><button onClick="addWin(players[${player.id}])" id="btn-add-win${player.id}" class="btn-add">+</button></td>
                <td>${player.tie}</td>
                <td class="text-start"><button onClick="addTie(players[${player.id}])" id="btn-add-tie${player.id}" class="btn-add">+</button></td>
                <td>${player.points}</td>
            </tr>`
}

function alterTable () {
    tabela.innerHTML = headerTable();
    players.forEach(player => {
        return playersFormated[player.id] = lineBodytable(player)
    })
    tabela.innerHTML += playersFormated;
}

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

function addPlayer() {  // COMO ADICIONAR UM NOVO JOGADOR
    newNamePlayer = prompt("Nome do novo PLAYER:"); // RECEBE NOME DO NOVO JOGADOR    
    newNamePlayer = checkPlayer(newNamePlayer); // CHECA SE PLAYER JA ESTÁ INSERIDO
    if (newNamePlayer == null || newNamePlayer.length == 0 || newNamePlayer.match(/^(\s)+$/) ) return // VALIDAÇÃO DE STRING INVALIDA OU AÇÂO CANCELADA
    let newPlayer = (createPlayer(newNamePlayer));
    let newPlayerFormated = lineBodytable(newPlayer)
    players.push(newPlayer)
    playersFormated.push(newPlayerFormated)
    tabela.innerHTML += newPlayerFormated;
}

function removePlayer() {
    let newPlayers = [], newPlayerFormated = [], nameRemove = prompt(`Atenção, insira o nome corretamente! Remover o PLAYER: `, ['Nome do Player']);
    // if (nameRemove == null || nameRemove.length == 0 || nameRemove.match(/^(\s)+$/) ) return // VALIDAÇÃO DE STRING INVALIDA OU AÇÂO CANCELADA
    players.forEach(player => {
        if(player.name != nameRemove) {
            newPlayers.push(player)
            newPlayerFormated.push(playersFormated[player.id])
        }
    });

    players = newPlayers, playersFormated = newPlayerFormated;
    newPlayers = [], newPlayerFormated = [];
    alterTable();
}

function resetPlayers() {
    players.forEach(player => {
        player.win = 0;
        player.tie = 0;
        player.lose = 0;
        player.points = 0;
    })
    alterTable();     
}

function calculaPontos (player) {
    player.points = (player.win*valueWin)+player.tie*valueTie;
    alterTable();
}

function addWin(player) {
    player.win++;
    calculaPontos(player);   
}

function addTie(player) {
    player.tie++;
    calculaPontos (player);
}

btnAddPlayer.addEventListener('click', addPlayer, false); // ADICIONANDO NOVO JOGADOR
btnRemovePlayer.addEventListener('click', removePlayer, false); // REMOVE PLAYER DA LISTA
btnResetPlayers.addEventListener('click', resetPlayers, false); // RESETA TODOS OS VALORES DO PLAYERS
