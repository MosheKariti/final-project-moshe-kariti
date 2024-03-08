import {validEmail, validPassword, validPhone} from "../regex/regex";
export function newUserValidator(event, isBusiness, setIsNameError, setIsEmailError, setIsPhoneError, setIsPasswordError) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
        name: {
            first: data.get('firstName'),
            middle: data.get('middleName'),
            last: data.get('lastName')
        },
        phone: data.get("phone"),
        email: data.get("email"),
        password: data.get("password"),
        image: {
            url: data.get("image"),
            alt: "business card image"
        },
        address: {
            state: data.get("state"),
            country: data.get("country"),
            city: data.get("city"),
            street: data.get("street"),
            houseNumber: data.get("houseNumber"),
            zip: data.get("zip")
        },
        isBusiness: isBusiness,
        isAdmin: false
    }
    const isValidPassword = validatePassword();
    const isValidEmail = validateEmail();
    const isValidPhone = validatePhone();
    const isValidFirstName = validateFirstName();

    if (user.name.middle === "") {
        delete user.name.middle;
    }
    if (user.image.url === "") {
        delete user.image.url;
    }
    if (user.address.state === "") {
        delete user.address.state;
    }
    if (isValidPassword && isValidEmail && isValidPhone &&  isValidFirstName) {
        return {user: user,valid: true};
    }
    function validatePassword() {
        if (!validPassword.test(user.password)) {
            setIsPasswordError(true);
            return false;
        } else {
            setIsPasswordError(false);
            return true;
        }
    }
    function validateEmail() {
        if (!validEmail.test(user.email)) {
            setIsEmailError(true);
            return false;
        } else {
            setIsEmailError(false);
            return true;
        }
    }
    function validatePhone() {
        if (!validPhone.test(user.phone)) {
            setIsPhoneError(true);
            return false;
        } else {
            setIsPhoneError(false);
            return true;
        }
    }
    function validateFirstName() {
        if(user.name.first.length < 2) {
            setIsNameError(true);
            return false;
        } else {
            setIsNameError(false);
            return true;
        }
    }
}
