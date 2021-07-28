import axios from "axios";
import React, { useEffect, useState } from "react";
import FormPost from "../../components/FormPost";
import Header from "../../components/Header";
import MostCommented from "../../components/MostCommented";
import MostVoted from "../../components/MostVoted";
import Pagination from "../../components/Pagination";
import Posts from "../../components/Posts";
import Warning from "../../components/Warning";
import { baseURL } from "../../utils/urls";
import { ContainerArea, Main } from "./style";

const FeedPage = () => {
  
  const [posts, setPosts] = useState([])
  const [loading, setLoading] =useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  const token = window.localStorage.getItem("token");

  const headers = {
    headers: { Authorization: token },
  };

  useEffect(() => {
    token && getPosts()
  }, []);

  const getPosts = () => {
    setLoading(true)
    axios.get(`${baseURL}/posts`, headers)
    .then(res => {
      setPosts(res.data.posts)
      setLoading(false)
    })
    .catch(err => console.log(err));
  }

  const indexLastPost =  currentPage * postsPerPage
  const indexFirstPost = indexLastPost - postsPerPage
  const currentPosts = posts.sort((a,b) => b.createdAt - a.createdAt).slice(indexFirstPost, indexLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (<>
    <Header />
    <Main>
      {token ? (<>
          <ContainerArea>
            <FormPost getPosts={getPosts}/>

            <Posts posts={currentPosts} getPosts={getPosts} loading={loading} />
            
            <Pagination
            posts={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            />
          </ContainerArea>

          <ContainerArea>
            <MostCommented posts={posts} loading={loading} />
            <MostVoted posts={posts} loading={loading} />
          </ContainerArea>
          </>
        ) : (
          <Warning />
      )}
    </Main>
    </>
  );
};

export default FeedPage;
