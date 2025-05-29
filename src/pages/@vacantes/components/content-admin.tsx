import MainForm from "@/components/form/main-form";
import { VacantesField } from "../utils/vacantes-field";
import { CardCandidato } from "./card-candidato";
import { CardVacante } from "./card-vacante";
import { IonList } from "@ionic/react";

type SwitchContentVacantesAdminProps = {
    type: string;
    data: any;
};

export const SwitchContentVacantesAdmin: React.FC<SwitchContentVacantesAdminProps> = ({ type, data }) => {
    switch (type) {
        case "candidatos":
            if (!data || data.length === 0) return <p>Actualmente no hay candidatos interesados.</p>;
            return (
                <IonList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item: any, index: any) => item.fecha_registro &&
                        (<CardCandidato candidato={item} index={index} key={index} />)
                    )}
                </IonList>
            );
        case "existentes":
            return (
                <IonList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item: any, index: any) => (
                        <CardVacante vacante={item} index={index} key={index} />
                    ))}
                </IonList>
            );
        default:
            return (
                <MainForm
                    actionType={'vacantes'}
                    dataForm={VacantesField()}
                    aditionalData={{
                        fechaPublicacion: new Date()
                    }}
                    message_button="registrar"
                />
            );
    }
};