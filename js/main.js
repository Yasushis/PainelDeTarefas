let inputUsuario = document.getElementById("input-tarefa")
inputDescricao = document.getElementById("input-descricao")
let buttonAdd = document.getElementById("button-tarefa")
let main = document.getElementById("tarefas-lista")
let contador = 0
let total_tarefas = 0
let tarefas_feitas = 0
let tarefas_pendentes = 0

function addTarefa() {

    let valor = inputUsuario.value;
    let valordesc = inputDescricao.value;

    if (((valor !== null) && (valor !== undefined) && (valor !== "")) && ((valordesc !== null) && (valordesc !== undefined) && (valordesc !== "")))  {

        ++ contador
        ++total_tarefas
        ++tarefas_pendentes

        document.getElementById("tarefinhas").innerHTML = `Tarefas: ${total_tarefas} <br> Tarefas feitas: ${tarefas_feitas} <br> Tarefas pendentes: ${tarefas_pendentes}`

        let novaTarefa = `<div class="div-tarefa" id="${contador}">

        <div class="tarefa-titulo">
            <h1>${valor}</h1>
        </div>
        
        <div class="tarefa-itens">
            
            <div class="tarefa-check" onclick="marcarTarefa(${contador})">
                <i id="icone_${contador}" class="mdi mdi-circle-outline"></i>
            </div>

            <div class="tarefa-descricao">
                <p>${valordesc}</p>
            </div>

            <div class="tarefa-deletar">
                    <button onclick="deletarTarefa(${contador})" class="button-delete">
                        <i class="mdi mdi-delete"></i>
                    </button>
            </div>
    
        </div>

    </div>`

    main.innerHTML += novaTarefa
    inputUsuario.value = ""
    inputUsuario.focus()
    inputDescricao.value = ""

    }
}

function deletarTarefa(id) {

    var tarefa = document.getElementById(id)
    --total_tarefas
    var classe = tarefa.getAttribute("class")

    if (classe == "div-tarefa") {
        --tarefas_pendentes
    }
    else {
        --tarefas_feitas
    }
    tarefa.remove()
    document.getElementById("tarefinhas").innerHTML = `Tarefas: ${total_tarefas} <br> Tarefas feitas: ${tarefas_feitas} <br> Tarefas pendentes: ${tarefas_pendentes}`
}

function marcarTarefa(id) {

    var item = document.getElementById(id)
    var classe = item.getAttribute("class")

    if (classe == "div-tarefa") {

        item.classList.add('div-tarefa-feita')

        --tarefas_pendentes
        ++tarefas_feitas
        document.getElementById("tarefinhas").innerHTML = `Tarefas: ${total_tarefas} <br> Tarefas feitas: ${tarefas_feitas} <br> Tarefas pendentes: ${tarefas_pendentes}`

        var icone = document.getElementById("icone_" + id)
        icone.classList.remove('mdi-circle-outline')
        icone.classList.add('mdi-check-circle')
        icone.classList.add('tarefa-check-feita')
    }

    else {

        item.classList.remove('div-tarefa-feita')

        --tarefas_feitas
        ++tarefas_pendentes
        document.getElementById("tarefinhas").innerHTML = `Tarefas: ${total_tarefas} <br> Tarefas feitas: ${tarefas_feitas} <br> Tarefas pendentes: ${tarefas_pendentes}`

        var icone = document.getElementById("icone_" + id)
        icone.classList.remove('mdi-check-circle')
        icone.classList.add('mdi-circle-outline')
        icone.classList.remove('tarefa-check-feita')

    }

}