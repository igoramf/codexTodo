import { IonContent, IonPage } from '@ionic/react';
import styles from './Inbox.module.css'

const Inbox = () => {
    return (
        <IonPage>
            <IonContent fullscreen={true}>
                <div className={styles.div}>
                    <h1>BEM VINDO</h1>
                    <h1>IGOR</h1>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Inbox;