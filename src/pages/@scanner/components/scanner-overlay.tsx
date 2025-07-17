import { useCallback } from 'react';

const ScannerOverlay = ({
    onCancel,
    isScanning
}: {
    onCancel: () => void;
    isScanning: boolean;
}) => {
    if (!isScanning) return null;

    const handleCancel = useCallback(() => {
        onCancel();
    }, [onCancel]);

    return (
        <div className="fixed inset-0 z-[1000] flex flex-col">
            {/* Encabezado con botón de cancelar */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 flex justify-between items-center">
                <button
                    onClick={handleCancel}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Cancelar
                </button>

                <h2 className="text-white text-lg font-medium">Escanear código</h2>
                <div className="w-14 bg-transparent"></div> {/* Espaciador para alinear el título */}
            </div>

            {/* Área de escaneo con guías */}
            <div className="fixed inset-0 flex flex-col items-center justify-center pt-16 pb-24">
                {/* Capa de superposición con agujero central */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[320px] aspect-square"
                        style={{
                            boxShadow: "0 0 0 100vmax rgba(0, 0, 0, 0.7)",
                            clipPath: "inset(0 0 0 0 round 12px)"
                        }}
                    />
                </div>

                {/* Marco del escáner */}
                <div className="relative w-[80vw] max-w-[320px] outline-black aspect-square mb-8 z-10">
                    {/* Borde blanco con interior transparente */}
                    <div className="absolute inset-0 border-4 border-white rounded-xl bg-transparent"></div>

                    {/* Esquinas decorativas */}
                    <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-blue-500"></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-blue-500"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-blue-500"></div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-blue-500"></div>

                    {/* Línea de escaneo animada */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-blue-500 rounded-full animate-[scanLine_2.5s_infinite]"></div>
                </div>

                {/* Indicador de posición */}
                <div className="text-white text-center px-4 max-w-md z-10">
                    <p className="mb-4 text-lg font-medium">Coloca el código dentro del marco</p>
                </div>
            </div>

            {/* Mensaje de ayuda en la parte inferior */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white/80 text-sm">El escaneo es automático cuando el código está centrado</p>
            </div>
        </div>
    );
};

export default ScannerOverlay;