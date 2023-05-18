import React, { useState, useEffect } from 'react';
import * as C from './styles/app';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./services/firebase";
import Login from "./components/Login/index";
import Loading from "./components/Loading/index";
import Sidebar from './components/Sidebar/index';
import Chat from './components/Chat/index';
/*import { Howl } from 'howler';
import som from './assets/not.mp3';*/

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [userChat, setUserChat] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set({
        email: user.email,
        photoURL: user.photoURL,
        //mensagens: 0,
      });
      setCurrentUserEmail(user.email);
    }
  }, [user]);

  /*useEffect(() => {
    const sound = new Howl({
      src: [som],
      volume: 1,
      autoplay: false,
      loop: false,
      duration: 1500,
    });

    const handleNewMessage = async () => {
      const userRef = db.collection("users").doc(user.uid);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const { mensagens } = userDoc.data();

        if (mensagens > 0) {
          sound.play();
          userRef.update({ mensagens: 0 });
        }
      }
    };

    if (user) {
      db.collection("users").doc(user.uid).onSnapshot(() => {
        handleNewMessage();
      });
    }

    return () => {
      sound.unload();
    };
  }, [user]);*/

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return (
    <C.Container>
      <Sidebar setUserChat={setUserChat} userChat={userChat} />
      <Chat userChat={userChat} currentUserEmail={currentUserEmail} />
    </C.Container>
  );
};

export default App;

/*import React, { useState, useEffect } from 'react'
import * as C from './styles/app';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./services/firebase";
import Login from "./components/Login/index";
import Loading from "./components/Loading/index";
import Sidebar from './components/Sidebar/index';
import Chat from './components/Chat/index';


const App = () => {
    const [user, loading] = useAuthState(auth)
    const [userChat, setUserChat] = useState(null)
    const [currentUserEmail, setCurrentUserEmail] = useState(null);


    useEffect(() => {
        if(user) {
            db.collection("users").doc(user.uid).set({
                email: user.email,
                photoURL: user.photoURL,
                mensagens: 0,
            })
            setCurrentUserEmail(user.email)
        }
    }, [user])

    if(loading) return <Loading />

    if(!user) return <Login />

  return (
    <C.Container>
        <Sidebar setUserChat={setUserChat} userChat={userChat} />
        <Chat userChat={userChat} currentUserEmail={currentUserEmail} />
    </C.Container>
  )
}

export default App;*/