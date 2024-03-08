export const validPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&-])[A-Za-z\d@$!%*?&]{9,}/);
export const validEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
export const validPhone = new RegExp(/^0\d([\d]{0,1})([-]{0,1})\d{7}$/);








