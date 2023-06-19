import * as Yup from "yup";
import validation from "./validation";

function registerFormSchema() {
    return (
        Yup.object().shape({
            cpf: Yup.string()
                .matches(validation.cpf, '*Campo obrigatório')
                .min(14, '*Campo obrigatório')
                .max(14, '*Campo obrigatório')
                .required('*Campo obrigatório'),
            name: Yup.string()
                .min(7, '*Campo obrigatório')
                .max(50, ({ max }) => `Máximo de ${max} caracteres`)
                .required('*Campo obrigatório'),
            email: Yup.string()
                .email('*Campo obrigatório')
                .max(50, ({ max }) => `Máximo de ${max} caracteres`)
                .required('*Campo obrigatório'),
            birthday: Yup.string()
                .min(10, "*Campo obrigatório")
                .matches(validation.date, '*Formato dd/mm/aaaa'),
            phoneNumber: Yup.string()
                .matches(validation.phone, "*Campo obrigatório")
                .min(14, "*Campo obrigatório")
                .max(15, '*Campo obrigatório')
                .required('*Campo obrigatório'),
            password: Yup.string()
                .min(8, ({ min }) => `Mínimo de ${min} caracteres`)
                .max(20, ({ max }) => `No máximo ${max} caracteres`)
                .required('*Campo obrigatório'),
            checkPass: Yup.string()
                .oneOf([Yup.ref('password'), null], '*As senhas devem ser iguais')
                .required('*Campo obrigatório')
        })
    );
}

function authFormSchema() {
    return (
        Yup.object().shape({
            cpf: Yup.string()
                .matches(validation.cpf, '*Campo obrigatório')
                .min(14, '*Campo obrigatório')
                .max(14, '*Campo obrigatório')
                .required('*Campo obrigatório'),
            password: Yup.string()
                .min(8, ({ min }) => `Mínimo de ${min} caracteres`)
                .max(20, ({ max }) => `No máximo ${max} caracteres`)
                .required('*Campo obrigatório'),
        })
    );
}

function recoverPassSchema() {
    return (
        Yup.object().shape({
            cpf: Yup.string()
                .matches(validation.cpf, '*Campo obrigatório')
                .min(14, '*Campo obrigatório')
                .max(14, '*Campo obrigatório')
                .required('*Campo obrigatório'),
            password: Yup.string()
                .min(8, ({ min }) => `Mínimo de ${min} caracteres`)
                .max(20, ({ max }) => `No máximo ${max} caracteres`)
                .required('*Campo obrigatório'),
            checkPass: Yup.string()
                .oneOf([Yup.ref('password'), null], '*As senhas devem ser iguais')
                .required('*Campo obrigatório')
        })
    );
}

function updateMyAccountFormSchema() {
    return (
        Yup.object().shape({
            NAME: Yup.string()
                .min(7, '*Campo obrigatório')
                .max(50, ({ max }) => `Máximo de ${max} caracteres`)
                .required('*Campo obrigatório'),
            EMAIL: Yup.string()
                .email('*Campo obrigatório')
                .max(50, ({ max }) => `Máximo de ${max} caracteres`)
                .required('*Campo obrigatório'),
            PHONE: Yup.string()
                .matches(validation.phone, "*Campo obrigatório")
                .min(14, "*Campo obrigatório")
                .max(15, '*Campo obrigatório')
                .required('*Campo obrigatório'),
            PASSWORD: Yup.string()
                .min(8, ({ min }) => `Mínimo de ${min} caracteres`)
                .max(20, ({ max }) => `No máximo ${max} caracteres`)
                .required('*Campo obrigatório'),
            CHECKPASS: Yup.string()
                .oneOf([Yup.ref('PASSWORD'), null], '*As senhas devem ser iguais')
                .required('*Campo obrigatório')
        })
    );
}

export { authFormSchema, registerFormSchema, recoverPassSchema, updateMyAccountFormSchema }