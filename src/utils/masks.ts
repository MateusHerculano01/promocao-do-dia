function maskCep(value: string) {
  value = value.replace(/\D/g, ""); // removing all non-numeric
  value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // taking first block and second block and putting a dash between them
  return value;
}

function maskPhone(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

export {
  maskCep,
  maskPhone
}