const socket = io();

const chat = document.getElementById('chat');
const chatSecction = document.getElementById('chat-secction');

chat.onclick = (e) => {
    e.preventDefault();
    const email = document.getElementById('mail').value;
    const mensaje = document.getElementById('mensaje').value;
    const msj = {email:email ,message:mensaje};
    socket.emit ('enviar',msj)
}

socket.on ('mensajes', (mensajes) => {
    chatSecction.innerHTML = "";
    mensajes.forEach((el) => {
        const msj = document.createElement('div');
        msj.innerHTML = `
                        <p>Email: ${el.email}</p>
                        <p>Mensaje: ${el.message}</p>
                    `
        chatSecction.appendChild(msj);
    })
})