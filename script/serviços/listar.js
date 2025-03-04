let urlAPI = "https://public.franciscosensaulas.com/";
let botaoListarServicos = document.getElementById("listarServicos");
let tabelaServicos = document.getElementById("tableServicos");

function atribuirCliqueBotaoExcluir(){
    let botaoExcluir = document.getElementsByClassName("excluirServico");

    Array.from(botaoExcluir).forEach((botao) => {
        botao.addEventListener("click", excluir);
    });
};

async function excluir(evento) {
    evento.preventDefault();
    const buttonClick = evento.target;
    const id = buttonClick.getAttribute("data-id")
    const nome = buttonClick.getAttribute("data-nome");

    Swal.fire({
        title: `Deseja excluir o serviço ${nome}?`,
        text: "Esta ação não pode ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            excluirServico(id);
        }
    });
}

async function listarServicos() {
    let url = urlAPI + "api/v1/trabalho/servicos"

    const resposta = await fetch(url);
    if (resposta.ok == false) {
        alert("Não foi possível listar nenhum serviço!")
    }

    const servicos = await resposta.json();

    let tbody = tabelaServicos.querySelector("tbody");
    tbody.innerHTML = "";

    servicos.forEach(servico => {
        const colunas = ` 
        <td>${servico.id}</td>
        <td>${servico.nome}</td>
        <td>${servico.cnpj}</td>
        <td>
        <a href="editar.html?id=${servico.id}" class="botao-editar"><i class="fas fa-pencil"></i> Editar</a>
        <button class="excluirServico" 
            data-id=${servico.id}
            data-nome=${servico.nome}
            ><i class="fas fa-trash"></i> Excluir</button>
        </td>`
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;

        tbody.appendChild(linha);

        console.log(servico);
    });
    
    atribuirCliqueBotaoExcluir();
};


async function excluirServico(id) {
    let url = `${urlAPI}api/v1/trabalho/servicos/${id}`;
    console.log(url);

    const resposta = await fetch(url, {
        method: "DELETE"
    });
    if(resposta.ok == false){
        alert("Não foi possível excluir");
        return;
    }

    Swal.fire({
        title: "Excluído!",
        text: "Serviço excluído com sucesso",
        icon: "success"
    });
    listarServicos();
}


botaoListarServicos.addEventListener("click", listarServicos);

listarServicos();
