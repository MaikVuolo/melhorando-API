import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String, 
      required: [true,"A propriedade titulo é obrigatoria"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "autores",
      required: [true,"A propriedade autor é obrigatória"]
    },
    editora: {
      type: String, 
      required: [true,"A propriedade editora é obrigatória"],
      enum:{
        values: ["Gente", "Classicos"],
        message:"Editora {VALUE} não tem permissão"
      }
    },
    numeroPaginas: {
      type: Number,
      min: [50 , "O número de páginas precisa ser entre 50 e 1000. Valor fornecido : {VALUE}"],
      max: [1000 , "O número de páginas precisa ser entre 50 e 1000. Valor fornecido : {VALUE}"]
    }
  } ,{ versionKey: false }
);

const livros= mongoose.model("livros", livroSchema);

export default livros;