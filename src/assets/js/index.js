window.addEventListener('load', () => {
    addEventPlayerDelete();
    addEventGageDelete();
    loadProfils();
});

const playerAdd = document.getElementById('player-add');
playerAdd.addEventListener('click', (e) => {
    e.preventDefault();
    const playerList = document.getElementById('list-players');
    const newPlayer = document.createElement('div');
    newPlayer.classList.add('player');
    newPlayer.innerHTML = '<div class="player-delete">X</div>\n' +
        '<input class="player-name" type="text" placeholder="Le prénom du joueur..."/>\n' +
        '<input class="player-firstname" type="text" placeholder="Le nom du joueur..."/>\n' +
        '<select class="player-level">\n' +
        '<option value="1">Débutant</option>\n' +
        '<option value="2">Intermédiaire</option>\n' +
        '<option value="3">Confirmé</option>\n' +
        '</select>';
    playerList.appendChild(newPlayer);
    addEventPlayerDelete();
});

const gageAdd = document.getElementById('gage-add');
gageAdd.addEventListener('click', (e) => {
    e.preventDefault();
    const gageList = document.getElementById('list-gages');
    const newGage = document.createElement('div');
    newGage.classList.add('gage');
    newGage.innerHTML = '<div class="gage-delete">X</div>\n' +
        '<input type="text" placeholder="Le gage..."/>';
    gageList.appendChild(newGage);
    addEventGageDelete();
});

const gageCheck = document.getElementById('check-dare');
gageCheck.addEventListener('input', (e) => {
    const option = e.target.value;
    if (option === '1') {
        document.getElementById('label-gages').style.display = 'block';
        document.getElementById('gages').style.display = 'block';
    } else if (option === '0') {
        document.getElementById('label-gages').style.display = 'none';
        document.getElementById('gages').style.display = 'none';
    }
});

function addEventPlayerDelete(el) {
    let playerDelete = document.querySelectorAll('.player-delete');
    playerDelete.forEach((el) => {
        el.addEventListener('click', () => {
            playerDelete = document.querySelectorAll('.player-delete');
            if (playerDelete.length > 4) el.parentElement.remove();
        });
    });
}

function addEventGageDelete(el) {
    let gageDelete = document.querySelectorAll('.gage-delete');
    gageDelete.forEach((el) => {
        el.addEventListener('click', () => {
            gageDelete = document.querySelectorAll('.gage-delete');
            if (gageDelete.length > 1) el.parentElement.remove();
        });
    });
}

function createProfil() {
    let profil = {};
    if (!localStorage.getItem('profils')) {
        profil['id'] = 1;
    } else {
        profil['id'] = JSON.parse(localStorage.getItem('profils')).length + 1;
    }
    const name = document.getElementById('profil-name').value.replaceAll(' ', '');
    if (name !== '')
        profil['name'] = name;
    else
        profil['name'] = 'Profil ' + profil['id'];
    const nbTerrains = parseInt(document.getElementById('nb-terrains').value);
    if (nbTerrains !== 0)
        profil['terrains'] = nbTerrains;
    else
        profil['terrains'] = 1;
    const nbTours = parseInt(document.getElementById('nb-tours').value);
    if (nbTours !== 0)
        profil['tours'] = nbTours;
    else
        profil['tours'] = 3;
    profil['gage'] = document.getElementById('check-dare').value === '1';

    const players = document.querySelectorAll('.player');
    let playersList = [];
    players.forEach((el) => {
        let player = {};
        const playerName = el.querySelector('.player-name').value.replaceAll(' ', '');
        if (playerName !== '') player['name'] = playerName;
        const playerFirstName = el.querySelector('.player-firstname').value.replaceAll(' ', '');
        if (playerFirstName !== '') player['firstname'] = playerFirstName;
        const playerLevel = parseInt(el.querySelector('.player-level').value);
        if (playerLevel === 1 || playerLevel === 2 || playerLevel === 3) player['level'] = playerLevel;
        playersList.push(player);
    });
    if (playersList.length !== 0) profil['players'] = playersList;

    if (profil['gage']) {
        const gages = document.querySelectorAll('.gage-text');
        let gageList = [];
        gages.forEach((el) => {
            const gage = el.value.replaceAll(' ', '');
            if (gage !== '') gageList.push(gage);
        });
        if (gageList.length !== 0) profil['gages'] = gageList;
    }

    if (!localStorage.getItem('profils')) {
        localStorage.setItem('profils', JSON.stringify([profil]));
    } else {
        const profils = JSON.parse(localStorage.getItem('profils'));
        profils.push(profil);
        localStorage.setItem('profils', JSON.stringify(profils));
    }

    return profil['id'];
}

function loadProfils() {
    if (!localStorage.getItem('profils')) return;
    const profils = JSON.parse(localStorage.getItem('profils'));
    const options = ['Nouveau profil'];
    profils.forEach((profil) => {
        options.push(profil['name']);
    });
    const selectProfils = document.getElementById('select-profils');
    options.forEach((opt, key) => {
        if (key === 0) return selectProfils[key] = new Option(opt, '0', false, false);
        selectProfils[key] = new Option(opt, selectProfils.options.length, false, false);
    });
}

document.getElementById('launch-tournament').addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.getElementById('select-profils').value === '0') {
        const profil = createProfil();
        sessionStorage.setItem('profilId', profil);
    } else {
        sessionStorage.setItem('profilId', document.getElementById('select-profils').value);
    }
    document.location.href = 'tournament.html';
});