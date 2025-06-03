function addInputValidations(input, closure) {
  const msg = `Preencha o campo ${input.id} de forma correta.`;
  if (closure) {
    closure(input, msg);
  }
}

function toggleErrorMsg(input, msg = null) {
  const errorElement = input.nextElementSibling;
  if (!errorElement || errorElement.dataset.error !== input.id) return;

  if (msg) {
    errorElement.textContent = msg;
    errorElement.classList.remove("hidden");
    input.classList.add("border-red-600");
  } else {
    errorElement.textContent = "";
    errorElement.classList.add("hidden");
    input.classList.remove("border-red-600");
  }
}

function isValidCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let firstCheck = 11 - (sum % 11);
  if (firstCheck >= 10) firstCheck = 0;
  if (firstCheck !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let secondCheck = 11 - (sum % 11);
  if (secondCheck >= 10) secondCheck = 0;

  return secondCheck === parseInt(cpf.charAt(10));
}

function isValidBirthDate(dateStr, ageLimit = null) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (
    birthDate > today ||
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    return false;
  }

  if (ageLimit) {
    const age = today.getFullYear() - year;
    if (
      age < ageLimit ||
      (age === ageLimit && today < new Date(year + 18, month - 1, day))
    ) {
      return false;
    }
  }

  return true;
}
