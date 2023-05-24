import { IonContent, IonPage } from "@ionic/react";
import styles from "./Inbox.module.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";

const Inbox = () => {

  const data = useContext(AuthContext);

  return (
      <IonPage>
        <IonContent fullscreen={true}>
          <div className={styles.div}>
            <h1>BEM VINDO</h1>
            <h1>{data.user?.name}</h1>
          </div>
        </IonContent>
      </IonPage>
  );
};

export default Inbox;
