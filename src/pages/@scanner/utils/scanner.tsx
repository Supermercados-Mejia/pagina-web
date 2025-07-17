import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { isPlatform } from '@ionic/react';

export async function scanBarcode(): Promise<string> {
    try {
        // Verificar permisos
        const status = await BarcodeScanner.checkPermission({ force: true });

        if (status.denied) {
            throw new Error('Permiso de cámara denegado. Por favor habilítalo en ajustes del dispositivo.');
        }

        if (!status.granted) {
            throw new Error('Permiso de cámara no concedido');
        }

        // Configurar UI para escaneo
        await BarcodeScanner.hideBackground();
        document.body.classList.add('barcode-scanner-active'); // Nombre corregido

        // Iniciar escaneo
        const result = await BarcodeScanner.startScan();

        // Detener y limpiar
        await stopScan();

        // Procesar resultado
        if (result.hasContent) {
            return result.content!;
        }
        throw new Error('Escaneo cancelado');

    } catch (error) {
        await stopScan();
        throw error;
    }
}

export async function stopScan(): Promise<void> {
    try {
        await BarcodeScanner.stopScan();
        document.body.classList.remove('barcode-scanner-active'); // Nombre corregido
    } catch (error) {
        console.warn('Error al detener escáner', error);
    }
}

export async function prepareScanner(): Promise<void> {
    if (isPlatform('hybrid')) {
        await BarcodeScanner.prepare();
    }
}

export async function checkPermissions(): Promise<boolean> {
    if (!isPlatform('hybrid')) return false;

    const status = await BarcodeScanner.checkPermission();
    return status.granted ? true : false;
}