import './App.css'
import Form from './Form'
import {useState, useEffect} from 'react';
import Card from './Card';

export default function App() {
  const [mostrarPainel, setMostrarPainel] = useState(false);
  const [registros, setRegistros] = useState();
  const [editar, setEditar] = useState();
  const [paginacao, setPaginacao] = useState();
  const [paginaAtual, setPaginaAtual] = useState(1);

  const carregarDados = (status) => {
    fetch('http://localhost:3001/comments')
  .then((response) => response.json())
  .then((json) =>  {gerarCartoes(json); if(json.length != 0) gerarBotoes(json, status)});
  };

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    carregarDados();
  }, [paginaAtual]);


  const gerarCartoes = (dados) => {
    if(dados.length > 0) {
      let dadosCompletos = dados.map(dado => <Card id={dado.id} nome={dado.name} email={dado.email} mensagem={dado.body} deletar={deletarRegistro} editar={editarRegistro}/>)
      const valorInicial = (3 * paginaAtual) - 3;
      const valorFinal = 3*paginaAtual;
      const dadosExibidos = dadosCompletos.slice(valorInicial, valorFinal)
      setRegistros(dadosExibidos);

    }
    else setRegistros("Nenhum registro encontrado.")
  }

  const mudarPagina = (e) => {
    setPaginaAtual(e.target.value);
  }

  const gerarBotoes = (json, status) => {
    const itens = json.length;
    const quantidadeBotoes = Math.ceil(itens/3);
    if(status == 'modificado') {
      if(quantidadeBotoes < paginaAtual) setPaginaAtual(paginaAtual-1)
      else if(quantidadeBotoes > paginaAtual) setPaginaAtual(paginaAtual + 1) 
    }
    
    if(quantidadeBotoes == 0) setPaginacao(<button value={1} onClick={mudarPagina}>{1}</button>)
    else {
      const botoes = []
      for(let i=0; i<quantidadeBotoes; i++) {
        botoes.push(<button value={i+1} onClick={mudarPagina}>{i+1}</button>)
      }
      setPaginacao(botoes)
    }
  }




  const editarRegistro = (id, nome, email, mensagem) => {
    
    setEditar({id: id, nome: nome, email: email, mensagem: mensagem});
    setMostrarPainel(true)
  }

  
const deletarRegistro = (id) => {
  fetch(`http://localhost:3001/comments/${id}`, {
  method: 'DELETE',
})
.then(() => carregarDados('modificado'))
};

  const fecharPainel = (status) => {
    setMostrarPainel(!mostrarPainel);
    carregarDados(status);
  }


  return (
    <main>
      {registros}
      {typeof registros != 'string' && paginacao}
      <div className="botaoPainel" onClick={() => {setEditar(false); setMostrarPainel(!mostrarPainel)}}>+</div>
      {mostrarPainel && <Form statusEditar={editar} editar={editarRegistro}  fecharPainel={fecharPainel}/>}
    </main>
  )
}
