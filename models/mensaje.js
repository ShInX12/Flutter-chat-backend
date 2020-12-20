const { Schema, model} = require('mongoose');

const MensajeSchema = Schema({

    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Modificamos el metodo 'toJSON'
MensajeSchema.method('toJSON', function(){
    // Extraemos algunos campos del objeto y renombramos el _id y retornamos el nuevo
    const { __v, _id, password, ...object } = this.toObject();
    return object;
});

module.exports = model('Mensaje', MensajeSchema);