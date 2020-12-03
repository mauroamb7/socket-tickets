const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguienteTicket();

        console.log(siguiente);
        callback(siguiente);

    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    //Recibe data(escritorio o cualquier otra cosa) y el callback para notificar cuando se haga el proceso o notificar cual escritorio le toca
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })

    })



});