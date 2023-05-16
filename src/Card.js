import './Card.css';

export default function App(props) {
  const nome = props.nome;
  const email = props.email;
  const mensagem = props.mensagem;
  const id = props.id
  const editar = props.editar;
  const deletar = props.deletar;

  const apagar = () => {
    deletar(id)
  }

  const edit = () => {
    editar(id, nome, email, mensagem)
  }
  
  return (
    <div className="card">
      <div className="textosCartao">
        <p className="conteudoCartao nome">{nome}</p>
        <p className="conteudoCartao email">{email}</p>
        <p className="conteudoCartao mensagem">{mensagem}</p>
      </div>
      <div className="acoesCartao">
        <p className="acaoCartao editar"><i className="fa-solid fa-pen-to-square" onClick={edit}></i></p>
        <p className="acaoCartao excluir"><i className="fa-sharp fa-solid fa-trash" onClick={apagar}></i></p>
      </div>
    </div>
  )
}
