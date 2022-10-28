import mongoose from "mongoose";

const ConectarDb = () => {
               
    mongoose.connect(process.env.DB, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true    
    }, err => {
        if (err) throw new Error(`Error al conectar a la base de datos. ${err}`)
        console.log('BD Conectada');
    })
};

export default ConectarDb