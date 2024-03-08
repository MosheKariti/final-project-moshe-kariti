import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {PiSignInFill} from "react-icons/pi"
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {adminMenu, businessMenu, simpleMenu} from "../../services/menu/menusHandler";
import {login} from "../../services/axios/axios";
import 'react-toastify/dist/ReactToastify.css';
import {checkIfIsBlockedUser, handleFailedEntries} from "../../services/users/handleFailedEntries";

const defaultTheme = createTheme();

export function SignInPage({setMenu,setLoggedInUser, setToast}) {
    const navigate = useNavigate();
    async function signIn(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // prepare post data for server request
        const post = {
            email: data.get('email'),
            password: data.get('password')
        }
        // check blocked users //
        let isBlocked = checkIfIsBlockedUser(post.email,setToast);
        // if user is not blocked - try to fetch data from server //
        if (!isBlocked) {
            try {
                const userDataResponse = await login(post);
                setLoggedInUser(userDataResponse);
                setToast(toast.success(`Welcome ${userDataResponse.name.first}!`))
                if (userDataResponse.isAdmin === true) {
                    navigate('/crm', {replace: true});
                    setMenu(adminMenu);
                } else if (userDataResponse.isBusiness === true) {
                    navigate('/home', {replace: true});
                    setMenu(businessMenu);
                } else if (!userDataResponse.isBusiness && !userDataResponse.isAdmin){
                    navigate('/home', {replace: true});
                    setMenu(simpleMenu);
                }
            } catch (error) {
                handleFailedEntries(post.email,setToast);
            }
        }
    }
    return (
        <>
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <PiSignInFill size={50} style={{ margin:"2", marginTop:"5" }} />
                    <Typography component="h1" variant="h5" mt={1}>
                        Sign In
                    </Typography>
                    <Box component="form" onSubmit={signIn} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            autoComplete='current=password'
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <Typography style={{textTransform: 'none'}}>Sign In</Typography>
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    );
}