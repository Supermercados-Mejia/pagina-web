import { IonList } from "@ionic/react";
import { CardFile } from "./card-file";

export default function ViewFile() {
    return (
        <div className="view-file">
            <IonList>
                <CardFile />
            </IonList>
        </div>
    );
} 