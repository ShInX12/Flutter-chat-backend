const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de sockets
// Client es un dispositivo que se acaba de conectar
io.on('connection', client => {
    console.log('Cliente conectado');

    console.log(client.handshake.headers['x-token']);

    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    // Verificar autenticacion:
    if (!valido) return client.disconnect();

    // Cliente autenticado:
    usuarioConectado(uid);

    // Ingresar al usuario a una sala especifica

    // Sala global, client.id

    client.join(uid);

    client.on('mensaje-personal', async (payload) => {
        // TODO: Guardar mensaje
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    // client.to(uid).emit;




    client.on('disconnect', () => {
        usuarioDesconectado(uid)
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje!!!', payload);
    //     io.emit('mensaje', { admin: 'Ya vamos a cerrar' });
    // });

});