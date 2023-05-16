import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonItemDivider,
  IonButton,
} from "@ionic/react";
import styles from "./Conta.module.css";
import { useEffect, useState } from "react";
import axios from 'axios';
import { set } from "date-fns";


const Conta = () => {
    
    const [name, setName] = useState<string>("");
    const [age, setAge] = useState<number>(0);
    const [email, setEmail] = useState<string>("");


    const submit = () => {
        let response = axios.get("https://dummyjson.com/users/1");
        response.then((res) => {
            console.log(res.data)
            renderData(res.data.age, res.data.firstName, res.data.email)
        }).catch((e) => console.log(`erro na requisicao: ${e}`))
    }

    const renderData = (age: number, name: string , email: string) => {
        setName(name)
        setAge(age)
        setEmail(email)
    }

    useEffect(submit,[])

    const data = {
      firstName: {name},
      email: {email},
      age: {age}
    }

    const updateData = () => {
        axios.put("https://dummyjson.com/users/add", data)
    }

    return (
    <IonPage>
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
                        clearInput={true}
                        placeholder="Digite o seu nome"
                        value={name}
                        onIonChange={(e) => setName(e.detail.value as string)}
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
                  onIonChange={(e) => setAge(parseInt(e.detail.value as string))}
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
