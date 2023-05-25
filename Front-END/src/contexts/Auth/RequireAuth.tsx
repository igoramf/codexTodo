import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import SignIn from "../../pages/SingIn";
import SignUp from "../../pages/Signup";

export const RequireAuth = ({children} : {children: JSX.Element}) => {
    const auth = useContext(AuthContext);


    if(!auth.user){
        if(window.location.pathname == "/signup"){
            return <SignUp />
        }
        return <SignIn />;
    }

    return children;
}