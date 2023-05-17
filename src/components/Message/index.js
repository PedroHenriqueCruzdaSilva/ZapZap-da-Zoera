import React from "react";
import * as C from "./styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const formattedTime = new Date(message?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const isImageMessage = message.message.includes('<img src="');

  const imageLink = isImageMessage ? message.message.match(/<img src="([^"]+)" \/>/)[1] : null;

  return (
    <C.Container>
      <C.Line className={userLoggedIn?.email === user ? "me" : ""}>
        <C.Content>
          <C.MessageUser>{user !== "samuraigamer100000@gmail.com" ? (user.split("@")[0]) : ("PH")}</C.MessageUser>
        {isImageMessage ? (
            <C.ImageContainer>
              <C.Image src={imageLink} alt={imageLink} />
            </C.ImageContainer>
          ) : (
            // Renderiza a mensagem normalmente
            <C.Message>{message.message}</C.Message>
          )}
          <C.MessageDate>
            {formattedTime}
          </C.MessageDate>
        </C.Content>
      </C.Line>
    </C.Container>
  );
};

export default Message;
