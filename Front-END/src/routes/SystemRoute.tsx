import {
  IonRouterOutlet,
  IonSplitPane,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "../components/Menu";
import Notes from "../pages/Notes";
import Inbox from "../pages/Inbox";
import Conta from "../pages/Conta";
import SignIn from "../pages/SingIn";
import { RequireAuth } from "../contexts/Auth/RequireAuth";
import SignUp from "../pages/Signup";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { User } from "../types/User";

const Logged = () => {
  const data = useContext(AuthContext);

  return data.user ? true : false
};

const SystemRoute = () => {


  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <RequireAuth><Menu /></RequireAuth>
        <IonRouterOutlet id="main">
          {Logged() ? (
            <>
              <Route path="/" exact={true}>
                <Redirect to={"/page/Inbox"} />
              </Route>
              <Route path="/page/notes" component={Notes} exact={true}></Route>
              <Route path="/page/conta" component={Conta} exact={true}></Route>
              <Route path="/page/Inbox" component={Inbox} exact={true}></Route>
            </>
          ) : (
            <>
              <Route path="/*" component={SignIn} exact={true}></Route>
              <Route path="/signup" component={SignUp} exact={true}></Route>
            </>
          )}
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  );
};

export default SystemRoute;
