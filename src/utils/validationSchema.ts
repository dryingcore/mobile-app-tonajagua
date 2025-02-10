import * as yup from "yup";

export const pessoaFisicaSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup
    .string()
    .min(6, "Mínimo de 6 caracteres")
    .required("Senha é obrigatória"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas devem coincidir")
    .required("Confirmação de senha é obrigatória"),
});

export const estabelecimentoSchema = yup.object().shape({
  nomeEstabelecimento: yup
    .string()
    .required("Nome do estabelecimento é obrigatório"),
  cnpj: yup
    .string()
    .length(14, "CNPJ deve ter 14 dígitos")
    .required("CNPJ é obrigatório"),
  cep: yup
    .string()
    .length(8, "CEP deve ter 8 dígitos")
    .required("CEP é obrigatório"),
  endereco: yup.string().required("Endereço é obrigatório"),
  nomeDono: yup.string().required("Nome do dono é obrigatório"),
  cpfDono: yup
    .string()
    .length(11, "CPF deve ter 11 dígitos")
    .required("CPF do dono é obrigatório"),
  senhaAcesso: yup
    .string()
    .length(6, "Senha de acesso deve ter 6 dígitos")
    .required("Senha de acesso é obrigatória"),
  confirmarSenhaAcesso: yup
    .string()
    .oneOf([yup.ref("senhaAcesso")], "As senhas devem coincidir")
    .required("Confirmação de senha de acesso é obrigatória"),
});
