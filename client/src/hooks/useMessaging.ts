import { useState, useEffect } from "react";
import * as uuid from "uuid";
import io from "socket.io-client";
import { Message, Payload } from "../interfaces/message.interface";
import useCurrentUser from "./useCurrentUser";

const socket = io("http://localhost:3001");

export default function useMessaging() {
  const currentUser = useCurrentUser();

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const validateInput = () => {
    return currentUser.name.length > 0 && text.length > 0;
  };

  const sendMessage = () => {
    if (validateInput()) {
      const message: Payload = {
        name: currentUser.name,
        text,
      };

      socket.emit("newMessage", message);
      setText("");
    }
  };

  useEffect(() => {
    const addMessage = (message: Payload) => {
      const newMessage: Message = {
        id: uuid.v4(),
        name: message.name,
        text: message.text,
      };

      setMessages([...messages, newMessage]);
    };

    socket.on("message", (message: Payload) => {
      addMessage(message);
    });
  }, [messages]);

  return { text, setText, sendMessage, messages };
}
