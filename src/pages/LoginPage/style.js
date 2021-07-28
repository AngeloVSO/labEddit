import styled from "styled-components"

// primaryColor = '#900C3F'
// primaryColorDark = '#5A0827'
// lightColor = '#f7f7f7'

export const Main = styled.main`
height: 100vh;
min-height: 500px;
display: flex;
align-items: center;
justify-content: center;
background: #f2f2f2;
padding: 0 1rem;
overflow: hidden;
position: relative;

/* ::before {
    content:'';
    height: 100%;
    width: 50%;
    right: 0;
    background-color: #f2f2f2;
    position: absolute;
} */
`

export const CardLogin = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #900C3F;
padding: 2rem;
min-width: 350px;
text-align: center;
color: #fff;

h1 {
    margin-bottom: 1rem;
}

form {
    display: flex;
    flex-direction: column;
    
    input, button {
        margin: .5rem 0;
    }

    input {
        width: 13rem;
        height: 2.5rem;
        border: 0;
        outline: none;
        padding: .5rem;
        :hover {
            filter: brightness(.95)
        }
    }

    button {
        height: 2rem;
        margin-bottom: 1rem;
        background-color: #ADD45C;
        border: 0;
        font-family: 'Lexend', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        margin-bottom: 1rem;

        :hover {
            filter: brightness(.95)
        }
    }
}

a {
    color: pink;
    
    :visited {
        color: pink;
    }
}
`