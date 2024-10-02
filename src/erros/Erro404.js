/* eslint-disable linebreak-style */
/* eslint-disable indent */
import ErroBase from "./erroBase.js";

class Erro404 extends ErroBase{
    constructor(message ="Pagina não encontrada" ){
        super(message, 404);
    }
};

export default Erro404;