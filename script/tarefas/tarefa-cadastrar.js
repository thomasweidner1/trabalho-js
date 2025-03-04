let urlAPI = "https://public.franciscosensaulas.com";


let botaoSalvar = document.getElementById("botao-salvar");
botaoSalvar.addEventListener('click', salvar);



async function salvar(e) {
    e.preventDefault();
    let campoNome = document.getElementById("campoNome");
    let nome = campoNome.value
    if (nome.length < 5 ) {
        alert("Descrição da atividade deve conter no mínimo 5 caracteres")
    }
    
    if (nome.length > 30) {
        alert("Descrição da atividade deve conter no máximo 30 caracteres")
    }

    let campoPrioridade = document.getElementById("campoPrioridade");
    let prioridade = campoPrioridade.value;
    console.log(prioridade)

    let campoTempo = document.getElementById("campoTempo");
    let tempo = campoTempo.value;

    

    const dados = {
        descricao: nome,
        prioridade: prioridade,
        horasEstimadas: tempo
    }

    let url = `${urlAPI}/api/v1/trabalho/tarefas`;
    const resposta = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });
    
    if(resposta.ok == false){
        alert("Não foi possível cadastrar")
    }else{
        location.href = '/tarefas/index.html';
    }
}