import React, { useState } from "react"
import axios from "axios";
import { baseURL } from "../utils/urls";
import { useForm } from "../hooks/useForm";
import styled from "styled-components";

const FormPost = ({getPosts}) => {
    const [form, onChange, resetForm] = useForm({text: '', title:''})
    const [showCardPost, setShowCardPost] = useState(false)

    const token = window.localStorage.getItem("token");

    const headers = {
        headers: { Authorization: token },
      };

    const createPost = async (e) => {
        e.preventDefault()
        try {
          await axios.post(`${baseURL}/posts`, form, headers)
          resetForm()
          setShowCardPost(false)
          alert('Post criado com sucesso!')
          getPosts()
        }
        catch (err) {
            alert('Algo inesperado aconteceu, por favor, tente novamente mais tarde!')
            console.log(err)
        }
      }

      return (
        <ContainerArea>
          <Cancel showCardPost={showCardPost} onClick={() => setShowCardPost(false)}>Cancelar</Cancel>
          <FormCreatePost showCardPost={showCardPost} onClick={() => setShowCardPost(true)} onSubmit={createPost}>
            <span>Criar post</span>
            <input required name='title' onChange={onChange} value={form.title} placeholder="Título do post" />
            {showCardPost &&
            <div>
              <textarea required name='text' onChange={onChange} value={form.text} placeholder="Escreva seu post" />
              <button>Post</button>

            </div>}
          </FormCreatePost>
        </ContainerArea>
      )
}

export default FormPost

const ContainerArea = styled.div`
position: relative;
`

const Cancel = styled.span`
display: ${props => props.showCardPost ? 'inline-block' : 'none'};
font-weight: 600;
font-size: .8rem;
position: absolute;
top: .675rem;
right: .675rem;
color: darkred;
cursor: pointer;
z-index: 1000;
`

const FormCreatePost = styled.form`
height: 4rem;
width: 500px;
display: flex;
flex-direction: column;
padding: 10px;
background-color: #fff;
margin-bottom: .625rem;
position: relative;
margin-bottom: ${prosp => prosp.showCardPost && '9.5rem'};

 > div {
  align-self: center;
  height: 200px;
  background-color: #fff;
  padding: 10px;
  width: 500px;
  display: flex;
  flex-direction: column;

  textarea, button {
  display: inline-block;
  }

  textarea {
    resize: none;
    max-width: 580px;
    height: 100px;
    margin-bottom: .5rem;
    padding: 0 .3rem;
  }

  button {
    border: 0;
    outline: none;
    background-color: #ADD45C;
    height: 1.75rem;
    cursor: pointer;

    &:hover{
      filter: brightness(.95)  
    }
  }
}

span {
  font-weight: 600;
  font-size: .8rem;
  margin-bottom: .1rem;
}

input {
  height: 1.75rem;
  padding: 0 .3rem;
}

textarea, button {
  display: none;
}
`
