import { IonList } from "@ionic/react";
import { CardFile } from "./card-file";
import { useEffect, useState } from "react";
import { cn } from "@/utils/functions/cn";
import { X } from "lucide-react";
import { getDeviceInfo } from "@/hooks/divice/data";

export default function ViewFile() {
    const [file, setFile] = useState<string | null>(null);
    const [previewError, setPreviewError] = useState(false);
    async function PlataformLoader() {
        const dataDivice = await getDeviceInfo()
        console.log(dataDivice.platform);
    }
    const handlePreviewError = () => {
        setPreviewError(true)
    };
    useEffect(() => {
        PlataformLoader();
    }, []);
    return (
        <section className="flex flex-col md:flex-row items-center justify-center w-full h-full p-4 gap-4">
            <IonList className={cn("w-full max-w-sm", file && "hidden")}>
                <CardFile selectFile={(file: any) => setFile(file)} />
            </IonList>

            <article className="text-center w-full max-w-2xl border rounded-lg p-4 bg-gray-100 min-h-[300px] flex items-center justify-center">
                {file ? (
                    <div className="w-full relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                                setPreviewError(false);
                            }}
                            className="absolute z-50 bg-white/70 rounded-full p-1 shadow-md -right-2 -top-2 hover:bg-gray-100 transition-colors"
                        >
                            <X className="text-red-600 w-5 h-5" />
                        </button>

                        <div
                            className="w-full h-96 cursor-pointer"
                            onClick={() => window.open(file, "_blank")}
                        >
                            {!previewError ? (
                                <iframe
                                    src={file}
                                    className="w-full h-full border-0 rounded-lg"
                                    title="Vista previa del archivo"
                                    onError={handlePreviewError}
                                    allowFullScreen
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full space-y-2">
                                    <span>Error al cargar la previsualización</span>
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => window.open(file, "_blank")}
                                    >
                                        Abrir en nueva pestaña
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-600">No hay archivos para mostrar</p>
                )}
            </article>
        </section>
    );
} 