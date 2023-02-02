const { Socket } = require("net");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const end = "end";
const error = (message) => {
  console.error(message);
  process.exit(1);
};

const connect = (host, port) => {
  console.log(`Conectando al puerto ${host}:${port}`);

  const socket = new Socket();
  socket.connect({ host, port });
  socket.setEncoding("utf-8");

  socket.on("connect", () => {
    console.log("Conexion establecida!");

    readline.question("Ingrese su nombre de usuario: ", (username) => {
      socket.write(username);
      console.log(`Escriba su mensaje, escriba: ${end} para finalizar la conversacion`);
    });

    readline.on("line", (message) => {
      socket.write(message);
      if (message === end) {
        socket.end();
      }
    });

    socket.on("data", (data) => {
      console.log(data);
    });
  });

  socket.on("error", (err) => error(err.message));

  socket.on("close", () => {
    console.log("Desconectado.");
    process.exit(0);
  });
};

connect("192.168.209.60",4000);