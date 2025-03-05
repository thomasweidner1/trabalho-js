let urlAPI = "https://public.franciscosensaulas.com";

const campoData = document.getElementById('campoData');
const mascara = {
    mask: "00/00/0000"
};
const mask = IMask(campoData, mascara);


let botaoSalvar = document.getElementById("botao-salvar");
botaoSalvar.addEventListener('click', salvar);


async function salvar(e) {
    e.preventDefault();
    let campoNome = document.getElementById("campoNome");
    let nome = campoNome.value
    if (nome.length < 3 ) {
        alert("Descrição do equipamento deve conter no mínimo 3 caracteres")
        return;
    }
    
    if (nome.length > 20) {
        alert("Descrição do equipamento deve conter no máximo 20 caracteres")
        return;
    }


    let campoTipo = document.getElementById("campoTipo");
    let tipo = campoTipo.value;

    let campoCusto = document.getElementById("campoCusto");
    let custo = campoCusto.value;

    let campoTecnico = document.getElementById("campoTecnico");
    let tecnico = campoTecnico.value;

    let campoData = document.getElementById("campoData");
    let data = campoData.value;
    if (data.length < 8 ) {
        alert("O campo deve seguir o seguinte padrão 01/01/1900")
        return;
    }
    
    if (data.length > 10) {
        alert("Descrição do equipamento deve conter no máximo 20 caracteres")
        return;
    }
    
    let campoStatus = document.getElementById("campoStatus");
    let status = campoStatus.value;

    const dados = {
        equipamento: nome,
        tipo: tipo,
        custo: custo,
        tecnico: tecnico,
        dataManutencao: data,
        status: status
    }

    let url = `${urlAPI}/api/v1/trabalho/manutencoes`;
    const resposta = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });
    
    if(resposta.ok == false){
        alert("Não foi possível cadastrar")
    }else{
        location.href = '/manutencao/index.html';
    }
}