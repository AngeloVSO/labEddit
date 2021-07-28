import React from 'react'
import { useForm } from '../../hooks/useForm'
import { baseURL } from '../../utils/urls'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { goToLogin } from '../../routes/cordinator'
import styled from "styled-components"

const SignUpPage = () => {
    const [form, onChange] = useForm({email:'', password:'', username:''})
    
    const history = useHistory()

    const signUp = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${baseURL}/signup`, form)
            alert('Cadastro efetuado com sucesso! Você já pode fazer o login.')
            goToLogin(history)
        }
        catch (err) {
            alert(`${err.response.data.message}! Certifique-se que digitou os dados corretamente.`)
        }
    }

    return (
        <Main>
            <CardLogin>
                <h1>Bem vindo a Labeddit!</h1>
                <p>Para acessar nosso conteúdo, é necessário que você esteja logado.</p>
                <form onSubmit={signUp}>
                    <input required type='email' name='email' value={form.email} onChange={onChange} placeholder='e-mail'/>
                    <input required type='password' name='password' value={form.password} onChange={onChange} placeholder='senha'/>
                    <input required name='username' value={form.username} onChange={onChange} placeholder='nome de usuário'/>
                    <button>Login</button>
                </form>
                <p>Caso já passua um cadastro, acesse <a href='/'>aqui</a></p>
            </CardLogin>
        </Main>
    )
}

export default SignUpPage

const Main = styled.main`
height: 100vh;
min-height: 500px;
display: flex;
align-items: center;
justify-content: center;
background: #f2f2f2;
padding: 0 1rem;
overflow: hidden;
position: relative;
`

const CardLogin = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #900C3F;
padding: 2rem;
min-width: 350px;
text-align: center;
color: #fff;

h1 {
    margin-bottom: 1rem;
}

form {
    display: flex;
    flex-direction: column;
    
    input, button {
        margin: .5rem 0;
    }

    input {
        width: 13rem;
        height: 2.5rem;
        border: 0;
        outline: none;
        padding: .5rem;
        :hover {
            filter: brightness(.95)
        }
    }

    button {
        height: 2rem;
        margin-bottom: 1rem;
        background-color: #ADD45C;
        border: 0;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        margin-bottom: 1rem;

        :hover {
            filter: brightness(.95)
        }
    }

}

a {
    color: pink;
  }
`