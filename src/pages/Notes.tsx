import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonButtons,
  IonContent,
  IonButton,
  IonModal,
  IonFooter,
  IonDatetime,
  IonDatetimeButton,
  IonList,
  IonItem,
  IonCard,
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import styles from "./Notes.module.css";
import { Card } from "../components/Card";

export type todo = {
  title: string;
  description: string;
  date: string;
  id: number;
};

const Notes = () => {
  const [todo, setTodos] = useState<todo[]>([]);

  const [modal, setShowModal] = useState<boolean>(false);

  const [date, setDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<number>(0);

  const showModal = () => setShowModal(!modal);

  const selectedDescription = (description: string) =>
    setDescription(description);

  const selectedDate = (date: string) => {
    const formattedDate = format(parseISO(date), "dd/MM/yyyy");
    setDate(formattedDate);
  };

  const selectedTitle = (title: string) => setTitle(title);

  const createTodo = () => {
    showModal();

    let objTask: todo = {
      title: title,
      date: date,
      description: description,
      id: id,
    };

    setId(id + 1);

    setTodos((todo) => [...todo, objTask]);
  };

  const deleteTodo = (id: number) => {
    var filtered = todo.filter((todo) => todo.id != id);
    setTodos(filtered);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className={styles.header}>
            <div className={styles.buttonMenu}>
              <IonButtons slot="start">
                <IonMenuButton color="tertiary" />
              </IonButtons>
              <IonTitle>Notes</IonTitle>
            </div>
            <div className="ion-padding-end">
              <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  id="datetime"
                  presentation="date"
                  showDefaultButtons={true}
                  onIonChange={(e) => selectedDate(e.detail.value as string)}
                ></IonDatetime>
              </IonModal>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      // GRID
      <IonContent fullscreen={true}>
        <IonGrid fixed={true}>
          <IonRow>
            {todo.map((item) => {
              return (
                <IonCol size="4">
                  <Card
                    title={item.title}
                    data={item.date}
                    description={item.description}
                    id={item.id}
                    deleteTodo={deleteTodo}
                  />
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonButton
          color="tertiary"
          size="large"
          expand="block"
          onClick={showModal}
        >
          Criar Task
        </IonButton>
      </IonFooter>
      // MODAL DE CRIAR TASK
      <IonModal isOpen={modal}>
        <IonHeader className="ion-margin-bottom">
          <IonToolbar>
            <IonTitle>Task</IonTitle>
            <IonButtons slot="end">
              <IonButton
                fill="solid"
                color="tertiary"
                onClick={createTodo}
                className="closeButton"
              >
                Criar Task
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem className="ion-margin-bottom">
            <IonLabel position="floating">Titulo</IonLabel>
            <IonInput
              placeholder="Titula da tarefa"
              type="text"
              counter={true}
              maxlength={15}
              required
              onIonChange={(e) => selectedTitle(e.detail.value as string)}
            ></IonInput>
          </IonItem>

          <IonItem className="ion-margin-bottom">
            <IonLabel position="floating">Description</IonLabel>
            <IonInput
              placeholder="Descricao da tarefa"
              type="text"
              counter={true}
              maxlength={30}
              required
              onIonChange={(e) => selectedDescription(e.detail.value as string)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <div className={styles.item}>
              <h3>Data:</h3>
              <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  id="datetime"
                  presentation="date"
                  locale="pt-BR"
                  showDefaultButtons={true}
                  onIonChange={(e) => selectedDate(e.detail.value as string)}
                ></IonDatetime>
              </IonModal>
            </div>
          </IonItem>
        </IonContent>
      </IonModal>
    </IonPage>
  );
};

export default Notes;
