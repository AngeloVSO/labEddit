import React from "react"
import { useHistory } from "react-router"
import styled from "styled-components"
import { goToFeed, goToLogin } from "../routes/cordinator"
import Logout from "../assets/images/logout-icon.png"

const Header = () => {
    const history = useHistory()

    const logout = () => {
        window.localStorage.removeItem('token')
        goToLogin(history)
    }

    return (
        <HeaderArea>
            <h1 onClick={() => goToFeed(history)}>LabEddit</h1>

            {/* <div>
                Buscar
            </div> */}

            <nav>
                <button onClick={logout}>
                    <img src={Logout} alt='Logout'/>
                </button>
                {/* <div>
                    <p>
                        Perfil
                    </p>
                </div> */}
            </nav>
        </HeaderArea>
    )
}

export default Header

const HeaderArea = styled.header`
height: 3.5rem;
background-color: #900C3F;
position: sticky;
top: 0;
width: 100%;
padding: 0 2rem;
transition: .3s ease;
display: flex;
align-items: center;
justify-content: space-between;
color: #fff;

h1 {
    cursor: pointer;
}

nav{
    display: flex;

    > div {
        margin-left: 10px;
    }

    button {
        border: 0;
        background-color: transparent;
        cursor: pointer;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 600;

        &:hover {
            filter: brightness(.95)
        }

        &:active {
            transform: scale(1.4)
        }

        img {
            width: 35px;
        }
    }
}
`
