const table = document.querySelector('#tabela')
const btnAddPlayer = document.querySelector('#add-player');
const btnRemovePlayer = document.querySelector('#remove-player')
const btnResetPlayers = document.querySelector('#reset-players')

let [players, playersFormated] = [[],[]],
    [indexId, valueWin, valueTie] = [-1, 3, 1];

function headerTable () { // CABEÇALHO DA TABELA
    return (
`<tr>
<th>Name</th>
<th>Wins</th>
<th></th>
<th>Tie</th>
<th></th>
<th>Points</th>
</tr>`)
}
table.innerHTML = headerTable()

function lineTable (player) { // CRIA LINHA DA TABELA EM HTML
    return (
`<tr>
<td>${player.name}</td>
<td>${player.win}</td>
<td class="text-start"><button onClick="addWin(players[${player.id}])" class="btn-add">+</button></td>
<td>${player.tie}</td>
<td class="text-start"><button onClick="addTie(players[${player.id}])" class="btn-add">+</button></td>
<td>${player.points}</td>
</tr>`)
}
function alterTable () { // ALTERA TODA A TABELA
    table.innerHTML = headerTable();
    players.forEach(player => {
        table.innerHTML += (playersFormated[player.id] = lineTable(player));
    })
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
function checkName(name) { // CHECA SE NOME É INVALIDO OU REPETIDO
    players.forEach(player => {
        if(name == player.name) {
            checkName(name = prompt('Inválido. Insira um nome diferente:'));
        }
    });
    return name;
}
function addPlayer() {  // ADICIONA UM NOVO JOGADOR
    let newNamePlayer = checkName(prompt("Nome do novo PLAYER:")); // RECEBE E FUNCAO PARA CHECAR NAME
    if (newNamePlayer == null|| newNamePlayer.length == 0 || newNamePlayer.match(/^(\s)+$/) ) return
    let newPlayer = (createPlayer(newNamePlayer));
    players.push(newPlayer);
    playersFormated.push(lineTable(newPlayer));
    table.innerHTML += lineTable(newPlayer);
}
function removePlayer() { // REMOVE UM JOGADOR PELO NOME
    let auxIndex = 0,
        newPlayers = [],
        newPlayerFormated = [],
        nameRemove = prompt("Atenção! Insira o nome do jogador corretamente:");
    players.forEach(player => {
        if(player.name != nameRemove) {
            newPlayers.push(player)
            newPlayerFormated.push(playersFormated[player.id])
            auxIndex++;
            if( auxIndex == players.length) alert("Nome inválido.")
        } else {
            for (let i = player.id; i < players.length-1; i++) {
                players[i+1].id = i;
            }
            alert(`Jogador ${nameRemove} removido!`)
        }
    });
    [players, playersFormated] = [newPlayers, newPlayerFormated];
    [newPlayers, newPlayerFormated] = [[], []];
    alterTable();
}
function resetPlayers() { // RESETA A W/T/P DE TODOS OS JOGADORES
    players.forEach(player => {
        [player.win, player.tie, player.points] = [0, 0, 0];
    })
    alterTable();     
}
function calculaPoints (player) { // CALCULA POTNOS
    player.points = (player.win*valueWin)+player.tie*valueTie;
    alterTable();
}
function addWin(player) { // ADICIONA VITÓRIA A JOGADOR
    player.win++;
    calculaPoints(player);   
}
function addTie(player) { // ADICIONA EMPATE A JOGADOR
    player.tie++;
    calculaPoints(player);
}

btnAddPlayer.addEventListener('click', addPlayer, false); // ADICIONANDO NOVO JOGADOR
btnRemovePlayer.addEventListener('click', removePlayer, false); // REMOVE PLAYER DA LISTA
btnResetPlayers.addEventListener('click', resetPlayers, false); // RESETA TODOS OS VALORES DO PLAYERS
