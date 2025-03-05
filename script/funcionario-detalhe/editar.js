let urlAPI = "https://public.franciscosensaulas.com/";
let campoNome = document.getElementById("campoNome");
let campoCargo = document.getElementById("campoCargo");
let campoSalario = document.getElementById("campoSalario");
let campoDepartamento = document.getElementById("campoDepartamento");
let campoTelefone = document.getElementById("campoTelefone");
const botaoEditar = document.getElementById("botaoSalvar");
const params = new URLSearchParams(window.location.search);
const idParaEditar = params.get("id");

async function dadosFuncionario() {
    if (!idParaEditar) {
        alert("ID inválido!");
        window.location.href = "/index.html";
        return;
    }

    const urlFuncionario = `${urlAPI}api/v1/trabalho/funcionarios-detalhes/${idParaEditar}`;
    const resposta = await fetch(urlFuncionario);

    if (!resposta.ok) {
        alert("Colaborador não encontrado!");
        window.location.href = "/funcionario-detalhe/index.html";
        return;
    }

    const { nome, cargo, salario, departamento, telefone } = await resposta.json();
    campoNome.value = nome;
    campoCargo.value = cargo;
    campoSalario.value = salario;
    campoDepartamento.value = departamento;
    campoTelefone.value = telefone;
}

async function editar(event) {
    event.preventDefault();

    const dados = {
        nome: campoNome.value,
        cargo: campoCargo.value,
        salario: campoSalario.value,
        departamento: campoDepartamento.value,
        telefone: campoTelefone.value
    };

    const urlFuncionario = `${urlAPI}api/v1/trabalho/funcionarios-detalhes/${idParaEditar}`;
    const resposta = await fetch(urlFuncionario, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (!resposta.ok) {
        alert("Não foi possível alterar o cadastro!");
        return;
    }

    location.href = "/funcionario-detalhe/index.html";
}

botaoEditar.addEventListener("click", editar);

dadosFuncionario();
