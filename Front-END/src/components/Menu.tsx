import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonAvatar,
  IonButton,
  useIonRouter,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  bookmarksOutline,
  bookmarksSharp,
  checkmarkDoneOutline,
  exit,
  settingsOutline,
  settingsSharp,
  trashOutline,
  trashSharp,
} from "ionicons/icons";
import "./Menu.css";
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth/AuthContext";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Notes",
    url: "/page/notes",
    iosIcon: bookmarksOutline,
    mdIcon: bookmarksSharp,
  },
  {
    title: "Concluidas",
    url: "/page/concluidas",
    iosIcon: checkmarkDoneOutline,
    mdIcon: checkmarkDoneOutline,
  },
  {
    title: "Trash",
    url: "/page/Trash",
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: "Conta",
    url: "/page/conta",
    iosIcon: settingsOutline,
    mdIcon: settingsSharp,
  },
  {
    title: "Sair",
    url: "/signin",
    iosIcon: exit,
    mdIcon: exit,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    auth.signout();
    window.location.href = window.location.href
  };

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <div className="user">
            <IonAvatar>
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>
            <IonListHeader>{auth.user?.nome}</IonListHeader>
          </div>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  onClick={appPage.title == "Sair" ? handleLogout : () => console.log("")}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
