function cpf(event) {
    let value = event
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4")
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{3,10})$/, "")
    return value
}

function name(event) {
    let value = event
    value = value.replace(/^\d{0}[0-9]/, '')
    return value
}

function date(event) {
    let value = event
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/, '$1/$2')
    value = value.replace(/(\d{2})\/(\d{2})(\d)$/, '$1/$2/$3')
    value = value.replace(/(\d{2})\/(\d{2})(\d{2,4})$/, '$1/$2/$3')
    return value
}

function phone(event) {
    let value = event
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/, '($1)$2')
    value = value.replace(/(\d{4})(\d{1,4})$/, '$1-$2')
    return value
}

function time(event) {
    let value = event
    value = value.replace(/\D/, '')
    value = value.replace(/\d([2][4]|[3-9][0-9][0-9][0-9])/, '00:00')
    value = value.replace(/([0][0-9]|[1][0-9]|[2][0-3])([0-5][0-9])/, '$1:$2')
    return value
}

function fullTime(event) {
    let value = event
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d{1})/, '$1:$2')
    value = value.replace(/(\d{2}:\d{2})(\d)/, '$1:$2')
    return value
}

export default { cpf, date, name, phone, time, fullTime }