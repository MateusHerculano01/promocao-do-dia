function formatPrice(value: string) {
    const format = value.replace(',', '.');
    const formated = parseFloat(format).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    return formated;
}

export {
    formatPrice
}