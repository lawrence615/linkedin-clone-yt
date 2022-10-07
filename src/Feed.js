/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarIcon from "@mui/icons-material/CalendarViewDay";
import { serverTimestamp } from "firebase/firestore";
import FlipMove from "react-flip-move";

import InputOption from "./components/InputOption";
import Post from "./components/Post";
import {
  db,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "./fb";
import { selectUser } from "./features/userSlice";
import "./Feed.css";

function Feed() {
  const user = useSelector(selectUser);

  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //    async function fetchPosts() {
  //     const querySnapshot = await getDocs(collection(db, "posts"));
  //     setPosts(querySnapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})))
  //   }
  //   fetchPosts();
  // }, []); // Or [] if effect doesn't need props or state

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      // const data = [];
      // querySnapshot.forEach((doc) => {
      //   // console.log(doc.data())
      //   data.push({ id: doc.id, data: doc.data() });
      // });
      // console.log("data", data);
      // setPosts(data);

      setPosts(
        querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );

      // console.log("Current cities in CA: ", cities.join(", "));
    });
  }, []);

  const sendPost = (e) => {
    // console.log("input", input);
    e.preventDefault();

    try {
      const docRef = addDoc(collection(db, "posts"), {
        name: user.displayName,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl || "",
        timestamp: serverTimestamp(),
      });
      setInput("");
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      // console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
            />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#COCBCD" />
          <InputOption
            Icon={CalendarIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
