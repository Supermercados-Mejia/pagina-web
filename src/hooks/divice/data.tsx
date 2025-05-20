import { useEffect, useState } from 'react';
import { Device } from '@capacitor/device';

const DeviceInfoComponent = () => {
    const [deviceInfo, setDeviceInfo] = useState<any>(null);

    useEffect(() => {
        const getDeviceInfo = async () => {
            const info = await Device.getInfo();
            const deviceId: any = await Device.getId();
            setDeviceInfo({
                ...info,
                deviceId: deviceId.uuid, // UUID único del dispositivo
            });
        };

        getDeviceInfo();
    }, []);

    return (
        <div>
            {deviceInfo ? (
                <div>
                    <p>Modelo: {deviceInfo.model}</p>
                    <p>Sistema Operativo: {deviceInfo.operatingSystem}</p>
                    <p>Versión del OS: {deviceInfo.osVersion}</p>
                    <p>Fabricante: {deviceInfo.manufacturer}</p>
                    <p>UUID: {deviceInfo.deviceId}</p>
                </div>
            ) : (
                <p>Cargando información del dispositivo...</p>
            )}
        </div>
    );
};

export default DeviceInfoComponent;