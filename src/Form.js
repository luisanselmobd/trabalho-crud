import './Form.css'

import {useImmer} from 'use-immer'
import {useEffect} from 'react'

export default function App(props) {
  
  const [form, setForm] = useImmer({nome: '', email: '', mensagem: ''});

  console.log(props)

  useEffect(() => {
    const infos = props.statusEditar;
    if (props.statusEditar != false) {
      setForm(draft => {
        draft['nome'] = infos.nome;
        draft['email'] = infos.email;
        draft['mensagem'] = infos.mensagem;
      });
    }
  }, [props.statusEditar]);
  
  const editarRegistro = (e) => {

    const id = props.statusEditar.id
    fetch(`http://localhost:3001/comments/${id}`, {
  method: 'PUT',
  body: JSON.stringify({
    name: form.nome,
    email: form.email,
    body: form.mensagem,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
    
  }


  const criarRegistro = (e) => {
    props.fecharPainel('modificado')
    fetch('http://localhost:3001/comments', {
  method: 'POST',
  body: JSON.stringify({
    name: form.nome,
    email: form.email,
    body: form.mensagem,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => props.fecharPainel('modificado'))

  }

  const mudarValoresForm = (e) => {
    const campo = e.target.name;
    const valor = e.target.value;
    setForm(draft => {
      draft[campo] = valor;
    })
  }

  const fecharPainel = (e) => {
    if(e.target.className == "painel") props.fecharPainel();
  }


  const enviarRespostas = () => {
    
    if (props.statusEditar != false) editarRegistro();
    else criarRegistro();
  }
  
   return (
    <div className="painel" onClick={fecharPainel}>
    <form className="form" onSubmit={enviarRespostas}>
      <div className="camposForm">
        <label htmlFor="nome">Nome: </label>
        <input required value={form.nome} onChange={mudarValoresForm} type="text" id="nome" name="nome"  minLength={2} placeholder="Fulano da Silva" />
      </div>
      <div className="camposForm">
        <label htmlFor="email">E-mail: </label>
        <input required value={form.email} onChange={mudarValoresForm} type="email" id="email" name="email"  pattern="^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$" placeholder="email@email.com"/>
      </div>
      <div className="camposForm">
        <label htmlFor="mensagem">Mensagem: </label>
        <textarea required minLength={10} maxLength={50} value={form.mensagem} onChange={mudarValoresForm} id="mensagem" name="mensagem"  placeholder="Meu comentário é..." rows={3} cols={50} />
      </div>
      <div className="camposForm">
        <input type="submit" value="Enviar"/>
      </div>
    </form>
    </div>
  )
}

