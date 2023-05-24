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
import axios from "axios";

const SignUp = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();


  const [validPassword, setValidPassword] = useState<boolean>();
  const [validAge, setValidAge] = useState<boolean>();
  const [validName, setValidName] = useState<boolean>();
  const [validGenero, setValidGenero] = useState<boolean>();
  

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  


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
    setEmail(value);

    if (value === "") return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  const validatePassword = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    if (value == "" || value.length < 8) {
      setValidPassword(false);
    } else {
      setPassword(value);
      setValidPassword(true);
    }
  };

  const validateName = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    if (value == "") {
      setValidName(false);
    } else {
      setName(value);
      setValidName(true);
    }
  };

  const validateGenero = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    if (value == "") {
      setValidGenero(false);
    } else {
      setGenero(value);
      setValidGenero(true);
    }
  };

  const validateAge = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;

    if (parseInt(value) == 0) {
      setValidAge(false);
    } else {
      setAge(parseInt(value));
      setValidAge(true);
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || !validPassword ||  !validName || !validAge || !validGenero) alert("PREENCHA TODOS OS CAMPOS");
};

  const handleSignUp = async () => {
    if (isValid && validPassword && validName) {
     const created = await auth.signup(email, name, age, genero, password);

      if (created) {
        alert("Usuario CRIADO")
        setTimeout(() => {
          navigate.push("/page/Inbox");
        }, 1000)
      } else {
        alert("EMAIL OU SENHA INCORRETOS");
      }
    }
  };

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
                <a href="http://localhost:8100/signin">Login</a>
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
                <h1>
                  Realize o cadastro e utilize da melhor forma <br></br> de
                  organizar as suas tarefas do dia a dia.
                </h1>
                <IonImg src="../../Notes-rafiki.svg"></IonImg>
              </IonCol>
              <IonCol className={`${styles.col} ${styles.colLogin}`}>
                <div className={styles.loginArea}>
                  <h1>Cadastro</h1>
                  <form action="submit" onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.Input}>
                      <IonInput
                        label="Nome"
                        labelPlacement="floating"
                        fill="solid"
                        type="text"
                        onIonInput={(event) => validateName(event)}
                      ></IonInput>
                    </div>
                    <div className={styles.Input}>
                      <IonInput
                        label="Sobrenome"
                        labelPlacement="floating"
                        fill="solid"
                        type="text"
                        onIonInput={(event) => validateGenero(event)}
                      ></IonInput>
                    </div>
                    <div className={styles.Input}>
                      <IonInput
                        label="Idade"
                        labelPlacement="floating"
                        fill="solid"
                        type="number"
                        onIonInput={(event) => validateAge(event)}
                      ></IonInput>
                    </div>
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
                    <p>
                      <a href="http://localhost:8100/signin">Faca o Login</a>
                    </p>
                    <IonButton type="submit" onClick={handleSignUp}>
                      Cadastre-se
                    </IonButton>
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

export default SignUp;