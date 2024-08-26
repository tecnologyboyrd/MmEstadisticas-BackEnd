const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    online:{
        type: Boolean,
        default: false
    },
});

/* 
    Aqui sobreescribimos el metodo toJSON de la instancia de mongoose del model
    con esto, se logra hacer que solo se devuelvan en el resultado de la consulta la 
    informacions que nos interesan, y de hecho, se sbreescriben los nombres de algunas 
    informaciones a conveniencia del programador

    En este caso, el _id lo sustituimos por una propiedad con el nombre "uid"

    de igual manera se retornan todas las propiedades del modelo, menos las que se excluyen
    por porgramacion, que son las siguientes :__v, _id, password.
*/
UserSchema.method('toJSON', function(){
    const{__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports=model('User', UserSchema);