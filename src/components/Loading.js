import React from "react"
import styled from "styled-components"

const Loading = () => {

    return (
        <Main>
            <h1>Carregando...</h1>
        </Main>
    )
}

export default Loading

const Main = styled.main`
height: calc(100vh - 3.5rem);
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
position: fixed;
background-color: #f2f2f2;
bottom: 0;
left: 0;

h1 {
    z-index: 999;
}
`