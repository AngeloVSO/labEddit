import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/urls";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import UpVote from "../../assets/images/up-arrow.svg";
import DownVote from "../../assets/images/down-arrow.svg";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { goToLogin } from "../../routes/cordinator";
import Header from "../../components/Header";
import { CardPost, Main, PostArea, ImgComment, Avatar, FormComment, CommentArea, CommentPost } from "./style"
import Warning from "../../components/Warning";

const PostPage = () => {
  const history = useHistory()

  const token = window.localStorage.getItem("token")

  const [post, setPost] = useState({});
  const [form, onChange, resetForm] = useForm({ text: "" });
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const headers = {
    headers: { Authorization: token },
  };

  const getPostDetail = (id) => {
    setLoading(true);
    axios
      .get(`${baseURL}/posts/${id}`, headers)
      .then((res) => {
        setLoading(false);
        setPost(res.data.post);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPostDetail(params.id);
  }, []);

  const creatComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/posts/${params.id}/comment`, form, headers);
      resetForm();
      getPostDetail(params.id);
      alert("Comentário gerado com sucesso!");
    } catch (err) {
      alert(
        "Nossos servidores estão passando por manutenção, tente novamente mias tarde!"
      );
      console.log(err);
    }
  };

  const upVote = async (id) => {
    const body = {
      direction: 1,
    };
    try {
      await axios.put(`${baseURL}/posts/${id}/vote`, body, headers);
      getPostDetail(params.id);
    } catch (err) {
      console.log(err);
    }
  };

  const downVote = async (id) => {
    const body = {
      direction: -1,
    };
    try {
      await axios.put(`${baseURL}/posts/${id}/vote`, body, headers);
      getPostDetail(params.id);
    } catch (err) {
      console.log(err);
    }
  };

  const upVoteComment = async (id, commentId) => {
    const body = {
      direction: 1,
    };
    try {
      await axios.put(`${baseURL}/posts/${id}/comment/${commentId}/vote`, body, headers);
      getPostDetail(params.id);
    } catch (err) {
      console.log(err);
    }
  };

  const downVoteComment = async (id, commentId) => {
    const body = {
      direction: -1,
    };
    try {
      await axios.put(`${baseURL}/posts/${id}/comment/${commentId}/vote`, body, headers);
      getPostDetail(params.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
  <>
    <Header />
    <Main>
      {token ?
      <PostArea>
      <p>
        Postado por <strong>{post.username}</strong> em{" "}
        {post.createdAt &&
          format(
            parseISO(
              new Date(post && post.createdAt)
                .toISOString()
                .slice(0, 10)
            ),
            "d MMM yyyy",
            {
              locale: ptBR,
            }
          )}
      </p>
      <>
        {!loading ? (
          <CardPost>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <div>
              <button onClick={() => upVote(params.id)}> <ImgComment src={UpVote} alt='Up arrow'/></button>{" "}
              {post.votesCount}
              <button onClick={() => downVote(params.id)}> <ImgComment src={DownVote} alt='Down arrow'/> </button>
            </div>
          </CardPost>
        ) : (
          <h2>Carregando...</h2>
        )}
      </>
      <FormComment onSubmit={creatComment}>
        <p>Deixe um comentário:</p>
        <textarea
          name="text"
          onChange={onChange}
          value={form.text}
          placeholder="Escreva seu comentário..."
        />
        <button>Comentar</button>
      </FormComment>
      <CommentArea>
        
        {post.comments &&
          post.comments.length > 0 &&
          post.comments.sort((a,b) => b.createdAt - a.createdAt).map((post) => {
            return (
              <>
                <p>Comentários:</p>
                <div>
                  <Avatar src="https://www.redditstatic.com/avatars/avatar_default_08_FF4500.png" />
                  <p><strong>{post.username}</strong></p>
                  <span> em {format(
                  parseISO(
                    new Date(post && post.createdAt).toISOString().slice(0, 10)), "d MMM yyyy", {
                    locale: ptBR,
                  }
                )}</span>
                </div>

                <div>
                  <p>{post.text}</p>
                </div>
                
                <div>
                 <button onClick={() => upVoteComment(params.id, post.id)}> <ImgComment src={UpVote} alt='Up arrow'/> </button>{" "}
                 {post.votesCount}
                 <button onClick={() => downVoteComment(params.id, post.id)}> <ImgComment src={DownVote} alt='Down arrow'/> </button>{" "}
                </div>
              </>
            );
          })}
      </CommentArea>
      </PostArea>
      : 
      <Warning />}
    </Main>
  </>
  );
};

export default PostPage;