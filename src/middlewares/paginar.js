/* eslint-disable linebreak-style */
/* eslint-disable indent */
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";


async function paginar(req, res, next) {
    let { limite = 3, pagina = 1, ordenacao = "_id:1" } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(":");

    const resultado = req.resultado;

    if (limite > 0 && pagina > 0) {

        const resultadoBusca = await resultado.find()
            // metodo sort faz ordenar a chamada de livros, campoOrdenacao esta entre [] para chamar a string se referenciando a uma propriedade(é nativo do js)
            .sort({ [campoOrdenacao]: ordem })
            //skip faz a paginacao
            .skip((pagina - 1) * limite)
            // limit é o limite de livros
            .limit(limite)
            .exec();

        res.status(200).json(resultadoBusca);
    } else {
        next(new RequisicaoIncorreta());
    }
};

export default paginar;