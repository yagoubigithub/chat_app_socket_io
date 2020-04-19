import React, { useState, useEffect } from "react";

import queryString from "query-string";
import io from "socket.io-client";
let socket;
const Chat = ({ location }) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);
  return <div>chat</div>;
};
export default Chat;
