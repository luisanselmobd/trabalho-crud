import './App.css'
import Form from './Form'
import {useState, useEffect} from 'react';
import Card from './Card';

export default function App() {
  const [mostrarPainel, setMostrarPainel] = useState(false);
  const [registros, setRegistros] = useState();
  const [editar, setEditar] = useState();
  const [paginacao, setPaginacao] = useState();
  const [valoresPagina, setValoresPaginas] = useState("0, 3")

  const carregarDados = () => {
    fetch('http://localhost:3001/comments')
  .then((response) => response.json())
  .then((json) => gerarCartoes(json));
  };

  useEffect(() => {
    carregarDados();
  }, []);


  const gerarCartoes = (dados) => {
    if(dados.length > 0) {
      let dadosCompletos = dados.map(dado => <Card id={dado.id} nome={dado.name} email={dado.email} mensagem={dado.body} deletar={deletarRegistro} editar={editarRegistro}/>)
      setRegistros(dadosCompletos)
    }
    else setRegistros("Nenhum registro encontrado.")
  }



  const editarRegistro = (id, nome, email, mensagem) => {
    
    setEditar({id: id, nome: nome, email: email, mensagem: mensagem});
    setMostrarPainel(true)
  }

  
const deletarRegistro = (id) => {
  fetch(`http://localhost:3001/comments/${id}`, {
  method: 'DELETE',
})
.then(() => carregarDados())
};

  const fecharPainel = () => {
    setMostrarPainel(!mostrarPainel);
    carregarDados();
  }

  return (
    <main>
      {registros}
      {paginacao}
      <div className="botaoPainel" onClick={() => {setEditar(false); setMostrarPainel(!mostrarPainel)}}>+</div>
      {mostrarPainel && <Form statusEditar={editar} editar={editarRegistro}  fecharPainel={fecharPainel}/>}
    </main>
  )
}
