import { navigationAdmin, navigationUser } from "@/utils/constants/router";
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonAvatar,
} from "@ionic/react";
import { Link } from "react-router-dom";

const AppMenu = () => {
    const user: any = [] //{ name: "t1", role: "user", avatar: "/default-avatar.png" }; // Replace with actual user data
    const logout = () => { }

    const getNavigation = () => {
        if (!user) return [];
        return user.role === "admin" ? navigationAdmin : navigationUser;
    };

    return (
        <IonMenu contentId="main-content" side="end">
            <IonHeader className="custom-toolbar">
                <IonToolbar>
                    {user.lenght ? (
                        <div className="p-4 text-center">
                            <IonAvatar className="mx-auto mb-3">
                                <img
                                    src={user.avatar || "/default-avatar.png"}
                                    alt="Avatar"
                                />
                            </IonAvatar>
                            <IonTitle>{user.name}</IonTitle>
                            <IonButton
                                expand="block"
                                fill="solid"
                                color="light"
                                onClick={logout}
                                className="mt-3"
                            >
                                Cerrar Sesión
                            </IonButton>
                        </div>
                    ) : (
                        <div className="p-4 space-y-3">
                            <IonButton

                                fill="solid"
                                color="light"
                                expand="block"
                                routerLink="/login"
                                className="font-semibold"
                            >
                                Iniciar Sesión
                            </IonButton>
                            <IonButton
                                color="light"
                                expand="block"
                                fill="outline"
                                routerLink="/register"
                                className="font-semibold"
                            >
                                Registrarse
                            </IonButton>
                        </div>
                    )}
                </IonToolbar>
            </IonHeader>

            <IonContent className="bg-white p-2">
                <IonList lines="none">
                    {getNavigation().map((item: any) => {
                        const Icon = item.icon;
                        return (
                            <IonItem
                                key={item.href}
                                routerLink={item.href}
                                routerDirection="none"
                                detail={false}
                                className="rounded-lg p-2"
                            >
                                <Icon size={20} className="mx-3 text-gray-600" />
                                <IonLabel className="font-medium">{item.name}</IonLabel>
                            </IonItem>
                        );
                    })}
                </IonList>

                {!user && (
                    <div className="p-4 text-sm text-gray-500">
                        <p>
                            ¿Eres proveedor?{" "}
                            <Link to="/proveedor-login" className="text-primary-600">
                                Acceso proveedores
                            </Link>
                        </p>
                    </div>
                )}
            </IonContent>
        </IonMenu>
    );
};

export default AppMenu;