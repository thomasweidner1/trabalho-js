let urlAPI = "https://public.franciscosensaulas.com/";
let campoNome = document.getElementById("campoNome");
let campoPreco = document.getElementById("campoPreco");
let campoDuracao = document.getElementById("campoDuracao");
const url = new URL (window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");

async function dadosServico(event) {
    
}