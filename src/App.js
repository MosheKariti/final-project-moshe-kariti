import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router/Router";
import {Header} from "./components/Main/Header";
import {Footer} from "./components/Main/Footer";
import {useEffect, useState} from "react";
import {guestMenu, adminMenu, businessMenu, simpleMenu} from "./services/menu/menusHandler";
import "./styles/homePage.css"
import "./styles/cards.css"
import "./styles/components.css"
import {initDb} from "./services/firstRun/initDb";
import {handleAccessToken} from "./services/users/handleAccessToken";
import {ToastContainer} from "react-toastify";



function App() {
    // useEffect(()=>initDb(),[]);
    const [toast,setToast] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const [menu,setMenu] = useState(guestMenu);
    const [path,setPath] = useState(location.path);
    const [loggedInUser,setLoggedInUser] = useState(undefined);
    useEffect(()=>{
        handleAccessToken()
            .then(userResponse => {
                setLoggedInUser(userResponse);
                if (userResponse) {
                    if (userResponse.isAdmin) {
                        setMenu(adminMenu);
                    } else if (userResponse.isBusiness) {
                        setMenu(businessMenu);
                    } else {
                        setMenu(simpleMenu);
                    }
                }
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            {isLoading && ''}
            {!isLoading && <>
                <div>
                    <ToastContainer
                        position="top-center"
                        text-center
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />
                    <BrowserRouter>
                        <Header setToast={setToast} path={path} setPath={setPath} menu={menu} setMenu={setMenu} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}></Header>
                        <Router setToast={setToast} setMenu={setMenu} setPath={setPath} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
                        <Footer/>
                    </BrowserRouter>
                </div>
                </>}
        </>
  );
}
export default App;
