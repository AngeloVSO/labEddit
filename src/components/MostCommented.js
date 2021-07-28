import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { goToPost } from "../routes/cordinator";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Chat from "../assets/images/chat.svg";

const MostCommented = ({ posts, loading }) => {
  const history = useHistory();

  if (loading) {
    return <h2>Carregando...</h2>;
  }

  return (
    <>
    <h3>Mais comentado no momento</h3>
      {posts.sort((a,b) => b.commentsCount - a.commentsCount).slice(0,5).map((post) => {
        return (
          <PostArea key={post.id}>
            
            <CardPost key={post.id} onClick={() => goToPost(history, post.id)}>
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
              <h5>{post.title}</h5>
              <div>
                {post.commentsCount} <ImgComment src={Chat} />{" "}
                {post.comments && post.comments.length > 1
                  ? "Comentários"
                  : "Comentário"}
              </div>
            </CardPost>
          </PostArea>
        );
      })}
    </>
  );
};

export default MostCommented;

const PostArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const CardPost = styled.div`
  margin: 0 auto;
  width: 400px;
  overflow-y: auto;
  cursor: pointer;
  background: #fff;
  padding: 0.5rem;
  font-size: .775rem;
  margin-bottom: 0.5rem; 
  p,h4 {
      margin-bottom: 0.5rem; 
  }

  div {
    margin-top: .3rem;
    display: flex;
    align-items: center;
  }
`;

const ImgComment = styled.img`
  width: 1rem;
  margin: 0 0.5rem;
`;
