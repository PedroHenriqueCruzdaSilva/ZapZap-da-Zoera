import React, { useState, useRef } from "react";
import * as C from "./styles";
import { MdSend, MdAttachFile } from "react-icons/md";
import { auth, db, storage } from "../../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";

const ChatFooter = ({ chatId }) => {
  const fileInputRef = useRef(null)
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const usersInChatRef = db.collection("chats").doc(chatId);

  const handleSendMessage = (e) => {
    if(message.length > 0) {
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
  }};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSendFile = () => {
    if (file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);

      fileRef.put(file).then(() => {
        fileRef.getDownloadURL().then((url) => {
          db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .add({
              message: `<img src="${url}" />`,
              user: user.email,
              photoURL: user.photoURL,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              TocadoJa: false,
            })
            .catch((error) => {
              console.error("Erro ao enviar o arquivo:", error);
            });
        });
      });
      setFile(null)
    }
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current.click();
  };

  return (
    <C.Container>
      <C.Form onSubmit={handleSendMessage}>
          <MdAttachFile 
            color="white" 
            size={20}
            onClick={handleOpenFilePicker} 
            style={{ cursor: "pointer" }}
          />
      <C.File
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        <MdSend color="white" onClick={handleSendFile} />
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