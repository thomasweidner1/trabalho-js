let urlAPI = "https://public.franciscosensaulas.com";
let tabelaManutencoes = document.getElementById("tabela-manutencoes");
let botaoConsultarManutencoes = document.getElementById("consultar-manutencoes")

function atribuirCliqueBotoesExcluir () {

    let botoesExcluir = document.getElementsByClassName("excluirManutencoes");
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
    let url = `${urlAPI}/api/v1/trabalho/manutencao/${id}`
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
    
    consultarManutencoes();

}


async function consultarManutencoes() {
    let url = `${urlAPI}/api/v1/trabalho/manutencoes`

    const resposta = await fetch(url);

    if (resposta.ok == false) {
        alert("Não foi possivel carregar os dados")
        return;
    }
    

    const Manutencoes = await resposta.json();

    let tbody = tabelaManutencoes.querySelector("tbody");
    tbody.innerHTML = "";


    Manutencoes.forEach(manutencao => {
        const colunas = `
         <td>${manutencao.id}</td>
        <td>${manutencao.equipamento}</td>
        <td>${manutencao.tipo}</td>
        <td>${manutencao.custo}</td>
        <td>${manutencao.tecnico}</td>
        <td>${manutencao.dataManutencao}</td>
        <td>${manutencao.status}</td>
        <td>
            <a href="editar.html?id=${manutencao.id}" class="btn btn-warning"><i class="fas fa-pencil"></i> Editar</a>
            <button 
                class="btn btn-danger excluirManutencoes" 
                data-id="${manutencao.id}"
                data-nome="${manutencao.equipamento}"
                ><i class="fas fa-trash"></i> Apagar
            </button>
        </td>`
        
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;

        tbody.appendChild(linha);

        console.log(manutencao);
   
    });


    atribuirCliqueBotoesExcluir();

}

botaoConsultarManutencoes.addEventListener("click", consultarManutencoes);

consultarManutencoes();