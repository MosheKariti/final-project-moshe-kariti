import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BsPersonSquare } from "react-icons/bs"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {updateUser} from "../../services/axios/axios";
import {updateUserValidator} from "../../services/users/updateUserValidator";
const defaultTheme = createTheme();

export function UpdateUser({loggedInUser,setIsEditUser,setToast}) {
    const [isEmailError,setIsEmailError] = useState(false);
    const [isNameError,setIsNameError] = useState(false);
    const [isPhoneError,setIsPhoneError] = useState(false);
    const [isCountryError,setIsCountryError] = useState(false);
    const [isCityError,setIsCityError] = useState(false);
    const [isStreetError,setIsStreetError] = useState(false);
    const [isHouseNumberError,setIsHouseNumberError] = useState(false);
    const [isZipError,setIsZipError] = useState(false);

    async function handleUserUpdate(event) {
        const validatorResponse = updateUserValidator(
            loggedInUser,event,setIsNameError,setIsEmailError,setIsPhoneError,setIsCountryError,setIsCityError,setIsStreetError,setIsHouseNumberError,setIsZipError);
        let user;
        let isValid;
        if (validatorResponse) {
            user = validatorResponse.user;
            isValid = validatorResponse.valid;
        }
        if (isValid) {
            try {
                await updateUser(user);
                setToast(toast.success('User has been updated'));
                setIsEditUser(false);
            } catch (error) {
                setToast(toast.error('Update Failed: ' + error.response.data.details[0].message));
            }
        } else {
            toast.error('Update Failed, user is not valid');
        }
    }
    const initialFieldValues = {
       firstName: loggedInUser.name.first,
       middleName: loggedInUser.name.middle,
       lastName: loggedInUser.name.last,
       phone: loggedInUser.phone,
       email: loggedInUser.email,
       image: loggedInUser.image.url,
       state: loggedInUser.address.state,
       country: loggedInUser.address.country,
       city: loggedInUser.address.city,
       street: loggedInUser.address.street,
       houseNumber: loggedInUser.address.houseNumber,
       zip: loggedInUser.address.zip
   }
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    function handleInputChange(fieldName, value) {
        setFieldValues(prevValues => ({
            ...prevValues,
            [fieldName]: value,
        }));
    }
    const fields = [
        {required: true, name:'firstName',label:'First Name',type:'text',id:'firstName',error:isNameError,validationError:'Name is Required',value:fieldValues.firstName},
        {required: false, name:'middleName',label:'Middle Name',type:'text',id:'middleName',value:fieldValues.middleName},
        {required: true, name:'lastName',label:'Last Name',type:'text',id:'lastName',error:isNameError,validationError:'Name is Required',value:fieldValues.lastName},
        {required: true, name:'phone',label:'Phone',type:'number',id:'phone',error:isPhoneError,validationError:'Phone is Required, only numbers',value:fieldValues.phone},
        {required: true, name:'email',label:'Email',type:'email',id:'email',error:isEmailError,validationError:'Email not valid',value:fieldValues.email},
        {required: false, name:'image',label:'Image',type:'text',id:'image',value:fieldValues.image},
        {required: false, name:'state',label:'State',type:'text',id:'state',value:fieldValues.state},
        {required: true, name:'country',label:'Country',type:'text',id:'country',error:isCountryError,validationError:'Country not valid',value:fieldValues.country},
        {required: true, name:'city',label:'City',type:'text',id:'city',error:isCityError,validationError:'City not valid',value:fieldValues.city},
        {required: true, name:'street',label:'Street',type:'text',id:'street',error:isStreetError,validationError:'Street not valid',value:fieldValues.street},
        {required: true, name:'houseNumber',label:'House Number',type:'number',id:'houseNumber',error:isHouseNumberError,validationError:'House Number not valid',value:fieldValues.houseNumber},
        {required: true, name:'zip',label:'Zip',type:'number',id:'zip',error:isZipError,validationError:'Zip not valid',value:fieldValues.zip}
    ]
    const firstColumn = fields.slice(0,7);
    const secondColumn = fields.slice(7,13);

    return <>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xl">
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <BsPersonSquare size={50} className={'m-1 mt-2'}/>
                    <Typography component="h1" variant="h5" mt={1} className={'mb-4'} >
                       Update Details
                    </Typography>
                    <Box
                        component={"form"}
                        noValidate
                        sx={{ mt: 2 ,'& .MuiTextField-root': { mt: 2, mb:0, width: '50ch' }}}
                        onSubmit={handleUserUpdate}
                    >
                        <div className={'display-flex'}>
                            <div className={'form-columns'}>
                                {firstColumn.map((field,index) =>(
                                    <div key={index}>
                                        <TextField
                                            style={{ width: '300px' }}
                                            margin="normal"
                                            fullWidth
                                            required={field.required}
                                            name={field.name}
                                            label={field.label}
                                            type={field.type}
                                            id={field.id}
                                            onChange={e => handleInputChange(field.name, e.target.value)}
                                            value={field.value}
                                            error={field.error}
                                        />
                                        {field.error && <label className={"text-danger mt-0"}>{field.validationError}</label>}
                                    </div>
                                ))}
                            </div>
                            <div className={'form-columns'}>
                                {secondColumn.map((field,index) =>(
                                    <div key={index}>
                                        <TextField
                                            style={{ width: '300px' }}
                                            margin="normal"
                                            fullWidth
                                            required={field.required}
                                            name={field.name}
                                            label={field.label}
                                            type={field.type}
                                            id={field.id}
                                            onChange={e => handleInputChange(field.name, e.target.value)}
                                            value={field.value}
                                            error={field.error}
                                        />
                                        {field.error && <label className={"text-danger mt-0"}>{field.validationError}</label>}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt:3 , mb:2 }}
                            >
                                <Typography className={'text-capitalize'}>Update</Typography>
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    </>
}