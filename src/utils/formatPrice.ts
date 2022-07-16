function formatPrice(value: string) {
    const format = value.replace(',', '.');
    const formated = parseFloat(format).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    return formated;
}

function formatHours(date: string) {
    const format = date?.split('-')[2].split('.')[0].split('T')[1].split(':');

    return `${format[0]}:${format[1]}`;
}

export {
    formatPrice,
    formatHours
}