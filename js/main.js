const apiKey = 'e531a884462e463aa1ccd0b3178ddcef';
let url = `https://newsapi.org/v2/everything?q=tesla&from=2022-08-14&sortBy=publishedAt&apiKey=${apiKey}`;
const main = document.querySelector('main');

window.addEventListener('load', e => {
    postNews();
    "use strict";
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
});

async function postNews(){
    const res = await fetch(url);
    const data = await res.json();
    main.innerHTML = data.articles.map(createArticle).join('\n');
}
function  createArticle(article){
    return `
      <div class="article">
      <a href="${article.url}" target="_blank">
         <img src="${article.urlToImage}" class="image" alt="${article.content}"/>
         <h2>${article.title}</h2>
         <p>${article.description}</p>
       </a>
   </div>
    `
}

let posicaoInicial;//variavel para capturar a posicao
const capturarLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('mapa');

const sucesso = (posicao) => {//callback de sucesso para captura da posicao
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;
};

const erro = (error) => {//callback de error (falha para captura de localizacao)
    let errorMessage;
    switch(error.code){
        case 0:
            errorMessage = "Erro desconhecido"
        break;
        case 1:
            errorMessage = "Permissão negada!"
        break;
        case 2:
            errorMessage = "Captura de posição indisponível!"
        break;
        case 3:
            errorMessage = "Tempo de solicitação excedido!" 
        break;
    }
    console.log('Ocorreu um erro: ' + errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);

    map.src = "http://maps.google.com/maps?q="+ posicaoInicial.coords.latitude+"," + posicaoInicial.coords.longitude +"&z=16&output=embed"

});