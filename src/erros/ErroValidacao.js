/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro) {
        const enviaErro = Object.values(erro.errors).map(erro => erro.message).join("; ");

        super(` Os seguintes erros foram encontrados: ${enviaErro}`);
    }
};

export default ErroValidacao;