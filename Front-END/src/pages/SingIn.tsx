import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonInput,
  IonButton,
} from "@ionic/react";
import styles from "./SignIn.module.css";
import { useState } from "react";

const SignIn = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === "") return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };
  return (
    <IonPage>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          This is the menu content.
        </IonContent>
      </IonMenu>
      <IonHeader>
        <IonToolbar>
          <div className={styles.header}>
            <div className={styles.logo}>
              <IonTitle>CodexNotes</IonTitle>
            </div>
            <div className={styles.link}>
              <IonTitle>
                <a>Cadastro</a>
              </IonTitle>
              <IonTitle>
                <a>Sobre</a>
              </IonTitle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className={styles.main}>
          <IonGrid>
            <IonRow className={styles.row}>
              <IonCol className={styles.col}>
                <h1>A melhor forma de organizar as <br></br>suas tarefas do dia a dia.</h1>
                <IonImg src="../../public/Notes-rafiki.svg"></IonImg>
              </IonCol>
              <IonCol className={`${styles.col} ${styles.colLogin}`}>
                <div className={styles.loginArea}>
                  <h1>Login</h1>
                  <form action="submit">
                    <IonInput
                      className={`${isValid && "ion-valid"} ${
                        isValid === false && "ion-invalid"
                      } ${isTouched && "ion-touched"}`}
                      type="email"
                      fill="solid"
                      label="Email"
                      labelPlacement="floating"
                      helperText="Digite um email valido"
                      errorText="Email invalido"
                      onIonInput={(event) => validate(event)}
                      onIonBlur={() => markTouched()}
                    ></IonInput>
                    <div className={styles.passwordInput}>
                        <IonInput
                        label="Senha"
                        labelPlacement="floating"
                        fill="solid"
                        type="password"
                        ></IonInput>
                    </div>
                    <p><a href="">Cadastre-se</a></p>
                    <IonButton type="submit">Login</IonButton>
                  </form>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
