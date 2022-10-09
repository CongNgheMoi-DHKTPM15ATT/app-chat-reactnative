//valid email
export const isValidPhone = stringPhone => /^\w{10}$/.test(stringPhone);
// valid pass
export const isValidPass = stringPass => stringPass.length >= 3;
