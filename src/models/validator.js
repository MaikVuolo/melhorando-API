/* eslint-disable indent */
/* eslint-disable linebreak-style */
import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate",{
    //.trim remove os espaços vazios da string comparada
    validator: (valor)=> valor.trim() !== "",
    message:({path}) => `O campo ${path} está vazio`
});