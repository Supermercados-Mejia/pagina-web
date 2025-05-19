import Footer from "@/template/footer";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonSegment, IonLabel, IonSegmentButton } from "@ionic/react";
import { vacantes } from "../data/example";
import { useState } from "react";
import { CardVacante } from "../components/card-vacante";

export default function VacantesUser({ onScroll }: PageProps) {

    const [selectedDepartment, setSelectedDepartment] = useState<string>('todo');

    // 2. Filtrar vacantes basado en la selección
    const filteredVacantes = vacantes.filter(item =>
        selectedDepartment === 'todo'
            ? true
            : item.departamento.toLowerCase() === selectedDepartment
    );

    return (
        <IonContent
            fullscreen
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        >
            <IonHeader
                collapse="condense"
                className="custom-toolbar z-50 -top-16">
                <IonToolbar>
                    <IonTitle
                        size="large"
                        className="text-white font-medium tracking-tight">
                        <span className="text-6xl">Liz</span>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Vacantes</h1>
                        <div className="space-y-1">
                            <p className="text-gray-600 text-lg">En esta sección podrás ver las vacantes disponibles</p>
                            <p className="text-gray-600 text-lg">Sé parte de nuestra familia.</p>
                        </div>
                    </header>

                    <div className="max-w-2xl mx-auto mb-8">
                        <IonSegment
                            value={selectedDepartment}
                            onIonChange={(e: any) => setSelectedDepartment(e.detail.value!)}
                        >
                            <IonSegmentButton value="todo">
                                <IonLabel>Todo</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="sistemas">
                                <IonLabel>Sistemas</IonLabel>
                            </IonSegmentButton>
                            {/* 4. Corregir typo en seguridad */}
                            <IonSegmentButton value="seguridad">
                                <IonLabel>Seguridad</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="cajas">
                                <IonLabel>Cajas</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="almacen">
                                <IonLabel>Almacén</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </div>


                    <section aria-labelledby="job-openings-heading" className="mt-6">
                        <h2 id="job-openings-heading" className="sr-only">Posiciones Disponibles</h2>

                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVacantes.length ? filteredVacantes.map((item: any, index) => (
                                <CardVacante vacante={item} index={index} key={index} />
                            )) : (<li className="m-auto list-none col-span-3"> Actualmente no hay vacantes disponibles, vuelve en otro momento. </li>)}
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </IonContent>)
}