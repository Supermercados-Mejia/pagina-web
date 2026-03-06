import Footer from "@/template/footer";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonSegment, IonLabel, IonSegmentButton, IonBackButton, IonSpinner } from "@ionic/react";
import { vacantes } from "../data/example";
import { useState, useEffect } from "react";
import { CardVacante } from "../components/card-vacante";
import { IconLiz } from "@/template/icon-liz";

export default function VacantesUser({ onScroll }: PageProps) {
    const [selectedDepartment, setSelectedDepartment] = useState<string>('todo');
    const [isLoading, setIsLoading] = useState(true);

    // Simula un proceso de carga (por ejemplo, fetching de datos)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Tiempo de simulación de carga
        return () => clearTimeout(timer);
    }, []);

    // Filtrar vacantes basado en la selección
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
                className="custom-toolbar-clear h-fit absolute -top-0"
            >
                <IonToolbar>
                    <a className="cursor-pointer" href="/">
                        <IconLiz fill={onScroll ? "#FFF" : "#7927F5"} width={55} />
                    </a>
                </IonToolbar>
            </IonHeader>
            <section className="flex my-4">
                <IonBackButton color={"tertiary"} text={"Regresar"} defaultHref="/" />
            </section>
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-6xl mx-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Vacantes</h1>
                        <label className="space-y-1">
                            <p className="text-gray-600 text-lg">En esta sección podrás ver las vacantes disponibles</p>
                            <p className="text-gray-600 text-lg">Sé parte de nuestra familia.</p>
                        </label>
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

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <IonSpinner name="crescent" color="tertiary" style={{ width: '50px', height: '50px' }} />
                                <p className="text-gray-600 mt-4">Cargando vacantes, por favor espera...</p>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredVacantes.length ? (
                                    filteredVacantes.map((item: any, index) => (
                                        <CardVacante vacante={item} index={index} key={index} />
                                    ))
                                ) : (
                                    <li className="m-auto list-none col-span-3">
                                        Actualmente no hay vacantes disponibles {selectedDepartment !== "todo" && "en esta área"}, vuelve en otro momento.
                                    </li>
                                )}
                            </ul>
                        )}
                    </section>
                </div>
            </main>
            <Footer />
        </IonContent>
    );
}