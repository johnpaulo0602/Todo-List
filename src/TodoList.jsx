// Importa o React, useState e useEffect do pacote react
import React, {useState, useEffect} from "react";
// Importa o estilo css do componente TodoList
import './TodoList.css'
// Importa a imagem utilizada quando a lista de tarefas está vazia
import imgListaVazia from './assets/checklist-bg.svg'

function TodoList() {

  // Carrega a lista armazenada no localstorage ou define uma lista vazia
  const listaStorage = localStorage.getItem('Lista');

  // Inicializa a lista e o novo item com a lista armazenada ou vazia
  const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
  const [novoItem, setNovoItem] = useState("");

  // Atualiza a lista armazenada no localstorage sempre que a lista for atualizada
  useEffect(()=>{
    localStorage.setItem('Lista', JSON.stringify(lista));
  },[lista])

  // Adiciona um novo item na lista
  function adicionaItem(form){
    form.preventDefault();
    if(!novoItem) {
      return;
    }
    setLista([...lista, {text: novoItem, isCompleted: false}]);
    setNovoItem("");
    document.getElementById('input-entrada').focus();
  }

  // Marca ou desmarca um item da lista
  function clicou(index){
    const listaAux = [...lista];
    listaAux[index].isCompleted = !listaAux[index].isCompleted;
    setLista(listaAux);
  }

  // Remove um item da lista
  function deleta(index){
    const listaAux = [...lista];
    listaAux.splice(index,1);
    setLista(listaAux);
  }

  // Remove todos os itens da lista
  function deletaTudo(){
    setLista([]);
  }

  return (
      <div className="">
          <h1>Lista de tarefas</h1>
          <form onSubmit={adicionaItem}>
              <input 
                id="input-entrada"
                type="text" 
                value={novoItem}
                onChange={(e) => { setNovoItem(e.target.value)}}
                placeholder="Adicione uma tarefa"
                autoComplete="off"
              />
              <button className="add" type="submit">
                <i className="fa fa-plus"></i>
              </button>
          </form>
          <div className="listaTarefas">
              {
                // Verifica se a lista está vazia e exibe a imagem correspondente
                lista.length < 1 
                ? 
                <img className="img-lista-vazia" src={imgListaVazia}/> 
                :
                // Mapeia os itens da lista para exibi-los
                lista.map((item, index)=>(
                <div
                  key={index} 
                  className={item.isCompleted ? "item completo" : "item"}
                >
                  <span onClick={()=>{clicou(index)}}>{item.text}</span>
                  <button onClick={()=>{deleta(index)}} className="del"><i className="fas fa-trash"></i></button>
                </div>
                ))

              }
              {
                // Verifica se a lista possui itens e exibe o botão de deletar todos
                lista.length > 0 &&
                <button onClick={()=>{deletaTudo()}} className="deleteAll">Deletar todas</button>
              }
          </div>
      </div>
      )
}

// Exporta o componente TodoList
export default TodoList