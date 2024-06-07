export const CustomValidators = {
    onlyNumbers(value) {
        return /^\d+$/.test(value);
    },
    mustBeEqual(nombrePrimerControl, nombreSegundoControl, group) {
        const primerControl = group[nombrePrimerControl];
        const segundoControl = group[nombreSegundoControl];
        return primerControl === segundoControl;
    },
    validEmail(value) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(value);
    },
    atLeastOneNumber(value) {
        return /\d+/.test(value);
    },
    atLeastOneUppercase(value) {
        return /[A-Z]+/.test(value);
    },
    atLeastOneLowercase(value) {
        return /[a-z]+/.test(value);
    },
    mustBeDifferent(firstField, secondField, group) {
        const firstControl = group[firstField];
        const secondControl = group[secondField];
        return firstControl !== secondControl;
    },
};