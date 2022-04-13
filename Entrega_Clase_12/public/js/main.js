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
    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    return false;
}

