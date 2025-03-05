let urlAPI = "https://public.franciscosensaulas.com";
let tabelaTarefas = document.getElementById("tabela-tarefas");
let botaoConsultarTarefas = document.getElementById("consultar-tarefas")

function atribuirCliqueBotoesExcluir () {

    let botoesExcluir = document.getElementsByClassName("excluirTarefa");
    Array.from(botoesExcluir).forEach((botao) => {
        botao.addEventListener('click', excluir);
    });

}

async function excluir(evento) {
    evento.preventDefault();

    const botaoClique = evento.target;

    const nome = botaoClique.getAttribute("data-nome");
    const id = botaoClique.getAttribute("data-id");

    Swal.fire({
        title: `Deseja apagar o cadastro da tarefa '${nome}'?`,
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim apagar!",
        cancelButtonText: "Não",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            excluirTarefa(id);
        }
    });
    
}

async function excluirTarefa(id) {
    let url = `${urlAPI}/api/v1/trabalho/tarefas/${id}`
    console.log(url);
    

    const resposta = await fetch(url, {method: "DELETE"});
    if(resposta.ok == false){
        alert("Não foi possivel apagar");
        return;
    }

    Swal.fire({
        title: "Apagado!",
        text: "Tarefa removida com sucesso!",
        icon: "success"
    });
    
    consultarTarefas();

}


async function consultarTarefas() {
    let url = `${urlAPI}/api/v1/trabalho/tarefas`

    const resposta = await fetch(url);

    if (resposta.ok == false) {
        alert("Não foi possivel carregar os dados")
        return;
    }
    

    const tarefas = await resposta.json();

    let tbody = tabelaTarefas.querySelector("tbody");
    tbody.innerHTML = "";


    tarefas.forEach(tarefa => {
        const colunas = `
         <td>${tarefa.id}</td>
        <td>${tarefa.descricao}</td>
        <td>${tarefa.prioridade}</td>
        <td>${tarefa.horasEstimadas} hora</td>
        <td>
            <a href="editar.html?id=${tarefa.id}" class="botao-editar"><i class="fas fa-pencil"></i> Editar</a>
            <button class="excluirTarefa" 
                data-id="${tarefa.id}"
                data-nome="${tarefa.descricao}"
                ><i class="fas fa-trash"></i> Apagar
            </button>
        </td>`
        
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;

        tbody.appendChild(linha);

        console.log(tarefa);
   
    });


    atribuirCliqueBotoesExcluir();

}

botaoConsultarTarefas.addEventListener("click", consultarTarefas);

consultarTarefas();