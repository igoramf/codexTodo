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
import { trashBin, checkmarkCircle, create } from 'ionicons/icons';
import styles from './Card.module.css'
import { useEffect, useState } from "react";
import CardModal from "./CardModal"

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
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const update = () =>  {
    setColorDone("success")
    updateTodo(id)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  

  return (
    <IonCard color={colorDone}>
      <IonCardHeader>
        <div className={styles.header}>
          <div className={styles.title}>
            <IonCardTitle>{title.toUpperCase()}</IonCardTitle>
            <IonCardSubtitle><data className={styles.data}>{data}</data></IonCardSubtitle>
          </div>
          <div className={styles.edit}>
            <IonButton fill="clear" onClick={handleModal}><IonIcon slot="end" icon={create}></IonIcon></IonButton>
          </div>
        </div>
      </IonCardHeader>
      
      <IonCardContent>
        {description}
      </IonCardContent>

      <div className={styles.buttons}>
        <IonButton fill="clear" onClick={() => update()}><IonIcon slot="start" icon={checkmarkCircle}></IonIcon></IonButton>
        <IonButton fill="clear" onClick={() => deleteTodo(id)}><IonIcon slot="start" icon={trashBin}></IonIcon></IonButton>
      </div>

    {isOpen &&
      <CardModal isOpen={isOpen} handleModal={handleModal} id={id}/>
    }


    </IonCard>
  );
};

