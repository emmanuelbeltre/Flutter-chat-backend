const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');

const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controller/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    // console.log(client.handshake.headers['x-token']);

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);


    // console.log(valido, uid);

    //verificar autenticacion

    if (!valido) { return client.disconnect(); }

    // console.log('Cliente Autentiicado');
    //Cliente autenticado
    usuarioConectado(uid);

    //INGRESAR AL USUARIO A UNA SALA PARTICULAR

    //Sala Global. Client.id, 625ed0e5ea1568966a1a339a

    client.join(uid);


    //Escuchar del cliente el mensaje-personal

    client.on('mensaje-personal', async (payload) => {

        //TODO: grabar mensaje 
        await grabarMensaje(payload);

        io.to(payload.para).emit('mensaje-personal', payload);
    })


    client.on('disconnect', () => {
        console.log('Cliente desconectado');

        usuarioDesconectado(uid);
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
