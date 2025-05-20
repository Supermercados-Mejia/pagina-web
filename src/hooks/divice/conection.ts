import { Network } from "@capacitor/network";

const checkNetwork = async () => {
  const status = await Network.getStatus();
  console.log(
    "Estado de la red:",
    status.connected ? "Conectado" : "Sin conexión"
  );
  console.log("Tipo de conexión:", status.connectionType);
};
