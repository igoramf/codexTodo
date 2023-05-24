import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import SignIn from "../../pages/SingIn";

export const RequireAuth = ({children} : {children: JSX.Element}) => {
    const auth = useContext(AuthContext);

    if(!auth.user){
        return <SignIn />;
    }

    return children;
}