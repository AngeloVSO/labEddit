import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { goToPost } from "../routes/cordinator";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import UpVote from "../assets/images/up-arrow.svg";
import DownVote from "../assets/images/down-arrow.svg";
import axios from "axios";
import { baseURL } from "../utils/urls";

const MostVoted = ({ posts, loading }) => {
  const history = useHistory();

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  const headers = {
    headers: { Authorization: window.localStorage.getItem("token") },
  };

  const upVote = async (id) => {
    const body = {
      direction: 1,
    };
    try {
      await axios.put(`${baseURL}/posts/${id}/vote`, body, headers);
      
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
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <Title>Mais votado no momento</Title>
      {posts.sort((a,b) => b.votesCount - a.votesCount).slice(0,5).map((post) => {
        return (
          <PostArea key={post.id}>
            
            <CardPost key={post.id}>
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
              <h5 onClick={() => goToPost(history, post.id)}>{post.title}</h5>
              <div>
                <button onClick={() => upVote(post.id)}> <ImgComment src={UpVote} alt='Up arrow'/></button>{" "}
                {post.votesCount}
                <button onClick={() => downVote(post.id)}> <ImgComment src={DownVote} alt='Down arrow'/> </button>
              </div>
            </CardPost>
          </PostArea>
        );
      })}
    </>
  );
};

export default MostVoted;

const Title = styled.h3`
margin-top: 1rem;
`

const PostArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const CardPost = styled.div`
  margin: 0 auto;
  width: 400px;
  overflow-y: auto;
  
  background: #fff;
  padding: 0.5rem;
  font-size: .775rem;
  margin-bottom: 0.5rem; 

  div {
    margin-top: .3rem;
    display: flex;
    align-items: center;
  }

  p,h5 {
      margin-bottom: 0.5rem; 
  }

  h5 {
    cursor: pointer;
  }

  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;

    :active {
      transform: scale(1.4)
    }
  }
`;

const ImgComment = styled.img`
  width: 1rem;
  margin: 0 0.5rem;
`;
