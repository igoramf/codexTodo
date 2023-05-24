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
import { useState } from "react";

export type props = {
    title: string,
    description: string,
    data: string,
    id: number,
    deleteTodo: (id: number) => void;
}

export const Card = ( {title, data, description, id, deleteTodo} : props ) => {

  const [colorDone, setColorDone] = useState<string>("light");

  return (
    <IonCard color={colorDone}>
      <IonCardHeader>
        <IonCardTitle>{title.toUpperCase()}</IonCardTitle>
        <IonCardSubtitle> {data}</IonCardSubtitle>
      </IonCardHeader>
      
      <IonCardContent>
        {description}
      </IonCardContent>

      <div className={styles.buttons}>
        <IonButton fill="clear" onClick={() => {setColorDone("warning")}}><IonIcon slot="start" icon={checkmarkCircle}></IonIcon></IonButton>
        <IonButton fill="clear" onClick={() => deleteTodo(id)}><IonIcon slot="start" icon={trashBin}></IonIcon></IonButton>
      </div>
    </IonCard>
  );
};
