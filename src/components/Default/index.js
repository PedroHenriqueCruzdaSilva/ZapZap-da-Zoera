import React from "react";
import * as C from "./styles";
import { MdMessage } from "react-icons/md";

const Default = () => {
  return (
    <C.Container>
      <MdMessage color="white" />
      <C.Title>Zap Zap da Zoera</C.Title>
      <C.Info>
        Agora você pode enviar e receber mensagens de Seus amigos durante as aulas sem precisar usar o celular.
      </C.Info>
    </C.Container>
  );
};

export default Default;