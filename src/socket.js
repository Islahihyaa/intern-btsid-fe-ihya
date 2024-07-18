import { io } from "socket.io-client";

const URL = "http://localhost:8000";

const socket = io(URL, {
  autoConnect: false,
  auth: {
    token: localStorage.getItem("token"),
  },
});

socket.on("connect", () => {
  console.log("Connected to socket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from socket server");
});

socket.on("connect_error", (error) => {
  console.log("error", error.message);
});

socket.on("error", (error) => {
  console.error(error);
});

export default socket;
