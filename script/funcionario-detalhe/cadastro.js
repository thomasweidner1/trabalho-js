let urlAPI = "https://public.franciscosensaulas.com/";
let botaoCadastrar = document.getElementById("botaoSalvar");

const campoTelefone = document.getElementById("campoTelefone");
const mascara = {
    mask: "(00) 00000-0000"
}
const mask = IMask(campoTelefone, mascara);

async function cadastrarFuncionario(event){
    event.preventDefault();

    let url = urlAPI + "api/v1/trabalho/funcionarios-detalhes"
    let campoNome = document.getElementById("campoNome");
    let campoCargo = document.getElementById("campoCargo");
    let campoSalario = document.getElementById("campoSalario");
    let campoDepartamento = document.getElementById("campoDepartamento");
    let campoTelefone = document.getElementById("campoTelefone");

    let nome = campoNome.value;
    let cargo = campoCargo.value;
    let salario = campoSalario.value;
    let departamento = campoDepartamento.value;
    let telefone = campoTelefone.value;

    const dados ={
        nome:nome,
        cargo:cargo,
        salario:salario,
        departamento:departamento,
        telefone:telefone
    };

    let resposta = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });

    if(resposta.ok == false){
        alert("Não foi possível cadastrar!")
        return;
    }else{
        location.href = "/funcionario-detalhe/index.html"
    }
    
}

botaoCadastrar.addEventListener("click", cadastrarFuncionario);