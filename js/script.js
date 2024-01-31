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
const playVerde = document.querySelector(".playVerde");

/* Objetos das Músicas (Total = 12 Músicas) */

const newRomantics = 
{
    tituloMusica : 'New Romantics (Taylor\'s Version)',
    nomeArtista : 'Taylor Swift',
    file : 'newRomantics'
};

const articMonkeys = 
{
    tituloMusica : '505',
    nomeArtista : 'Artic Monkeys',
    file : '505'
};

const comeLittleCloser =
{
    tituloMusica : 'Come A Little Closer',
    nomeArtista : 'Cage The Elephant',
    file : 'comeLittleCloser'
};

const orphans =
{
    tituloMusica : 'Orphans',
    nomeArtista : 'Coldplay',
    file : 'orphans'
};

const teenagers =
{
    tituloMusica : 'Teenagers',
    nomeArtista : 'My Chemical Romance',
    file : 'teenagers'
};

const drown =
{
    tituloMusica : 'Drown',
    nomeArtista : 'Bring Me The Horizon',
    file : 'drown'
};


const unshaken =
{
    tituloMusica : 'Unshaken',
    nomeArtista : "D'Angelo",
    file : 'unshaken'
};

const rodaGigante = 
{
    tituloMusica : 'Roda Gigante',
    nomeArtista : 'Rodrigo Zin',
    file : 'rodaGigante'
};


const dejavu =
{
    tituloMusica : 'Dejavu',
    nomeArtista : 'Luan Santana, Ana Castela',
    file : 'dejavu'
};

const acordo =
{
    tituloMusica : 'Acordo',
    nomeArtista : 'Henrique e Juliano',
    file : 'acordo'
}

const mandeSinal =
{
    tituloMusica : 'Mande um Sinal',
    nomeArtista : 'Píxote',
    file : 'mandeSinal'
};

const merecoFeliz = 
{
    tituloMusica : 'Mereço Ser Feliz',
    nomeArtista : 'Mumuzinho',
    file : 'merecoFeliz'
};

const playlist = [newRomantics, articMonkeys, comeLittleCloser, orphans, teenagers, drown, unshaken, rodaGigante, dejavu, acordo, mandeSinal, merecoFeliz];
let index = 0;
let indexTocadas = [];

let estaTocando = false;
let mouse = false; /* Valor padrão da variável de verificação do estado atual do player de músicas */


/* Funções referentes ao player de música */ 

function playPause()
{
    if (estaTocando == false)
    {
        tocarMusica(); /* Se não está tocando = Comece a tocar*/
    }

    else
    {
        pausarMusica(); /* Se está tocando = Pare de tocar */ 
    }
}

function tocarMusica()
{
    play.classList.remove("bi-play-circle-fill"); /* Trocamos os icones removendo uma classe e colocando outra no lugar*/
    play.classList.add("bi-pause-circle-fill");
    musica.play();
    estaTocando = true;
    tocadas.push(index);
}

function pausarMusica()
{
    play.classList.add("bi-play-circle-fill");
    play.classList.remove("bi-pause-circle-fill");
    musica.pause();
    estaTocando = false;
}

function carregarMusica()
{
    tituloMusica.innerText = playlist[index].tituloMusica;
    nomeArtista.innerText = playlist[index].nomeArtista;
    capaAlbum.src = `/assets/img/${playlist[index].file}.jpg`;
    musica.src = `/assets/songs/${playlist[index].file}.mp3`;
}

function voltarMusica()
{
    if (index == 0)
    {
        index = playlist.length - 1;
    }

    else
    {
        index = index - 1;
    }

    carregarMusica();
    tocarMusica();
}

function avancarMusica()
{
    if (index == playlist.length - 1)
    {
        index = 0;
    }

    else
    {
        index = index + 1;
    }

    carregarMusica();
    tocarMusica();
}

function barraConcluida()
{
    const atual = (musica.currentTime*100 / musica.duration);
    barraProgreco.style.setProperty('--progresso', `${atual}%`);
    if (atual == 100)
    {
        avancarMusica();

    }
}

function irPara(event)
{
    const width = barraGeral.clientWidth;
    const posicaoAtual = event.offsetX;
    const irParaTempo = (posicaoAtual/width) * musica.duration;
    musica.currentTime = irParaTempo;
}

function alterarVolume(event)
{
    const width = volumeGeral.clientWidth;
    const locEvento = event.offsetX;
    const novoVolume = (locEvento * 100 / width);
    volumeAtual.style.setProperty('--volumeProgresso',`${novoVolume}%`);
    musica.volume = novoVolume/100;
    if (musica.volume == 0)
    {
        iconVolume.classList.remove("bi-volume-down-fill");
        iconVolume.classList.remove("bi-volume-up-fill");
        iconVolume.classList.add("bi-volume-mute-fill");
    }

    else if (musica.volume > 0.7)
    {
        iconVolume.classList.remove("bi-volume-down-fill");
        iconVolume.classList.remove("bi-volume-mute-fill");
        iconVolume.classList.add("bi-volume-up-fill");
    } 

    else
    {
        iconVolume.classList.remove("bi-volume-up-fill");
        iconVolume.classList.remove("bi-volume-mute-fill");
        iconVolume.classList.add("bi-volume-down-fill");
    }

}

function ponteiroBarraOn()
{
    ponteiro.classList.add("bi-circle-fill");
}

function ponteiroBarraOff()
{
    ponteiro.classList.remove("bi-circle-fill");
}

function ponteiro2VolumeOn()
{
    ponteiro2.classList.add("bi-circle-fill")
}

function ponteiro2VolumeOff()
{
    ponteiro2.classList.remove("bi-circle-fill")
}


/* Começo do código */ 

carregarMusica();
ponteiro.classList.remove("bi-circle-fill");
ponteiro2.classList.remove("bi-circle-fill");



play.addEventListener("click",playPause);
anterior.addEventListener("click",voltarMusica);
proximo.addEventListener("click",avancarMusica);
musica.addEventListener("timeupdate",barraConcluida);
barraGeral.addEventListener("click",irPara);
barraGeral.addEventListener("mouseover", ponteiroBarraOn);
barraGeral.addEventListener("mouseout",ponteiroBarraOff);
volumeGeral.addEventListener("click",alterarVolume);
volumeGeral.addEventListener("mouseover",ponteiro2VolumeOn);
volumeGeral.addEventListener("mouseout",ponteiro2VolumeOff);





/*ponteiro.addEventListener("mouseover",ponteiroOn);
ponteiro.addEventListener("mouseout",ponteiroOff);*/

musica.volume = 0.5;

