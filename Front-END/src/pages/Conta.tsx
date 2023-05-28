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
import { useApiLogin } from "../hooks/useApiLogin";


const Conta = () => {

    const user = useContext(AuthContext);
    const api = useApiLogin();
    
    const [name, setName] = useState<string>(user.user?.nome!);
    const [age, setAge] = useState<number>(user.user?.idade!);
    const [email, setEmail] = useState<string>(user.user?.email!);


    const handleInputName = (event: any) => {
        setName(event.target.value)
    }

    const handleInputAge = (event: any) => {
     setAge(event.target.value) 
  }


    const updateData = () => {
        if(name == ""){
          setName(user.user?.nome!)
        }
        if(!age || age > 100){
          setAge(user.user?.idade!)
        }
        api.update(email, name, age)

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
                        onIonInput={handleInputName}
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
                  value={age}
                  onIonInput={handleInputAge}
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
                    value={email}
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
