import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { goToPost } from "../routes/cordinator";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";
import { baseURL } from "../utils/urls";
import UpVote from "../assets/images/up-arrow.svg";
import DownVote from "../assets/images/down-arrow.svg";
import Chat from "../assets/images/chat.svg";
import Loading from "./Loading";

const Posts = ({ posts, loading, getPosts }) => {
  const history = useHistory();

  if (loading) {
    return <Loading />;
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
      getPosts()
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
      {posts.map((post) => {
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
              <h3>{post.title}</h3>
              <p>{post.text}</p>
            </CardPost>
            <VoteButtons>
              <div>
                <button onClick={() => upVote(post.id)}>
                  <img src={UpVote} />
                </button>

                <div>{post.votesCount}</div>

                <button onClick={() => downVote(post.id)}>
                  <img src={DownVote} />
                </button>
              </div>
              <div onClick={() => goToPost(history, post.id)}>
                {post.commentsCount} <ImgComment src={Chat} />{" "}
                {post.comments && post.comments.length > 1
                  ? "Comentários"
                  : "Comentário"}
              </div>
            </VoteButtons>
          </PostArea>
        );
      })}
    </>
  );
};

export default Posts;

const PostArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const CardPost = styled.div`
  margin: 0 auto;
  width: 500px;
  min-height: 6rem;
  overflow-y: auto;
  cursor: pointer;
  background: #fff;
  padding: 0.5rem;

  p,
  h3 {
    margin-bottom: 0.5rem;
  }
`;

const ImgComment = styled.img`
  width: 1rem;
  margin: 0 0.5rem;
`;

const VoteButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 1rem;
  padding: 0.5rem;

  > div {
    display: flex;
    align-items: center;

    :last-child {
      cursor: pointer;
    }

    > div {
      margin: 0 0.5rem;
      
    }
  }

  button {
    border: 0;
    height: 28px;
    width: 28px;
    background-color: transparent;
    cursor: pointer;

    :active {
      transform: scale(1.4)
    }
    
  }
  img {
    width: 18px;
    height: 18px;
  }
`;
