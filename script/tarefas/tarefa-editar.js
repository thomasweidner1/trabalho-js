const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");
const urlAPI = "https://public.franciscosensaulas.com"

async function consultarDadosTarefaPorId() {
    const urlParaConsultarTarefa = `${urlAPI}/api/v1/trabalho/tarefas/${idParaEditar}`
    console.log(urlParaConsultarTarefa);

    const resposta = await fetch(urlParaConsultarTarefa);

    if (resposta.ok == false) {
        alert("Tarefa não encontrada");
        window.location.href = "/tarefas/index.html";
        return;
    }

    const dadosTarefa = await resposta.json();
    console.log(dadosTarefa);

    campoNome.value = dadosTarefa.descricao;
    campoPrioridade.value = dadosTarefa.prioridade;
    campoTempo.value = dadosTarefa.horasEstimadas;
}

async function editar(evento) {
        evento.preventDefault();

        let nome = campoNome.value;
        let prioridade = campoPrioridade.value;
        let tempo = campoTempo.value;

        const dados = {
            descricao: nome,
            prioridade: prioridade,
            horasEstimadas: tempo
        }

        let url = `${urlAPI}/api/v1/trabalho/tarefas/${idParaEditar}`;
        const resposta = await fetch(url, {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(dados)
        });

        if (resposta.ok == false) {
            alert("Não foi possivel alterar")
        } else {
            location.href = '/tarefas/index.html';
        }

}

const botaoEditar = document.getElementById("botao-alterar");
botaoEditar.addEventListener("click", editar);

consultarDadosTarefaPorId();



    
