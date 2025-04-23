let inputUsuario = document.getElementById("input-tarefa")
let inputDescricao = document.getElementById("input-descricao")
let buttonAdd = document.getElementById("button-tarefa")
let main = document.getElementById("tarefas-lista")
let contador = 0
let contador_subtarefa = 0
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

        let novaTarefa = {
            id: contador,
            titulo: valor,
            descricao: valordesc,
            concluida: false,
            subtarefas: []
        };

        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push(novaTarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        criarElementoTarefa(novaTarefa);

    inputUsuario.value = ""
    inputUsuario.focus()
    inputDescricao.value = ""

    atualizarContadores();

    }
}

function criarElementoTarefa(tarefa) {
    let classeTarefa = tarefa.concluida ? "div-tarefa div-tarefa-feita" : "div-tarefa";
    let classeIcone = tarefa.concluida ? "mdi-check-circle tarefa-check-feita" : "mdi-circle-outline";

    let tarefaDiv = document.createElement("div");
    tarefaDiv.className = classeTarefa;
    tarefaDiv.id = tarefa.id;

    tarefaDiv.innerHTML = `
        <div class="tarefa-titulo">
            <h1>${tarefa.titulo}</h1>
        </div>
        
        <div class="tarefa-itens">
            <div class="tarefa-check" onclick="marcarTarefa(${tarefa.id})">
                <i id="icone_${tarefa.id}" class="mdi ${classeIcone}"></i>
            </div>
            <div class="tarefa-descricao">
                <p>${tarefa.descricao}</p>
            </div>
            <div class="tarefa-deletar">
                <button onclick="deletarTarefa(${tarefa.id})" class="button-delete">
                    <i class="mdi mdi-delete"></i>
                </button>
            </div>
        </div>

        <div class="subtarefa-itens" id="area-subtarefa_${tarefa.id}">
            ${tarefa.subtarefas.map((sub, i) => `
                <div class="div-subtarefa ${sub.concluida ? 'div-subtarefa-feita' : ''}" id="subtarefa_${tarefa.id}_${i}">
                    <div class="subtarefa-check" onclick="marcarSubtarefa('${tarefa.id}_${i}')">
                        <i id="iconeSubtarefa_${tarefa.id}_${i}" class="mdi ${sub.concluida ? 'mdi-check-circle subtarefa-check-feita' : 'mdi-circle-outline'}"></i>
                    </div>
                    <div class="subtarefa-titulo"><p>${sub.texto}</p></div>
                    <div class="subtarefa-deletar">
                        <button onclick="deletarSubtarefa('${tarefa.id}_${i}')" class="button-delete">
                            <i class="mdi mdi-delete"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="tarefa-subtarefa" id="tarefa-subtarefa_${tarefa.id}">
            <button class="button-subtarefa" id="adicionar-subtarefa_${tarefa.id}" onclick="adicionarSubtarefa(${tarefa.id})">
                Adicionar subtarefa
            </button>
        </div>
    `;

    main.appendChild(tarefaDiv);
}



function addSubtarefa(id) {
    let valorsubtarefa = document.getElementById(`input-subtarefa_${id}`).value;

    if (valorsubtarefa) {
        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        let index = tarefas.findIndex(t => t.id == id); 
        if (index === -1) return;

        let novaSubtarefaObj = {
            texto: valorsubtarefa,
            concluida: false
        };

        tarefas[index].subtarefas.push(novaSubtarefaObj);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        let novaIndex = tarefas[index].subtarefas.length - 1;

        let novaSubtarefaHTML = `
            <div class="div-subtarefa" id="subtarefa_${id}_${novaIndex}">
                <div class="subtarefa-check" onclick="marcarSubtarefa('${id}_${novaIndex}')">
                    <i id="iconeSubtarefa_${id}_${novaIndex}" class="mdi mdi-circle-outline"></i>
                </div>
                <div class="subtarefa-titulo">
                    <p>${valorsubtarefa}</p>
                </div>
                <div class="subtarefa-deletar">
                    <button onclick="deletarSubtarefa('${id}_${novaIndex}')" class="button-delete">
                        <i class="mdi mdi-delete"></i>
                    </button>
                </div>
            </div>`;

        document.getElementById(`area-subtarefa_${id}`).innerHTML += novaSubtarefaHTML;

        document.getElementById(`input-subtarefa_${id}`).remove();
        document.getElementById(`button-subtarefa_${id}`).remove();

        let adicionar_subtarefa = document.getElementById(`tarefa-subtarefa_${id}`);
        adicionar_subtarefa.innerHTML = `<button class="button-subtarefa" id="adicionar-subtarefa_${id}" onclick="adicionarSubtarefa(${id})">Adicionar subtarefa</button>`;
    }
}



function adicionarSubtarefa(id) {

    var botao_tarefa = document.getElementById(`adicionar-subtarefa_${id}`)
    botao_tarefa.insertAdjacentHTML('beforebegin', `<input type="text" class="input-sub" placeholder="Subtarefa" id="input-subtarefa_${id}">
        <button class="button2-subtarefa" id="button-subtarefa_${id}" onclick="addSubtarefa(${id})">+</button>`)
    botao_tarefa.remove()

}

function deletarTarefa(id) {
    let tarefa = document.getElementById(id);
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    let index = tarefas.findIndex(t => t.id === id);
    if (index !== -1) {
        let removida = tarefas.splice(index, 1)[0];

        --total_tarefas;
        if (removida.concluida) {
            --tarefas_feitas;
        } else {
            --tarefas_pendentes;
        }

        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    tarefa.remove();
    document.getElementById("tarefinhas").innerHTML =
        `Tarefas: ${total_tarefas} <br> Tarefas feitas: ${tarefas_feitas} <br> Tarefas pendentes: ${tarefas_pendentes}`;
    
    atualizarContadores();
}


function deletarSubtarefa(id) {
    const [tarefaId, subIndex] = id.split('_');
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    let tarefaIndex = tarefas.findIndex(t => t.id == tarefaId);
    if (tarefaIndex === -1) return;

    tarefas[tarefaIndex].subtarefas.splice(subIndex, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    document.getElementById("subtarefa_" + id).remove();
    carregarTarefas();
}



function marcarSubtarefa(id) {
    let subtarefa = document.getElementById("subtarefa_" + id);
    let icone = document.getElementById("iconeSubtarefa_" + id);

    let [tarefaId, subtarefaIndex] = id.split('_');

    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    let tarefaIndex = tarefas.findIndex(t => t.id == tarefaId);

    if (tarefaIndex === -1) return;

    let tarefa = tarefas[tarefaIndex];
    let sub = tarefa.subtarefas[subtarefaIndex];

    if (!sub) return;

    if (!sub.concluida) {
        subtarefa.classList.add("div-subtarefa-feita");
        icone.classList.remove('mdi-circle-outline');
        icone.classList.add('mdi-check-circle', 'subtarefa-check-feita');
        sub.concluida = true;
    } else {
        subtarefa.classList.remove("div-subtarefa-feita");
        icone.classList.remove('mdi-check-circle', 'subtarefa-check-feita');
        icone.classList.add('mdi-circle-outline');
        sub.concluida = false;
    }

    tarefas[tarefaIndex].subtarefas[subtarefaIndex] = sub;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}



function marcarTarefa(id) {
    let item = document.getElementById(id);
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    let index = tarefas.findIndex(t => t.id === id);
    if (index === -1) return;

    if (!tarefas[index].concluida) {
        tarefas[index].concluida = true;
        item.classList.add('div-tarefa-feita');
        --tarefas_pendentes;
        ++tarefas_feitas;

        let icone = document.getElementById("icone_" + id);
        icone.classList.remove('mdi-circle-outline');
        icone.classList.add('mdi-check-circle');
        icone.classList.add('tarefa-check-feita');
    } else {
        tarefas[index].concluida = false;
        item.classList.remove('div-tarefa-feita');
        --tarefas_feitas;
        ++tarefas_pendentes;

        let icone = document.getElementById("icone_" + id);
        icone.classList.remove('mdi-check-circle');
        icone.classList.add('mdi-circle-outline');
        icone.classList.remove('tarefa-check-feita');
    }

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    document.getElementById("tarefinhas").innerHTML =
        `Tarefas: ${total_tarefas} <br> Tarefas feitas: ${tarefas_feitas} <br> Tarefas pendentes: ${tarefas_pendentes}`;

    atualizarContadores();
}

function carregarTarefas() {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    total_tarefas = 0;
    tarefas_pendentes = 0;
    tarefas_feitas = 0;

    main.innerHTML = "";

    for (let tarefa of tarefas) {
        ++total_tarefas;
        tarefa.concluida ? ++tarefas_feitas : ++tarefas_pendentes;

        let classe = tarefa.concluida ? "div-tarefa div-tarefa-feita" : "div-tarefa";
        let iconeClasse = tarefa.concluida ? "mdi-check-circle tarefa-check-feita" : "mdi-circle-outline";

        let subtarefasHTML = tarefa.subtarefas.map((sub, i) => `
            <div class="div-subtarefa ${sub.concluida ? 'div-subtarefa-feita' : ''}" id="subtarefa_${tarefa.id}_${i}">
                <div class="subtarefa-check" onclick="marcarSubtarefa('${tarefa.id}_${i}')">
                    <i id="iconeSubtarefa_${tarefa.id}_${i}" class="mdi ${sub.concluida ? 'mdi-check-circle subtarefa-check-feita' : 'mdi-circle-outline'}"></i>
                </div>
                <div class="subtarefa-titulo"><p>${sub.texto}</p></div>
                <div class="subtarefa-deletar">
                    <button onclick="deletarSubtarefa('${tarefa.id}_${i}')" class="button-delete">
                        <i class="mdi mdi-delete"></i>
                    </button>
                </div>
            </div>
        `).join('');

        let htmlTarefa = `
            <div class="${classe}" id="${tarefa.id}">
                <div class="tarefa-titulo"><h1>${tarefa.titulo}</h1></div>
                <div class="tarefa-itens">
                    <div class="tarefa-check" onclick="marcarTarefa(${tarefa.id})">
                        <i id="icone_${tarefa.id}" class="mdi ${iconeClasse}"></i>
                    </div>
                    <div class="tarefa-descricao"><p>${tarefa.descricao}</p></div>
                    <div class="tarefa-deletar">
                        <button onclick="deletarTarefa(${tarefa.id})" class="button-delete">
                            <i class="mdi mdi-delete"></i>
                        </button>
                    </div>
                </div>
                <div class="subtarefa-itens" id="area-subtarefa_${tarefa.id}">
                    ${tarefa.subtarefas.map((sub, i) => `
                        <div class="div-subtarefa ${sub.concluida ? 'div-subtarefa-feita' : ''}" id="subtarefa_${tarefa.id}_${i}">
                            <div class="subtarefa-check" onclick="marcarSubtarefa('${tarefa.id}_${i}')">
                                <i id="iconeSubtarefa_${tarefa.id}_${i}" class="mdi ${sub.concluida ? 'mdi-check-circle subtarefa-check-feita' : 'mdi-circle-outline'}"></i>
                            </div>
                            <div class="subtarefa-titulo"><p>${sub.texto}</p></div>
                            <div class="subtarefa-deletar">
                                <button onclick="deletarSubtarefa('${tarefa.id}_${i}')" class="button-delete">
                                    <i class="mdi mdi-delete"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="tarefa-subtarefa" id="tarefa-subtarefa_${tarefa.id}">
                    <button class="button-subtarefa" id="adicionar-subtarefa_${tarefa.id}" onclick="adicionarSubtarefa(${tarefa.id})">
                        Adicionar subtarefa
                    </button>
                </div>
            </div>
        `;

        main.innerHTML += htmlTarefa;
        atualizarContadores();
    }

    document.getElementById("tarefinhas").innerHTML =
        `Tarefas: ${total_tarefas} <br> Tarefas feitas: ${tarefas_feitas} <br> Tarefas pendentes: ${tarefas_pendentes}`;
}

function atualizarContadores() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    total_tarefas = tarefas.length;
    tarefas_feitas = tarefas.filter(t => t.concluida).length;
    tarefas_pendentes = total_tarefas - tarefas_feitas;

    document.getElementById("tarefinhas").innerHTML =
        `Tarefas: ${total_tarefas} <br> Tarefas feitas: ${tarefas_feitas} <br> Tarefas pendentes: ${tarefas_pendentes}`;
}


function filtrarTarefas(filtro) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    main.innerHTML = "";

    let tarefasFiltradas = [];

    if (filtro === "feitas") {
        tarefasFiltradas = tarefas.filter(t => t.concluida);
    } else if (filtro === "pendentes") {
        tarefasFiltradas = tarefas.filter(t => !t.concluida);
    } else {
        tarefasFiltradas = tarefas;
    }

    for (let tarefa of tarefasFiltradas) {
        criarElementoTarefa(tarefa);
    }

    atualizarContadores();

    const inputSection = document.getElementById("input-section");
    if (filtro === "todas") {
        inputSection.style.display = "block";
    } else {
        inputSection.style.display = "none";
    }
}





window.onload = function() {
    
    carregarTarefas()

};

function exibirInputArea(exibir) {
    let area = document.getElementById("input-area");
    area.style.display = exibir ? "block" : "none";
}