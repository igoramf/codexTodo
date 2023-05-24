import { IonContent, IonPage, IonHeader, IonToolbar, IonMenuButton, IonButtons, IonTitle } from "@ionic/react";
import styles from "./Inbox.module.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { RequireAuth } from "../contexts/Auth/RequireAuth";

const Inbox = () => {
  const data = useContext(AuthContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className={styles.header}>
            <div className={styles.buttonMenu}>
              <IonButtons slot="start">
                <IonMenuButton color="tertiary" />
              </IonButtons>
              <IonTitle>CodexNotes</IonTitle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className={styles.div}>
          <h1>BEM VINDO</h1>
          <h1>{data.user?.nome}</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Inbox;
