//Comando para establecer la conexion
var socket = io();


var searchParams = new URLSearchParams(window.location.search);

//Valido, si no existe la palabra 'escritorio' por parametro en la URL
if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio'); //Obtengo el escritorio que viene por parametro de la URL
var label = $('small');

//Valido que sea un numero
if (isNaN(escritorio) === true) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            label.text(resp);
            alert(resp)
            return;
        }

        console.log(resp);
        label.text('Ticket ' + resp.numero);

    });

});