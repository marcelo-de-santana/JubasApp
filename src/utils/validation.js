//REGEX PARA DATA DE NASCIMENTO
const date = /^(?:(?:31(\/)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

//REGEX PARA CPF
const cpf = /^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/;

//REGEX PARA NOME
const email = /^(\d)/;

//REGEX PARA NOME
const name = /^(\d)/;

//REGEX PARA NÚMERO DE TELEFONE
const phone = /^\(\d{2}\)\d{4,5}-\d{4}$/;

//REGEX PARA 24 HORAS
const time = /^([01]\d|2[0-3]):([0-5]\d)$/;
//const time = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/

export default { date, cpf, email, name, phone, time }