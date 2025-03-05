const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");
const urlAPI = "https://public.franciscosensaulas.com"

const campoData = document.getElementById('campoData');
const mascara = {
    mask: "00/00/0000"
};
const mask = IMask(campoData, mascara);


async function consultarDadosManutencaoPorId() {
    const urlParaConsultarManutencao = `${urlAPI}/api/v1/trabalho/manutencoes/${idParaEditar}`
    console.log(urlParaConsultarManutencao);

    const resposta = await fetch(urlParaConsultarManutencao);

    if (resposta.ok == false) {
        alert("Tarefa não encontrada");
        window.location.href = "/manutencao/index.html";
        return;
    }

    const dadosManutencao = await resposta.json();
    console.log(dadosManutencao);

    campoNome.value = dadosManutencao.equipamento;
    campoTipo.value = dadosManutencao.tipo;
    campoCusto.value = dadosManutencao.custo;
    campoTecnico.value = dadosManutencao.tecnico;
    campoData.value = dadosManutencao.dataManutencao;
    campoStatus.value = dadosManutencao.status;

}

async function editar(evento) {
        evento.preventDefault();

        let nome = campoNome.value;
        let tipo = campoTipo.value;
        let custo = campoCusto.value;
        let tecnico = campoTecnico.value;
        let data = campoData.value;
        let status = campoStatus.value;

        const dados = {
            equipamento: nome,
            tipo: tipo,
            custo: custo,
            tecnico: tecnico,
            dataManutencao: data,
            status: status
        }

        let url = `${urlAPI}/api/v1/trabalho/manutencoes/${idParaEditar}`;
        const resposta = await fetch(url, {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(dados)
        });

        if (resposta.ok == false) {
            alert("Não foi possivel alterar")
        } else {
            location.href = '/manutencao/index.html';
        }

}

const botaoEditar = document.getElementById("botao-alterar");
botaoEditar.addEventListener("click", editar);

consultarDadosManutencaoPorId();