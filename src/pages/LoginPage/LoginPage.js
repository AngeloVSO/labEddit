import React from 'react'
import { useForm } from '../../hooks/useForm'
import { baseURL } from '../../utils/urls'
import axios from 'axios'
import { goToFeed } from '../../routes/cordinator'
import { useHistory } from 'react-router-dom'
import { CardLogin, Main } from './style'
import Loading from '../../components/Loading'

const LoginPage = () => {
    const [form, onChange] = useForm({email:'', password:''})
    
    const history = useHistory()

    const login = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${baseURL}/login`, form)
            window.localStorage.setItem('token', res.data.token)
            goToFeed(history)
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
                <form onSubmit={login}>
                    <input required type='email' name='email' value={form.email} onChange={onChange} placeholder='e-mail'/>
                    <input required type='password' name='password' value={form.password} onChange={onChange} placeholder='senha'/>
                    <button>Login</button>
                </form>
                <p>Caso ainda não seja cadastrado, acesse <a href='/signup'>aqui</a></p>
            </CardLogin>
        </Main>
    )
}

export default LoginPage