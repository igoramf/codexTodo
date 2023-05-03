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
import { format, parse, parseISO } from "date-fns";
import { useState } from "react";
import styles from "./Notes.module.css";
import { Card } from "../components/Card";

export type todo = {
  title: string;
  description: string;
  date: string;
  id: number;
};

export type dates = {
  date: string,
  textColor: string,
  backgroundColor: string,
  id: number
}

const Notes = () => {
  const [todos, setTodos] = useState<todo[]>([]);

  const [datasNotes, setDatasNotes] = useState<dates[]>([]);

  const [modal, setShowModal] = useState<boolean>(false);

  const [date, setDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState<number>(0);
  const [noteDate, setNoteDate] = useState<string>("");


  const showModal = () => setShowModal(!modal);

  const selectedDescription = (description: string) =>
    setDescription(description);

  const selectedDate = (date: string) => {
    const formattedDate = format(parseISO(date), "dd/MM/yyyy");
    setDate(formattedDate);
  };

  const selectedNoteDate = (date: string) => {
    const formattedDate = format(parseISO(date), "dd/MM/yyyy");
    setNoteDate(formattedDate);
  }

  const selectedTitle = (title: string) => setTitle(title);


  const formatDate = (date: string) => {
    let year = date.substring(6, date.length);
    let day = date.substring(0, 2);
    let month = date.substring(3,5);
    let result = year + "-" + month + "-" + day;
    return result
  }

  const addDateInCalendar = () => {
   
      let objDates: dates = {
        date: formatDate(noteDate),
        textColor: "#ffffff",
        backgroundColor: "#6a64ff",
        id: id
    }

    setDatasNotes((datasNotes) => [...datasNotes, objDates]);
  }


  const createTodo = () => {
    showModal();

    let objTask: todo = {
      title: title,
      date: noteDate,
      description: description,
      id: id,
    };

    setId(id + 1);

    setTodos((todo) => [...todo, objTask]);
    addDateInCalendar()
  };

  const deleteTodo = (id: number) => {
    var filtered = todos.filter((todo) => todo.id != id);
    setTodos(filtered);
    deleteDate(id)
  };

  const deleteDate = (id: number) => {
    var filtered = datasNotes.filter((data) => data.id != id)
    setDatasNotes(filtered)
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
              <IonTitle>Notes</IonTitle>
            </div>
            <div className="ion-padding-end">
              <IonDatetimeButton datetime="datetime-header"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime
                  id="datetime-header"
                  presentation="date"
                  locale="pt-BR"
                  showDefaultButtons={true}
                  highlightedDates={datasNotes}
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
            {todos.map((item) => {
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
                  onIonChange={(e) => selectedNoteDate(e.detail.value as string)}
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
