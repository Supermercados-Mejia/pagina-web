import { useCallback, useEffect, useState } from "react";
import Pagination from "@/components/pagination";
import { useGetLandingMutation } from "@/hooks/reducers/api_landing";
import DynamicTable from "@/components/table";
import { loadDataFromAPI } from "@/utils/data/load-data";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

export default function AdminPostulaciones({ onScroll }: PageProps) {
    const [data, setData] = useState<Record<string, any>[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [getData, { isLoading }] = useGetLandingMutation();
    const [error, setError] = useState<string | null>(null);

    const handleLoadData = useCallback(async () => {
        try {
            const { newStates, inventario } = await loadDataFromAPI(getData, "select/postulaciones", [], currentPage);
            setData(newStates.dataTable);

            setTotalPages(newStates.totalPages);

        } catch (error: any) {
            setError(error.message);
        }
    }, [getData, currentPage]);

    useEffect(() => {
        handleLoadData();
    }, [handleLoadData]);

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
            <div className="w-4/5 m-auto mt-10">
                {error ? (
                    <label className="text-red-600 text-xl">
                        Ocurrio un error al consultar los datos, intente mas tarde o contacte a soporte.
                    </label>)
                    : (<DynamicTable data={data} />)}
                <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} loading={isLoading} />
            </div>
        </IonContent>
    );
}