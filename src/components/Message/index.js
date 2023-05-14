import React from "react";
import * as C from "./styles";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const formattedTime = new Date(message?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <C.Container>
      <C.Line className={userLoggedIn?.email === user ? "me" : ""}>
        <C.Content>
          <C.Message>{message.message}</C.Message>
          <C.MessageDate>
            {formattedTime}
          </C.MessageDate>
        </C.Content>
      </C.Line>
    </C.Container>
  );
};

export default Message;
