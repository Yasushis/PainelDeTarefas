let inputUsuario = document.getElementById("input-tarefa")
inputDescricao = document.getElementById("input-descricao")
let buttonAdd = document.getElementById("button-tarefa")
let main = document.getElementById("tarefas-lista")
let contador = 0

function addTarefa() {

    let valor = inputUsuario.value;
    let valordesc = inputDescricao.value;

    if (((valor !== null) && (valor !== undefined) && (valor !== "")) && ((valordesc !== null) && (valordesc !== undefined) && (valordesc !== "")))  {

        ++ contador

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

    }
}

function deletarTarefa(id) {

    var tarefa = document.getElementById(id)
    tarefa.remove()

}

function marcarTarefa(id) {

    var item = document.getElementById(id)
    var classe = item.getAttribute("class")

    if (classe == "div-tarefa") {

        item.classList.add('div-tarefa-feita')

        var icone = document.getElementById("icone_" + id)
        icone.classList.remove('mdi-circle-outline')
        icone.classList.add('mdi-check-circle')
        icone.classList.add('tarefa-check-feita')
    }

    else {

        item.classList.remove('div-tarefa-feita')

        var icone = document.getElementById("icone_" + id)
        icone.classList.remove('mdi-check-circle')
        icone.classList.add('mdi-circle-outline')
        icone.classList.remove('tarefa-check-feita')

    }

}