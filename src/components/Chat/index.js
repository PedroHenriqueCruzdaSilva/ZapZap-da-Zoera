import React from "react";
import ChatHeader from "../ChatHeader/index";
import * as C from "./styles";
import Default from "./../Default";
import ChatBody from "../ChatBody/index";
import ChatFooter from "../ChatFooter/index";

const Chat = ({ userChat, currentUserEmail }) => {
  if (!userChat) return <Default />;

  return (
    <C.Container>
      <ChatHeader photoURL={userChat?.photoURL} name={userChat?.name} />
      <ChatBody chatId={userChat?.chatId} currentUserEmail={currentUserEmail} />
      <ChatFooter chatId={userChat?.chatId} />
    </C.Container>
  );
};

export default Chat;