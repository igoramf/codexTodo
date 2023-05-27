import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import '../theme/variables.css';
import { trashBin, checkmarkCircle } from 'ionicons/icons';
import styles from './Card.module.css'
import { useEffect, useState } from "react";

export type props = {
    title: string,
    description: string,
    data: string,
    id: string,
    done: boolean,
    deleteTodo: (id: string) => void;
    updateTodo: (id: string) => void;
}

export const Card = ( {title, data, description, id, deleteTodo, updateTodo, done} : props ) => {
  
  useEffect(() => {
    if(done){
      setColorDone("success")
    }
  }, [])
  
  const [colorDone, setColorDone] = useState<string>("light");

  const update = () =>  {
    setColorDone("success")
    updateTodo(id)
  }
  

  return (
    <IonCard color={colorDone}>
      <IonCardHeader>
        <IonCardTitle>{title.toUpperCase()}</IonCardTitle>
        <IonCardSubtitle><data className={styles.data}>{data}</data></IonCardSubtitle>
      </IonCardHeader>
      
      <IonCardContent>
        {description}
      </IonCardContent>

      <div className={styles.buttons}>
        <IonButton fill="clear" onClick={() => update()}><IonIcon slot="start" icon={checkmarkCircle}></IonIcon></IonButton>
        <IonButton fill="clear" onClick={() => deleteTodo(id)}><IonIcon slot="start" icon={trashBin}></IonIcon></IonButton>
      </div>
    </IonCard>
  );
};

