let urlAPI = "https://public.franciscosensaulas.com/";
let botaoListarFuncionarios = document.getElementById("listarFuncionarios");
let tabelaFuncionarios = document.getElementById("tableFuncionarios");

function atribuirCliqueBotaoExcluir(){
    let botaoExcluir = document.getElementsByClassName("excluirFuncionario");

    Array.from(botaoExcluir).forEach((botao) => {
        botao.addEventListener("click", excluir);
    });
};

async function excluir(event) {
    event.preventDefault();
    const buttonClick = event.target;
    const id = buttonClick.getAttribute("data-id")
    const nome = buttonClick.getAttribute("data-nome");

    Swal.fire({
        title: `Deseja excluir ${nome}?`,
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
            excluirFuncionario(id);
        }
    });
}

async function listarFuncionarios() {
    let url = urlAPI + "api/v1/trabalho/funcionarios-detalhes"

    const resposta = await fetch(url);
    if (resposta.ok == false) {
        alert("Não foi encontrado nenhum colaborador!")
    }

    const funcionarios = await resposta.json();

    let tbody = tabelaFuncionarios.querySelector("tbody");
    tbody.innerHTML = "";

    funcionarios.forEach(funcionario => {
        const colunas = ` 
        <td>${funcionario.id}</td>
        <td>${funcionario.nome}</td>
        <td>${funcionario.cargo}</td>
        <td>${funcionario.salario}</td>
        <td>${funcionario.departamento}</td>
        <td>${funcionario.telefone}</td>
        <td>
        <a href="editar.html?id=${funcionario.id}" class="botao-editar"><i class="fas fa-pencil"></i> Editar</a>
        <button class="excluirFuncionario" 
            data-id=${funcionario.id}
            data-nome=${funcionario.nome}
            ><i class="fas fa-trash"></i> Excluir</button>
        </td>`
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;

        tbody.appendChild(linha);

        console.log(funcionario);
    });
    
    atribuirCliqueBotaoExcluir();
};


async function excluirFuncionario(id) {
    let url = `${urlAPI}api/v1/trabalho/funcionarios-detalhes/${id}`;
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
    listarFuncionarios();
}


botaoListarFuncionarios.addEventListener("click", listarFuncionarios);

listarFuncionarios();
