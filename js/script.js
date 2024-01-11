const tituloMusica = document.querySelector("#titulo-musica");
const tagMusica = document.querySelector("#som");
const play = document.querySelector(".play");
tituloMusica.innerText = ("New Romantics (Taylor's Version)");

function tocarMusica()
{
    tagMusica.play();
}

play.addEventListener("click",tocarMusica);
