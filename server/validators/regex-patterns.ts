export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export const phonePattern = /^([0]\d{1,3}[-])?\d{7,10}$/;
export const patterns = { password: passwordPattern, phone: phonePattern };