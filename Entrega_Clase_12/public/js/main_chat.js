const socket = io.connect()

socket.on('messages', function(data) {
    if (data.length > 0) {
      renderMessages(data)
    }
 })

function renderMessages(data) {
  const html = data
    .map((elem, index) => {
      return `<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`
    })
    .join(' ')
  document.getElementById('messages').innerHTML = html
}

socket.on('messages', function (data) {
  renderMessages(data)
})

function addMessage(e) {
  const mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value,
  }
  socket.emit('new-message', mensaje)
  document.getElementById('texto').value = ''
  return false
}