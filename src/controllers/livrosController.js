/* eslint-disable indent */
import Erro404 from "../erros/Erro404.js";
import {autores, livros} from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const busca = livros.find();

      req.resultado = busca;
      next();

    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const buscaLivroPorId = await livros.findById(id);
      if(buscaLivroPorId !== null){
      const livroResultados = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).send(livroResultados);
    }else{
      next(new Erro404("ID de livro não encontrado"));
    }

    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const atualizaPorId = await livros.findByIdAndUpdate(id, { $set: req.body });
      if(atualizaPorId !== null){
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      }else{
        next(new Erro404("ID inválido"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const excluiPorId = await livros.findByIdAndDelete(id);
      if(excluiPorId !== null){
        res.status(200).send({ message: "Livro removido com sucesso" });
       }else{
        next(new Erro404("ID inválido"));
       }

    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null){
        const livrosResultado = livros
        .find(busca)
        .populate("autor");
  
        req.resultado = livrosResultado;

        next();
      }else{
        res.status(200).send([]);
      }

    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros){
  const {editora,titulo,minPaginas,maxPaginas,nomeAutor} = parametros;
  const regex = {$regex: titulo, $options: "i"};
  let busca = {};
  if(minPaginas || maxPaginas) busca.numeroPaginas = {};

  if(minPaginas)busca.numeroPaginas.$gte = minPaginas; 
  if(maxPaginas)busca.numeroPaginas.$lte = maxPaginas; 

  if(editora)busca.editora = editora;
  if(titulo)busca.titulo = regex;

  if (nomeAutor){
    const autor = await autores.findOne({nome: nomeAutor});
  
    if(autor !== null){
    busca.autor = autor._id;
  }else{
    busca = null;
  }
}
  

  return busca;
}

export default LivroController;