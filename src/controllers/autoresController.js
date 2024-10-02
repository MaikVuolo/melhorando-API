/* eslint-disable linebreak-style */
import Erro404 from "../erros/Erro404.js";
import {autores} from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado =  autores.find();

      req.resultado = autoresResultado;

      next();

    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {

    try {
      const id = req.params.id;

      const autorResultado = await autores.findById(id);

      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next( new Erro404("ID do autor nao encontrado"));

      }
    } catch (erro) {
      next(erro);
    }
  };


  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };


  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autalizaPorId = await autores.findByIdAndUpdate(id, { $set: req.body });

      if(autalizaPorId !== null){
        res.status(200).send({ message: "Autor atualizado com sucesso" });

      }else{
        next( new Erro404("Necessario fornecer um ID valido para atualizar autor."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const excliuPorId = await autores.findByIdAndDelete(id);
      if(excliuPorId !== null){
        res.status(200).send({ message: "Autor removido com sucesso" });

      }else{
        next( new Erro404("Necessario fornecer um ID valido para deletar autor."));
      }

    } catch (erro) {
      next(erro);
    }
  };


}

export default AutorController;