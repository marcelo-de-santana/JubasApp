export default function cpfMask(texto) {
    // Remove tudo que não é número
    texto = texto.replace(/[^0-9]/g, '');

    // Insere a máscara de CPF
    if (texto.length > 3 && texto.length < 7) {
        texto = texto.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (texto.length >= 7 && texto.length < 10) {
        texto = texto.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (texto.length >= 10) {
        texto = texto.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }

    return texto;
}