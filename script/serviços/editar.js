let urlAPI = "https://public.franciscosensaulas.com/";
let campoNome = document.getElementById("campoServico");
let campoPreco = document.getElementById("campoPreco");
let campoDuracao = document.getElementById("campoDuracao");
const botaoEditar = document.getElementById("botaoSalvar");
const params = new URLSearchParams(window.location.search);
const idParaEditar = params.get("id");

async function dadosServico() {
    if (!idParaEditar) {
        alert("ID inválido!");
        window.location.href = "/index.html";
        return;
    }

    const urlServico = `${urlAPI}api/v1/trabalho/servicos/${idParaEditar}`;
    const resposta = await fetch(urlServico);

    if (!resposta.ok) {
        alert("Serviço não encontrado!");
        window.location.href = "/index.html";
        return;
    }

    const { nome, preco, duracao } = await resposta.json();
    campoNome.value = nome;
    campoPreco.value = preco;
    campoDuracao.value = duracao;
}

async function editar(event) {
    event.preventDefault();

    const dados = {
        nome: campoNome.value.trim(),
        preco: campoPreco.value,
        duracao: campoDuracao.value
    };

    const urlServico = `${urlAPI}api/v1/trabalho/servicos/${idParaEditar}`;
    const resposta = await fetch(urlServico, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
        alert("Não foi possível alterar o serviço!");
        return;
    }

    location.href = "/serviços/index.html";
}

botaoEditar.addEventListener("click", editar);

dadosServico();
