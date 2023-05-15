/*import React, { useEffect, useRef, useState, useCallback } from "react";
import { db } from "../../services/firebase";
import * as C from "./styles";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../Message";
import { Howl, Howler } from "howler";
import som from "./ain.mp3";

const ChatBody = ({ chatId, currentUserEmail }) => {
  const [messagesRes] = useCollection(
    db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const refBody = useRef("");
  const audioRef = useRef(null);
  const [lastMessageId, setLastMessageId] = useState(null);
  const [lastMessagePlayed, setLastMessagePlayed] = useState(null);

  const handleMessageReceived = useCallback((message) => {
    if (message.user !== currentUserEmail && message.id !== lastMessagePlayed) {
      setLastMessagePlayed(message.id);
  
      const sound = new Howl({
        src: [som],
        volume: 1,
        onend: () => {
          // Descarrega o som após a reprodução
          sound.unload();
        },
      });
  
      sound.play();
    }
  }, [currentUserEmail, lastMessagePlayed]);
  

  useEffect(() => {
    Howler.volume(1);

    return () => {
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    if (messagesRes && messagesRes.docs.length > 0) {
      const lastMessage = messagesRes.docs[messagesRes.docs.length - 1]?.data();
      const newMessageId = lastMessage?.id;

      if (newMessageId && newMessageId !== lastMessageId) {
        handleMessageReceived(lastMessage);
        setLastMessageId(newMessageId);
      }
    }
  }, [messagesRes, currentUserEmail, lastMessageId, handleMessageReceived]);

  useEffect(() => {
    if (refBody.current.scrollHeight > refBody.current.offsetHeight) {
      refBody.current.scrollTop =
        refBody.current.scrollHeight - refBody.current.offsetHeight;
    }
  }, [messagesRes]);

  return (
    <C.Container ref={refBody}>
      {messagesRes?.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            message: message.data().message,
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))}
    </C.Container>
  );
};

export default ChatBody;


/*import React, { useEffect, useRef, useCallback } from "react";
import { db } from "../../services/firebase";
import * as C from "./styles";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../Message";
import { Howl, Howler } from 'howler';
import som from './ain.mp3';

const ChatBody = ({ chatId, currentUserEmail }) => {
  const [messagesRes] = useCollection(
    db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const refBody = useRef("");
  const audioRef = useRef(null);

  const handleMessageReceived = useCallback((message) => {
    if (message.user !== currentUserEmail) {
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current.unload();
      }
  
      audioRef.current = new Howl({
        src: [som],
        volume: 1,
        onplay: () => {
          setTimeout(() => {
            audioRef.current.stop();
            audioRef.current.unload();
          }, 3000); // Tempo de reprodução do som em milissegundos
        }
      });
  
      audioRef.current.play();
    }
  }, [currentUserEmail]);

  useEffect(() => {
    Howler.volume(1);

    return () => {
      if (audioRef.current) {
        audioRef.current.stop();
        audioRef.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    if (messagesRes && messagesRes.docs.length > 0) {
      const lastMessage = messagesRes.docs[messagesRes.docs.length - 1]?.data();
      handleMessageReceived(lastMessage);
    }
  }, [messagesRes, currentUserEmail, handleMessageReceived]);  

  useEffect(() => {
    if (refBody.current.scrollHeight > refBody.current.offsetHeight) {
      refBody.current.scrollTop =
        refBody.current.scrollHeight - refBody.current.offsetHeight;
    }
  }, [messagesRes]);

  return (
    <C.Container ref={refBody}>
      {messagesRes?.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            message: message.data().message,
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))}
    </C.Container>
  );
};

export default ChatBody;*/

import React, { useEffect, useRef } from "react";
import { db } from "../../services/firebase";
import * as C from "./styles";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../Message";

const ChatBody = ({ chatId }) => {
  const [messagesRes] = useCollection(
    db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const refBody = useRef("");

  useEffect(() => {
    if (refBody.current.scrollHeight > refBody.current.offsetHeight) {
      refBody.current.scrollTop =
        refBody.current.scrollHeight - refBody.current.offsetHeight;
    }
  }, [messagesRes]);

  return (
    <C.Container ref={refBody}>
      {messagesRes?.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            message: message.data().message,
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ))}
    </C.Container>
  );
};

export default ChatBody;