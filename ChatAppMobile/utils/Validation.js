//valid email
export const isValidPhone = stringPhone => /^\d{10}$/.test(stringPhone);
// valid pass
export const isValidPass = stringPass => stringPass.length >= 3;
