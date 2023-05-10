export function cpf(event) {
    let value = event
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4")
    return value
}

export function birthday(event){
    let value = event
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/, '$1/$2')
    value = value.replace(/(\d{2})\/(\d{2})(\d)$/, '$1/$2/$3')
    value = value.replace(/(\d{2})\/(\d{2})(\d{2,4})$/, '$1/$2/$3')
    return value
}

export function phone(event) {
    let value = event
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d{4,5})(\d{3,4})$/, '$1-$2')
    return value
}

export function time(event){
    let value = event
    value = value.replace(/\D/,'')
    value = value.replace(/\d([2][4]|[3-9][0-9][0-9][0-9])/,'00:00')
    value = value.replace(/([0][0-9]|[1][0-9]|[2][0-3])([0-5][0-9])/, '$1:$2')
    return value
}