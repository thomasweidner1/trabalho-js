let urlAPI = "https://public.franciscosensaulas.com/";
let botaoCadastrar = document.getElementById("botaoSalvar");

async function cadastrarServico(event){
    event.preventDefault();

    let url = urlAPI + "api/v1/trabalho/servicos"
    let campoServico = document.getElementById("campoServico");
    let campoPreco = document.getElementById("campoPreco");
    let campoDuracao = document.getElementById("campoDuracao");

    let nome = campoServico.value;
    let preco = campoPreco.value;
    let duracao = campoDuracao.value;

    const dados ={
        nome:nome,
        preco:preco,
        duracao:duracao
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
        location.href = "/serviços/index.html"
    }
    
    console.log(dados);
    
}

botaoCadastrar.addEventListener("click", cadastrarServico);