import Footer from "@/template/footer";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonSegment, IonLabel, IonSegmentButton } from "@ionic/react";
import { vacantes } from "../data/example";

export default function VacantesUser({ onScroll }: PageProps) {
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
                        <IonSegment value="todo">
                            <IonSegmentButton value="todo">
                                <IonLabel>Todo</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="sistemas">
                                <IonLabel>Sistemas</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="seguriada">
                                <IonLabel>Seguriada</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="cajas">
                                <IonLabel>Cajas</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="almacen">
                                <IonLabel>Almacen</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </div>

                    <section aria-labelledby="job-openings-heading" className="mt-6">
                        <h2 id="job-openings-heading" className="sr-only">Posiciones Disponibles</h2>

                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {vacantes.length ? vacantes.map((item: any, index) => (
                                <li key={index} className="list-none">
                                    <article
                                        aria-labelledby={`position-${index}`}
                                        className="bg-white border border-gray-200 rounded-xl p-6 transition-all
                                     hover:shadow-lg cursor-pointer h-full
                                     flex flex-col"
                                    >
                                        <header className="flex justify-between items-start gap-3 mb-4">
                                            <h3 id={`position-${index}`} className="text-xl font-semibold text-gray-900">
                                                {item.titulo}
                                            </h3>
                                            <span className="border font-bold text-xs px-3 py-1 rounded-full shrink-0">
                                                {item.tipo}
                                            </span>
                                        </header>
                                        <p className="text-gray-600 mb-4 flex-grow">
                                            {item.descripcion}
                                        </p>
                                        <footer className="mt-auto">
                                            <button className="text-purple-600 hover:text-purple-800 hover:underline font-medium text-sm">
                                                Ver detalles →
                                            </button>
                                        </footer>
                                    </article>
                                </li>
                            )) : (<li className="m-auto list-none col-span-3"> Actualmente no hay vacantes disponibles, vuelve en otro momento. </li>)}
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </IonContent>)
}