/* eslint-disable linebreak-style */
/* eslint-disable indent */
import ErroBase from "./erroBase.js";

class RequisicaoIncorreta extends ErroBase {
    constructor(message = "Um ou mais dados fornecidos estão incorretos.") {
        super(message, 400);
    }
}

export default RequisicaoIncorreta;