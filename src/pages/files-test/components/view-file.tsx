import { IonList } from "@ionic/react";
import { CardFile } from "./card-file";
import { useState } from "react";

export default function ViewFile() {
    const [file, setFile] = useState()
    return (
        <section className="flex items-center justify-center w-full h-full p-4 gap-4">
            <IonList>
                <CardFile selectFile={(file: any) => setFile(file)} />
            </IonList>

            <div className="text-center mt-4 border rounded-lg p-4 bg-gray-100">
                <p className="text-gray-600">No hay más archivos para mostrar.</p>
            </div>
        </section>
    );
} 