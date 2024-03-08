import {validEmail, validPhone} from "../regex/regex";
export function newCardValidator(
    event,setIsTitleError,setIsSubtitleError,setIsDescriptionError,setIsPhoneError,setIsEmailError,setIsCountryError,setIsCityError,setIsStreetError,setIsHouseNumberError,cardToEdit
) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const card = {
        title: data.get('title'),
        subtitle: data.get('subtitle'),
        description: data.get('description'),
        phone: data.get("phone"),
        email: data.get("email"),
        web: data.get("web"),
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
        }
    }
    if (card.image.url === "") {
        card.image.url = 'https://picsum.photos/seed/picsum/200/300';
    }
    if (card.address.state === "") {
        delete card.address.state;
    }
    if (card.web === "") {
        delete card.web;
    }
    if(cardToEdit) {
        card.user_id = cardToEdit.user_id;
    }

    const isValidEmail = validateEmail();
    const isValidPhone = validatePhone();
    if (isValidEmail && isValidPhone) {
        return {card: card,valid: true};
    }
    function validateEmail() {
        if (!validEmail.test(card.email)) {
            setIsEmailError(true);
            return false;
        } else {
            setIsEmailError(false);
            return true;
        }
    }
    function validatePhone() {
        if (!validPhone.test(card.phone)) {
            setIsPhoneError(true);
            return false;
        } else {
            setIsPhoneError(false);
            return true;
        }
    }
}
