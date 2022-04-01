const socket = io.connect()

socket.on('items', (data) => {
    if (data.length > 0) {
        renderRow(data) 
    }
} )

function renderRow(data) {
    let html = '<tr style="color: yellow;"> <th>Item</th> <th>Precio</th> </tr>'
    html += data.map((item, index) => {
        return(`<tr>
                    <td> ${item.name}</td>
                    <td> ${item.price} </td>
                </tr>`)
    }).join(" ");
    document.getElementById('table').innerHTML = html;
}

function addItem(e) {
    const name = document.getElementById('name').value
    const price = document.getElementById('price').value
    const item = {
        name:  name,
        price: price
    };
    socket.emit('item', item);
    return false;
}
socket.on('messages', function(data) { 
    render(data)
 })

function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.user}</strong>:
            <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function sendMessage(e) {
    const message = {
        user: document.getElementById('user').value,
        text: document.getElementById('text').value
    };
    socket.emit('new-message', message);
    return false;
}
