const fs = require('fs');
const Data = require('../data/data.js')

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.conteo = 0;



        Data.find({}).sort({ _id: -1 }).limit(1)
            .exec((err, dataDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                Data.estimatedDocumentCount((err, numOfDocs) => {
                    if (err) throw (err);

                    this.conteo = numOfDocs - 1;

                    console.log(`Total: ${this.conteo}.`);

                });

                console.log('Ultimo db: ' + dataDB[this.conteo].ultimo);

                if (dataDB[this.conteo].hoy === this.hoy) {

                    this.ultimo = dataDB[this.conteo].ultimo;
                    this.tickets = dataDB[this.conteo].tickets;
                    this.ultimos4 = dataDB[this.conteo].ultimos4;

                } else {
                    this.reiniciarConteo();
                }

            })

    }

    siguienteTicket() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);


        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;

    }

    getUltimoTicket() {

        return `Ticket ${this.ultimo}`;

    }

    getUltimos4() {

        return this.ultimos4;

    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero; // extraigo el numero para romper la relacion de js que todos los obj se pasan por referencia
        this.tickets.shift(); // elimino primera posicion del arreglo

        let atenderTicket = new Ticket(numeroTicket, escritorio); //Se crea ticket para atender

        this.ultimos4.unshift(atenderTicket); //lo agregamos al inicio del arreglo

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //borra el ultimo elemento
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;

    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];


        Data.deleteMany({}).then(function() {
            console.log("Data deleted"); // Success 
        }).catch(function(error) {
            console.log(error); // Failure 
        });

        this.grabarArchivo();


    }

    grabarArchivo() {


        let data = new Data({
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        })

        data.save((err) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

        })

    }


}


module.exports = {
    TicketControl
}