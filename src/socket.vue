<script setup>
import { io } from "socket.io-client";

const URL = "http://localhost:8000"; // Sesuaikan dengan URL backend Anda

const socket = io(URL, {
  autoConnect: false,
  // Jika Anda menggunakan token atau autentikasi, tambahkan di sini
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

</script>
