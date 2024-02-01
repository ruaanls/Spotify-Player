const tituloMusica = document.querySelector("#titulo-musica"); /* Apontando para o elemento do titulo da música */
const musica = document.querySelector("#som"); /* Apontando para o elemento referente ao som do site */
const play = document.querySelector(".play"); /* Apontando para o icone play da barra do player */
const capaAlbum = document.querySelector("#capaAlbum");
const nomeArtista = document.querySelector("#artista");
const anterior = document.querySelector("#voltar");
const proximo = document.querySelector("#avancar")
const barraProgreco = document.querySelector('#barraconcluida');
const barraGeral = document.querySelector('#progressoContainer')
const volumeAtual = document.querySelector("#volume-atual");
const volumeGeral = document.querySelector("#volume-container");
const iconVolume = document.querySelector(".volume-icon");
const ponteiro = document.querySelector(".bi-circle-fill");
const ponteiro2 = document.querySelector(".diferente");
const like = document.querySelector(".like");
const lyric = document.querySelector("#lyrics");
const repeat = document.querySelector(".repetir");




/* Objetos das Músicas (Total = 12 Músicas) */

const newRomantics =
{
    tituloMusica: 'New Romantics (Taylor\'s Version)',
    nomeArtista: 'Taylor Swift',
    file: 'newRomantics',
    letra: "https://genius.com/Taylor-swift-new-romantics-taylors-version-lyrics"
};

const articMonkeys =
{
    tituloMusica: '505',
    nomeArtista: 'Artic Monkeys',
    file: '505',
    letra: "https://genius.com/Arctic-monkeys-505-lyrics"
};

const comeLittleCloser =
{
    tituloMusica: 'Come A Little Closer',
    nomeArtista: 'Cage The Elephant',
    file: 'comeLittleCloser',
    letra: "https://genius.com/Cage-the-elephant-come-a-little-closer-lyrics"
};

const orphans =
{
    tituloMusica: 'Orphans',
    nomeArtista: 'Coldplay',
    file: 'orphans',
    letra: "https://genius.com/Coldplay-orphans-lyrics"
};

const teenagers =
{
    tituloMusica: 'Teenagers',
    nomeArtista: 'My Chemical Romance',
    file: 'teenagers',
    letra: "https://genius.com/My-chemical-romance-teenagers-lyrics"
};

const drown =
{
    tituloMusica: 'Drown',
    nomeArtista: 'Bring Me The Horizon',
    file: 'drown',
    letra: "https://genius.com/Bring-me-the-horizon-drown-lyrics"
};


const unshaken =
{
    tituloMusica: 'Unshaken',
    nomeArtista: "D'Angelo",
    file: 'unshaken',
    letra: "https://genius.com/Dangelo-unshaken-lyrics"
};

const rodaGigante =
{
    tituloMusica: 'Roda Gigante',
    nomeArtista: 'Rodrigo Zin',
    file: 'rodaGigante',
    letra: "https://genius.com/Rodrigo-zin-roda-gigante-lyrics"
};


const dejavu =
{
    tituloMusica: 'Dejavu',
    nomeArtista: 'Luan Santana, Ana Castela',
    file: 'dejavu',
    letra: "https://genius.com/Luan-santana-and-ana-castela-deja-vu-lyrics"
};

const acordo =
{
    tituloMusica: 'Acordo',
    nomeArtista: 'Henrique e Juliano',
    file: 'acordo',
    letra: "https://genius.com/Henrique-and-juliano-acordo-lyrics"
}

const mandeSinal =
{
    tituloMusica: 'Mande um Sinal',
    nomeArtista: 'Píxote',
    file: 'mandeSinal',
    letra: "https://genius.com/Pixote-mande-um-sinal-ao-vivo-lyrics"
};

const merecoFeliz =
{
    tituloMusica: 'Mereço Ser Feliz',
    nomeArtista: 'Mumuzinho',
    file: 'merecoFeliz',
    letra: "https://www.letras.mus.br/mumuzinho/eu-mereco-ser-feliz/"
};

const playlist = [newRomantics, articMonkeys, comeLittleCloser, orphans, teenagers, drown, unshaken, rodaGigante, dejavu, acordo, mandeSinal, merecoFeliz];
let index = 0;
let indexTocadas = [];

let estaTocando = false;
let repetirOn = false;
let voltouMute = false;
let mouse = false; /* Valor padrão da variável de verificação do estado atual do player de músicas */
let quantLikes = 0;
let quantRepeat = 0;
let quantMute = 0;



/* Funções referentes ao player de música */

function playPause() {
    if (estaTocando == false) {
        tocarMusica(); /* Se não está tocando = Comece a tocar*/
    }

    else {
        pausarMusica(); /* Se está tocando = Pare de tocar */
    }
}

function tocarMusica() {
    play.classList.remove("bi-play-circle-fill"); /* Trocamos os icones removendo uma classe e colocando outra no lugar*/
    play.classList.add("bi-pause-circle-fill");
    musica.play();
    estaTocando = true;
    tocadas.push(index);

}

function pausarMusica() {
    play.classList.add("bi-play-circle-fill");
    play.classList.remove("bi-pause-circle-fill");
    musica.pause();
    estaTocando = false;
}

function carregarMusica() {
    tituloMusica.innerText = playlist[index].tituloMusica;
    nomeArtista.innerText = playlist[index].nomeArtista;
    capaAlbum.src = `/assets/img/${playlist[index].file}.jpg`;
    musica.src = `/assets/songs/${playlist[index].file}.mp3`;
}

function voltarMusica() {
    if (index == 0) {
        index = playlist.length - 1;
    }

    else {
        index = index - 1;
    }

    carregarMusica();
    tocarMusica();
}

function avancarMusica() {
    if (index == playlist.length - 1) {
        index = 0;
    }

    else if (repetirOn == true) {

        tocarMusica()
    }
    else {
        index = index + 1;
    }

    carregarMusica();
    tocarMusica();
}

function barraConcluida() {
    const atual = (musica.currentTime * 100 / musica.duration);
    barraProgreco.style.setProperty('--progresso', `${atual}%`);
    if (atual == 100) {
        avancarMusica();

    }
}

function irPara(event) {
    const width = barraGeral.clientWidth;
    const posicaoAtual = event.offsetX;
    const irParaTempo = (posicaoAtual / width) * musica.duration;
    musica.currentTime = irParaTempo;
}

function alterarVolume(event) 
{
    
    const locEvento = event.offsetX;
    const width = volumeGeral.clientWidth;

    if (voltouMute == true)
    {
        locEvento = 0;
        volumeAtual.style.setProperty("--volumeProgresso", `${(novoVolume / width) * 100}%`);
    }
    // Limita a largura máxima e mínima para evitar problemas visuais
    const novoVolume = Math.max(0, Math.min(locEvento, width));

    volumeAtual.style.setProperty("--volumeProgresso", `${(novoVolume / width) * 100}%`);
    musica.volume = novoVolume / width;
    if (musica.volume == 0) {
        iconVolume.classList.remove("bi-volume-down-fill");
        iconVolume.classList.remove("bi-volume-up-fill");
        iconVolume.classList.add("bi-volume-mute-fill");
    }

    else if (musica.volume > 0.7) {
        iconVolume.classList.remove("bi-volume-down-fill");
        iconVolume.classList.remove("bi-volume-mute-fill");
        iconVolume.classList.add("bi-volume-up-fill");
    }

    else {
        iconVolume.classList.remove("bi-volume-up-fill");
        iconVolume.classList.remove("bi-volume-mute-fill");
        iconVolume.classList.add("bi-volume-down-fill");
    }

}

let ultimoVolume = 0.5; // Inicializa com um valor padrão (pode ser ajustado conforme necessário)

function mute() {
    if (quantMute % 2 === 0) {
        // Se quantMute for par, significa que não está em mute, então mute o áudio
        iconVolume.classList.remove("bi-volume-down-fill");
        iconVolume.classList.remove("bi-volume-up-fill");
        iconVolume.classList.add("bi-volume-mute-fill");
        ultimoVolume = musica.volume; // Salva o último volume antes de mutar
        musica.volume = 0;
        
    } else {
        // Se quantMute for ímpar, significa que está em mute, então restaure o último volume
        musica.volume = ultimoVolume; // Restaura o último volume registrado
        voltouMute = true;
        alterarVolume(ultimoVolume)
    }

    // Atualiza o estado de mute
    quantMute += 1;
}


function curtida() {

    if (quantLikes % 2 == 0) {
        setTimeout(animacaoOn, 150);

        function animacaoOn() {
            like.classList.remove("bi-heart");
            like.classList.add("bi-heart-fill");
            like.style.setProperty("--cor", "#1DB954");
            quantLikes += 1;
        }

    }

    else {
        setTimeout(animacaoOff, 150);

        function animacaoOff() {
            like.classList.remove("bi-heart-fill");
            like.classList.add("bi-heart");
            like.style.setProperty("--cor", "#c0bfbf");
            quantLikes += 1;
        }
    }
}


function repetir() {

    const valorAtualIndex = index;
    if (quantRepeat % 2 == 0) {
        setTimeout(animacaoOn, 200);


        function animacaoOn() {
            repeat.style.setProperty("--cor", "#1DB954");
            while (quantRepeat % 2 == 0) {
                repetirOn = true;
                quantRepeat += 1;
            }
        }

    }

    else {
        setTimeout(animacaoOff, 150);
        repeat.style.setProperty("--cor", "#c0bfbf");
        function animacaoOff() {
            repetirOn = false;
            quantRepeat += 1;
        }
    }
}

function letras() {
    event.preventDefault();
    window.open(playlist[index].letra, "_blank");
}


function ponteiroBarraOn() {
    ponteiro.classList.add("bi-circle-fill");
}

function ponteiroBarraOff() {
    ponteiro.classList.remove("bi-circle-fill");
}

function ponteiro2VolumeOn() {
    ponteiro2.classList.add("bi-circle-fill")
}

function ponteiro2VolumeOff() {
    ponteiro2.classList.remove("bi-circle-fill")
}






/* Começo do código */

carregarMusica();
ponteiro.classList.remove("bi-circle-fill");
ponteiro2.classList.remove("bi-circle-fill");
musica.volume = 0.5;



play.addEventListener("click", playPause);
anterior.addEventListener("click", voltarMusica);
proximo.addEventListener("click", avancarMusica);
musica.addEventListener("timeupdate", barraConcluida);
barraGeral.addEventListener("click", irPara);
barraGeral.addEventListener("mouseover", ponteiroBarraOn);
barraGeral.addEventListener("mouseout", ponteiroBarraOff);
volumeGeral.addEventListener("click", alterarVolume);
volumeGeral.addEventListener("mouseover", ponteiro2VolumeOn);
volumeGeral.addEventListener("mouseout", ponteiro2VolumeOff);
iconVolume.addEventListener("click",mute);
like.addEventListener("click", curtida);
lyric.addEventListener("click", letras);
repeat.addEventListener("click", repetir);





