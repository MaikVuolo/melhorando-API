/* eslint-disable linebreak-style */
/* eslint-disable indent */
import Erro404 from "../erros/Erro404.js";

function menssagem404(req, res, next) {
    new Erro404().enviarResposta(res);
    next();
};

export default menssagem404;