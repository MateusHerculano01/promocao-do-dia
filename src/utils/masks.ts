function maskCep(value: string) {
  value = value.replace(/\D/g, ""); // removing all non-numeric
  value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // taking first block and second block and putting a dash between them
  return value;
}

function maskPhone(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

function maskCurrency(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return value;
}

export {
  maskCep,
  maskPhone,
  maskCurrency
}