import React, { useRef, useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonImg,
  IonInput,
} from "@ionic/react";

import "./Card.module.css";
import { useApiTask } from "../hooks/useApiTask";

import { useIonRouter } from "@ionic/react";

export type modalProps = {
  handleModal: () => void;
  isOpen: boolean;
  id: string;
};

const CardModal = ({ handleModal, isOpen, id }: modalProps) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const api = useApiTask();

  const updateTodo = () => {
    if (!title || !description) {
      alert("Preecha os campos");
      return;
    }

    api.updateTodoItem(id, title, description);

    setTitle("");
    setDescription("");
  };

  const process = () => {
    updateTodo();
    handleModal();
    window.location.reload()
  };


  return (
    <IonModal
      id="example-modal"
      ref={modal}
      trigger="open-modal"
      isOpen={isOpen}
    >
      <IonContent>
        <IonToolbar className="ion-margin-bottom">
          <IonTitle>Modal</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary-contrast" onClick={process}>
              Atualizar Task
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonList>
          <IonItem className="ion-margin-bottom">
            <IonLabel position="floating">Titulo</IonLabel>
            <IonInput
              placeholder="Titulo da tarefa"
              type="text"
              counter={true}
              maxlength={15}
              required
              onIonChange={(e) => setTitle(e.detail.value as string)}
            ></IonInput>
          </IonItem>

          <IonItem className="ion-margin-bottom">
            <IonLabel position="floating">Descricao</IonLabel>
            <IonInput
              placeholder="Descricao da tarefa"
              type="text"
              counter={true}
              maxlength={30}
              required
              onIonChange={(e) => setDescription(e.detail.value as string)}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default CardModal;
