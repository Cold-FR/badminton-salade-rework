const profils = JSON.parse(localStorage.getItem('profils'));
const profil = profils.find((p) => p.id === parseInt(sessionStorage.getItem('profilId')))
console.log(profil);

for (let i = 1; i <= profil.tours; i++) {
    document.querySelector('.tour-list').innerHTML += `<div class="tour" id="tour-${i}">
                <h2 class="tour-nb">Tour ${i}</h2>
                <div class="terrains-list">
                </div>
            </div>`;
    for (let j = 1; j <= profil.terrains; j++) {
        document.querySelector(`#tour-${i} > .terrains-list`).innerHTML += `<div class="terrain">
                        <h4 class="terrain-nb">Terrain ${j}</h4>
                        <div class="players">
                            <div class="player one">
                                XXX
                            </div>
                            <div class="player two">
                                XXX
                            </div>
                            <div class="player three">
                                XXX
                            </div>
                            <div class="player four">
                                XXX
                            </div>
                        </div>
                        <div class="terrain-bg"></div>
                    </div>`;
    }
}

window.electronAPI.askMatchs(JSON.stringify(profil));