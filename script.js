const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const Nome = document.querySelector('#m-nome')
const Email = document.querySelector('#m-email')
const Telefone = document.querySelector('#m-phone')
const btnSalvar = document.querySelector('#btnSalvar')

let itens = []
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    Nome.value = itens[index].nome
    Email.value = itens[index].email
    Telefone.value = itens[index].telefone
    id = index
  } else {
    Nome.value = ''
    Email.value = ''
    Telefone.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.email}</td>
    <td>${item.telefone}</td>
    <td class="acao">
      <button onclick="editItem(${index})" class="edit">Editar</button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})" class="excluir">Excluir</button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (Nome.value == '' || Email.value == '' || Telefone.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = Nome.value
    itens[id].email = Email.value
    itens[id].telefone = Telefone.value
  } else {
    itens.push({'nome': Nome.value, 'email': Email.value, 'telefone': Telefone.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
