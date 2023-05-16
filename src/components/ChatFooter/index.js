import React, { useState } from "react";
import * as C from "./styles";
import { MdSend } from "react-icons/md";
import { auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";

const ChatFooter = ({ chatId }) => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");

  const usersInChatRef = db.collection("chats").doc(chatId);

  const handleSendMessage = (e) => {
    e.preventDefault();

    db.collection("chats")
      .doc(chatId)
      .get()
      .then((doc) => {
        const mensagemRAtual = doc.data().mensagemR || 0;
        const novaQuantidadeMensagens = mensagemRAtual + 1;

        // Atualiza a variável mensagemR no banco de dados
        db.collection("chats")
          .doc(chatId)
          .update({
            mensagemR: novaQuantidadeMensagens
          })
      })

    db.collection("chats")
      .doc(chatId)
      .collection("messages")
      .add({
        message: message,
        user: user.email,
        photoURL: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        TocadoJa: false,
      })
      .then(() => {
        // Atualizar o número de mensagens recebidas apenas para os usuários no chat (exceto o remetente)
        usersInChatRef.get().then((doc) => {
          const chatData = doc.data();
          const usersInChat = chatData.users.filter((email) => email !== user.email);
  
          db.collection("users")
            .where("email", "in", usersInChat)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const userRef = db.collection("users").doc(doc.id);
                const userData = doc.data();
  
                userRef.update({
                  mensagens: (userData.mensagens || 0) + 1,
                });
              });
            })
            .catch((error) => {
              console.error("Erro ao atualizar as mensagens recebidas:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Erro ao enviar a mensagem:", error);
      });

    setMessage("");
  };

  return (
    <C.Container>
      <C.Form onSubmit={handleSendMessage}>
        <C.Input
          placeholder="Mensagem"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <MdSend color="white" onClick={handleSendMessage} />
      </C.Form>
    </C.Container>
  );
};

export default ChatFooter;

/*import React, { useState } from "react";
import * as C from "./styles";
import { MdSend } from "react-icons/md";
import { auth, db } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";

const ChatFooter = ({ chatId }) => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();

    db.collection("chats").doc(chatId).collection("messages").add({
      message: message,
      user: user.email,
      photoURL: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      TocadoJa: false,
    });

    setMessage("");
  };

  return (
    <C.Container>
      <C.Form onSubmit={handleSendMessage}>
        <C.Input
          placeholder="Mensagem"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <MdSend color="white" onClick={handleSendMessage} />
      </C.Form>
    </C.Container>
  );
};

export default ChatFooter;*/