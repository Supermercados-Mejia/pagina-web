import { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { scanBarcode, prepareScanner, stopScan, checkPermissions } from './utils/scanner';
import { PageProps } from '@/utils/types/page';
import ScannerOverlay from './components/scanner-overlay';

const ScannerComponent = ({ onScroll }: PageProps) => {
    const [barcode, setBarcode] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    // Preparar el escáner y verificar permisos
    useEffect(() => {
        const initializeScanner = async () => {
            try {
                await prepareScanner();
                const granted = await checkPermissions();
                setHasPermission(granted);
            } catch (err: any) {
                setError(err.message || 'Error inicializando escáner');
            }
        };

        initializeScanner();

        return () => {
            stopScan();
        };
    }, []);

    const handleScan = async () => {
        setIsScanning(true);
        setError('');
        setBarcode('');

        try {
            const result = await scanBarcode();
            setBarcode(result);
        } catch (err: any) {
            setError(err.message || 'Error en escaneo');
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <IonContent
            fullscreen
            className={isScanning ? 'scanner-active' : ''}
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        >
            <IonHeader collapse="condense" className="custom-toolbar z-50 -top-16">
                <IonToolbar>
                    <IonTitle size="large" className="text-white text-5xl p-2 font-medium h-full">
                        Liz
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <main className="w-full min-h-[75vh] px-4 sm:px-6 lg:px-8 pb-7">
                <ScannerOverlay
                    isScanning={isScanning}
                    onCancel={() => stopScan().then(() => setIsScanning(false))}
                />

                {/* Contenido principal */}
                <div className="p-4 max-w-md mx-auto">

                    {!isScanning && (
                        <div className="space-y-6">
                            {!hasPermission ? (
                                <div className="p-4 bg-yellow-100 rounded-lg border border-yellow-300">
                                    <p className="text-yellow-700">
                                        Permiso de cámara requerido. Por favor habilita los permisos en la configuración de tu dispositivo.
                                    </p>
                                </div>
                            ) : (
                                <IonButton
                                    expand="block"
                                    onClick={handleScan}
                                    className="bg-blue-600 text-white py-4 rounded-xl shadow-md hover:bg-blue-700 transition"
                                    disabled={isScanning}
                                >
                                    {isScanning ? 'Escaneando...' : 'Escanear Código'}
                                </IonButton>
                            )}

                            {barcode && (
                                <div className="p-4 bg-green-100 rounded-lg border border-green-300">
                                    <h2 className="font-semibold text-lg mb-2">Resultado:</h2>
                                    <p className="font-mono text-gray-800 break-all">{barcode}</p>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-red-100 rounded-lg border border-red-300">
                                    <h2 className="font-semibold text-lg mb-2 text-red-800">Error:</h2>
                                    <p className="text-red-700">{error}</p>
                                </div>
                            )}

                            <div className="mt-8 text-center text-gray-500">
                                <p className="mb-2">Coloca el código dentro del marco para escanear</p>
                                <div className="inline-block border-2 border-dashed border-gray-400 p-2 rounded-lg">
                                    <div className="bg-gray-200 border-2 border-gray-300 w-24 h-24" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </IonContent>
    );
};

export default ScannerComponent;