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
  useIonRouter,
} from "@ionic/react";
import styles from "./SignIn.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";

const SignIn = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [validPassword, setValidPassword] = useState<boolean>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = useContext(AuthContext);
  const navigate = useIonRouter();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;


    setIsValid(undefined);
    setEmail(value)

    if (value === "") return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const validatePassword = ( e : Event ) => {
    const value = (e.target as HTMLInputElement).value;

    if(value == "" || value.length < 8){
      setValidPassword(false)
    }else{
      setPassword(value)
      setValidPassword(true)
    }
  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!isValid || !validPassword) alert("EMAIL OU SENHA INVALIDA")
  }


  const handleLogin = async () => {
    if(isValid && validPassword){
        const isLogged = await auth.signin(email, password).catch(() => {
          return false
        })
        if(isLogged){
          alert("LOGIN REALIZADO")
          navigate.push("/page/Inbox")
        } else{
          alert("EMAIL OU SENHA INCORRETO")
        }
    }
  }
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className={styles.header}>
            <div className={styles.logo}>
              <IonTitle>CodexNotes</IonTitle>
            </div>
            <div className={styles.link}>
              <IonTitle>
                <a href="http://localhost:8100/signup">Cadastro</a>
              </IonTitle>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className={styles.main}>
          <IonGrid>
            <IonRow className={styles.row} >
              <IonCol className={`${styles.col} ${styles.img}`}>
                <h1>A melhor forma de organizar as <br></br>suas tarefas do dia a dia.</h1>
                <IonImg src="../../Notes-rafiki.svg"></IonImg>
              </IonCol>
              <IonCol className={`${styles.col} ${styles.colLogin}`} >
                <div className={styles.loginArea}>
                  <h1>Login</h1>
                  <form action="submit" onSubmit={(e) => handleSubmit(e)}>
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
                        onIonInput={(event) => validatePassword(event)}
                        ></IonInput>
                    </div>
                    <p><a href="http://localhost:8100/signup">Cadastre-se</a></p>
                    <IonButton type="submit" onClick={handleLogin}>Login</IonButton>
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
