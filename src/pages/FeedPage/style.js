import styled from "styled-components"

export const Main = styled.main`
max-height: 100vh;
min-height: 500px;
display: flex;
align-items: center;
justify-content: center;
background: #f2f2f2;
padding: 0 1rem;
overflow: hidden;
`

export const ContainerArea = styled.div`
height: calc(100vh - 3.5rem);
overflow-y: auto;
padding: .5rem;
display: flex;
flex-direction: column;
margin: 0 1rem;
`