import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonLabel, IonSegment, IonSegmentButton, IonInfiniteScroll, IonInfiniteScrollContent } from "@ionic/react";
import Footer from "@/template/footer";
import { useCallback, useEffect, useState } from "react";
import { useGetLandingMutation } from "@/hooks/reducers/api_landing";
import { loadDataFromAPI } from "@/utils/data/load-data";
import { cn } from "@/utils/functions/cn";
import { vacantes } from "../data/example";
import { SwitchContentVacantesAdmin } from "../components/content-admin";

export default function VacantesAdmin({ onScroll }: PageProps) {
    const [selectedType, setSelectedType] = useState<string>('crear');

    const [data, setData] = useState<Record<string, any>[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [getData, { isLoading }] = useGetLandingMutation();
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const handleLoadData = useCallback(async () => {
        if (selectedType !== "candidatos" || isLoading || !hasMore) return;
        try {
            const { newStates } = await loadDataFromAPI(
                getData,
                "select/postulaciones",
                [{ key: "vacante", value: "NULL", operator: "<>" }],
                currentPage
            );
            setData(prev => [...prev, ...newStates.dataTable]);
            setHasMore(newStates.dataTable.length >= 10);
            setTotalPages(newStates.totalPages);
        } catch (error: any) {
            setError(error.message);
        }
    }, [getData, currentPage, selectedType, hasMore]);

    useEffect(() => {
        setError(null);
        if (selectedType === "candidatos") {
            handleLoadData();
        } else if (selectedType === "existentes") {
            setData(vacantes);
        }
    }, [selectedType, handleLoadData]);

    const loadMore = useCallback(async (event: CustomEvent<void>) => {
        if (hasMore && selectedType === "candidatos") {
            setCurrentPage(prev => prev + 1);
        }
        (event.target as HTMLIonInfiniteScrollElement).complete();
    }, [hasMore, isLoading]);

    return (
        <IonContent
            fullscreen
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        ><IonHeader
            collapse="condense"
            className="custom-toolbar z-50 -top-16"
        >
                <IonToolbar>
                    <IonTitle
                        size="large"
                        className="text-white font-medium tracking-tight">
                        <span className="text-6xl">Liz</span>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <main className="w-full min-h-[77vh] px-4 sm:px-6 lg:px-8 pb-7">
                <div className={cn(selectedType === "crear" ? "max-w-2xl" : "max-w-6xl", "mx-auto")}>
                    <header className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Vacantes</h1>
                        <label className="space-y-1">
                            <p className="text-gray-600 text-lg">
                                {selectedType === "crear" ?
                                    "Ingresa las caracteristicas de la vacante." :
                                    "Aquí podrás ver los candidatos que se han postulado a las vacantes disponibles."}
                            </p>
                        </label>
                    </header>

                    <section className="max-w-2xl mx-auto mb-8">
                        <IonSegment
                            value={selectedType}
                            onIonChange={(e: any) => setSelectedType(e.detail.value!)}
                        >
                            <IonSegmentButton value="crear">
                                <IonLabel>Crear</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="existentes">
                                <IonLabel>Existentes</IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value="candidatos">
                                <IonLabel>Candidatos</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </section>

                    <SwitchContentVacantesAdmin type={selectedType} data={data} />

                    <IonInfiniteScroll
                        onIonInfinite={loadMore}
                        threshold="100px"
                        disabled={!hasMore || isLoading}
                    >
                        <IonInfiniteScrollContent
                            loadingText="Cargando más productos..."
                            loadingSpinner="bubbles"
                        />
                    </IonInfiniteScroll>

                    {selectedType === "candidatos" && (<span className="text-gray-500 text-sm mt-6">Pagina {currentPage} de {totalPages}</span>)}
                </div>
            </main>
            <Footer />
        </IonContent >
    );
}

