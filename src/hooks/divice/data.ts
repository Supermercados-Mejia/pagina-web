import { Device } from '@capacitor/device';

export const getDeviceInfo = async () => {
    const info = await Device.getInfo();
    const deviceId: any = await Device.getId();
    return ({
        ...info,
        deviceId: deviceId.uuid, // UUID único del dispositivo
    });
};
/* 
    <p>Modelo: {deviceInfo.model}</p>
    <p>Sistema Operativo: {deviceInfo.operatingSystem}</p>
    <p>Versión del OS: {deviceInfo.osVersion}</p>
    <p>Fabricante: {deviceInfo.manufacturer}</p>
    <p>UUID: {deviceInfo.deviceId}</p>
 */