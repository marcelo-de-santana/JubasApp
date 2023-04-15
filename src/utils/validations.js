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
    value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2')
    return value
}