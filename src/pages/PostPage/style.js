import styled from "styled-components"

export const Main = styled.main`
height: calc(100vh - 3.5rem);
min-height: 500px;
display: flex;
justify-content: center;
align-items: center;
background: #f2f2f2;
padding: 0 1rem;
`

export const PostArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 1rem 0;
`;

export const CardPost = styled.div`
  width: 500px;
  min-height: 6rem;
  overflow-y: auto;
  background: #fff;
  padding: 0.5rem;
  margin-bottom: 1rem;

  p,
  h3 {
    margin-bottom: 0.5rem;
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
`;

export const ImgComment = styled.img`
  width: 1rem;
  margin: 0 0.5rem;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const FormComment = styled.form`
width: 500px;
display: flex;
flex-direction: column;
padding: 10px;
background-color: #fff;

textarea {
    resize: none;
    max-width: 500px;
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
`
export const CommentArea = styled.div`
background-color: #fff;
padding: 10px;

div {
    display: flex;
    align-items: center;
    margin: 1rem 0 .5rem 0;

    > p {
        margin: 0 .3rem;
    }

    > span {
        font-size: .775rem;
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
`