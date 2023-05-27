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
import { useContext, useEffect, useState } from "react";
import styles from "./Notes.module.css";
import { Card } from "../components/Card";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useApiTask } from "../hooks/useApiTask";

export type todo = {
  _id: string;
  nome: string;
  descricao: string;
  concluida: boolean;
  usuario?: string;
  data: string;
};

export type dates = {
  date: string;
  textColor: string;
  backgroundColor: string;
  _id: string;
};


const Notes = () => {
  const api = useApiTask();


  const [todos, setTodos] = useState<todo[]>([]);

  const [datasNotes, setDatasNotes] = useState<dates[]>([]);
  
  const [modal, setShowModal] = useState<boolean>(false);
  
  const user = useContext(AuthContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [noteDate, setNoteDate] = useState<string>("");

  const showModal = () => setShowModal(!modal);

  const selectedDescription = (description: string) =>
    setDescription(description);


  const selectedNoteDate = (date: string) => {
    
    setNoteDate(date);
  };

  const selectedTitle = (title: string) => setTitle(title);

  const formatDate = (date: string) => {
    const formattedDate = format(parseISO(date), "dd/MM/yyyy");
    let year = formattedDate.substring(6, date.length);
    let day = formattedDate.substring(0, 2);
    let month = formattedDate.substring(3, 5);
    let result = day + "-" + month + "-" + year;
    return result;
  };

  const formatDateToCalendar = (date: string) => {
    const formattedDate = format(parseISO(date), "dd/MM/yyyy");
    let year = formattedDate.substring(6, date.length);
    let day = formattedDate.substring(0, 2);
    let month = formattedDate.substring(3, 5);
    let result = year + "-" + month + "-" + day;
    return result;
  };

   const addDateInCalendar = (tasks : todo) => {
    let objDates: dates = {
      _id: tasks._id,
      date: formatDateToCalendar(tasks.data),
      textColor: "#ffffff",
      backgroundColor: "#6a64ff",
    };

    setDatasNotes((datasNotes) => [...datasNotes, objDates]);
  }; 

  const createTodo = () => {
    showModal();

    if(!title || !description){
      alert("Preecha os campos")
      return;
    }
    
    if(noteDate.length == 0){
      const data = new Date()
      const dataAtual = data.toISOString();
      api.create(title, description, dataAtual, false, user.user?._id?.toString()!);
    }else{
      api.create(title, description, noteDate, false, user.user?._id?.toString()!);
    }

    setTitle("")
    setNoteDate("")
    setDescription("")
  };

  const deleteTodo = (id: string) => {
    api.deleteTodo(id)
    var filtered = todos.filter((todo) => todo._id != id);
    setTodos(filtered);
    deleteDate(id);
  };
  
  const updateTodo = (id: string) => {
    api.updateTodo(id)
  }

  const deleteDate = (id: string) => {
    var filtered = datasNotes.filter((data) => data._id != id);
    setDatasNotes(filtered);
  };

  const getTodos =  async () => {
    const allTodos = await api.getUserTodo(user.user?._id?.toString()!)
    const resultNotes = allTodos.filter((task : todo) => task.usuario == user.user?._id?.toString()!);

    resultNotes.forEach((task : todo) => {
      addDateInCalendar(task)
    });

    setTodos(resultNotes)
  }

  useEffect(() => {
      getTodos()
    },[])

    getTodos()

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
            {todos.map((item, key) => {
              return (
                <IonCol size="4">
                  <Card 
                    title={item.nome}
                    description={item.descricao}
                    data={formatDate(item.data)}
                    id={item._id}
                    done={item.concluida}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}

                  
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
              placeholder="Titulo da tarefa"
              type="text"
              counter={true}
              maxlength={15}
              required
              onIonChange={(e) => selectedTitle(e.detail.value as string)}
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
                  highlightedDates={datasNotes}
                  onIonChange={(e) =>
                    selectedNoteDate(e.detail.value as string)
                  }
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
