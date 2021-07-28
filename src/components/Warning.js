import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { goToLogin } from "../routes/cordinator";
import styled from "styled-components";

const Warning = () => {
  const history = useHistory();
  const [count, setCount] = useState(5);

  const countDown = () => {
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      goToLogin(history);
    }
  };

  return (
    <WarningContainer>
      <p>
        Você precisa está logado para acessar esta página. Faça seu login
        clicando <a href="/">aqui.</a>
      </p>
      <p>
        {countDown()}
        Ou aguarde que será redirecionado em {count} segundos.
      </p>
    </WarningContainer>
  );
};

export default Warning

const WarningContainer = styled.div`
  text-align: center;
  font-size: 1.5rem;
`;
