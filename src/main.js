const app = document.querySelector(".app");
const loading = document.querySelector(".loading");
const addBtn = document.querySelector("#add");
const clearBtn = document.querySelector("#clear");
const labelTarefa = document.querySelector("#labelTarefa");
let tarefas = [];

addBtn.addEventListener("click", adicionarTarefa);
clearBtn.addEventListener("click", limparTarefas);

init();

//inicia o crud
function init() {
  loading.style.display = "flex";
  app.style.display = "none";
  setTimeout(() => {
    loading.style.display = "none";
    app.style.display = "flex";

    if (localStorage.lista) mostrarTarefas();
    else loading.style.display = "flex";
    loading.innerHTML = `<h3>Você ainda não possui nenhuma tarefa :(</h3>`;
  }, 1500);
}

//CREATE
function adicionarTarefa() {
  loading.style.display = "none";
  let item = document.querySelector("#tarefa");

  if (tarefas.includes(item.value) || item.value == "") {
    labelTarefa.style.color = "red";
    labelTarefa.innerHTML = "Erro, tarefa já existente ou inválida";
  } else {
    labelTarefa.style.color = "black";
    labelTarefa.innerHTML = "Insira aqui sua tarefa";
    tarefas.push(item.value);
    atualizarTarefas();
    item.value = "";
  }
}

//READ
function mostrarTarefas() {
  const lista = document.querySelector("#list");
  lista.innerHTML = "<tr><th>Tarefas</th></tr>";

  if (localStorage.getItem("lista")) {
    tarefas = JSON.parse(localStorage.getItem("lista"));
  }

  for (var i in tarefas) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    const div = document.createElement("div");

    tr.appendChild(td);
    td.appendChild(div);

    div.classList.add("tarefa");
    div.innerHTML = `
      <p>${tarefas[i]}</p>
      <i class="icone bi bi-trash3-fill" onclick="excluirTarefa(${i})"></i>
      <i class="icone bi bi-pencil-fill" onclick="editarTarefa(${i})"></i>
    `;
    lista.append(tr);
  }
}

function atualizarTarefas() {
  localStorage.setItem("lista", JSON.stringify(tarefas));
  mostrarTarefas();
}

//UPDATE
function editarTarefa(index) {
  let nova_tarefa = prompt("Digite o novo valor ta tarefa");

  if (nova_tarefa != null) {
    tarefas[index] = nova_tarefa;
    atualizarTarefas();
  }
}

//DELETE
function limparTarefas() {
  tarefas = [];
  localStorage.removeItem("lista");
  mostrarTarefas();
}

function excluirTarefa(index) {
  let confirmacao = confirm("Tem certeza que deseja excluir a tarefa?");

  if (confirmacao) {
    tarefas.splice(index, 1);
    atualizarTarefas();

    if (tarefas.length === 0) localStorage.removeItem("lista");
  }
}
