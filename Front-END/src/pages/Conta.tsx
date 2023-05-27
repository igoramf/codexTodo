import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonItemDivider,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton
} from "@ionic/react";
import styles from "./Conta.module.css";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/Auth/AuthContext";


const Conta = () => {
    
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const user = useContext(AuthContext);

    useEffect(() => {
      setName(user.user?.nome!)
    })



    const data = {
      firstName: {name},
      email: {email},
      senha: {senha},
      age: {age}
    }

    const updateData = () => {
        
    }

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
        <div className={styles.main}>
          <h1>Configuracoes da Conta</h1>
          <hr color="white" />
          <form action="">
                <div className={styles.forms}>
                    <IonItem>
                        <IonInput
                        label="Nome"
                        labelPlacement="stacked"
                        value={name}
                        clearInput={true}
                        placeholder="Digite o seu nome"
                        onIonChange={(e) => setName(e.detail.value as string)}
                        ></IonInput>
                    </IonItem>
                </div>
                <div className={styles.forms}>
                    <IonItem>
                        <IonInput
                        label="Genero"
                        labelPlacement="stacked"
                        clearInput={true}
                        value={user.user?.genero}
                        onIonChange={(e) => setName(e.detail.value as string)}
                        disabled
                        ></IonInput>
                    </IonItem>
                </div>
                <div className={styles.forms}>
              <IonItem>
                <IonInput
                  label="Idade"
                  labelPlacement="stacked"
                  clearInput={true}
                  placeholder="Digite a sua idade"
                  value={user.user?.idade}
                  onIonChange={(e) => setAge(parseInt(e.detail.value as string))}
                ></IonInput>
              </IonItem>

                </div>
                <div className={styles.forms}>
              <IonItem>
                <IonInput
                  label="Senha"
                  labelPlacement="stacked"
                  clearInput={true}
                  placeholder="Digite a sua senha nova"
                  value={"12334567"}
                  onIonChange={(e) => setSenha(e.detail.value as string)}
                  type="password"
                  disabled
                ></IonInput>
              </IonItem>

                </div>
                <div className={styles.forms}>

                <IonItem>
                    <IonInput
                    label="Email"
                    labelPlacement="stacked"
                    clearInput={true}
                    placeholder="Digite seu nome"
                    value={user.user?.email}
                    disabled
                    ></IonInput>
                </IonItem>

                </div>
            <IonButton type='submit' onClick={updateData}>Atualizar Perfil</IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Conta;
