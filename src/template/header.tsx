// components/Header.tsx
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon
} from '@ionic/react';
import { menuOutline, notificationsOutline } from 'ionicons/icons';

interface HeaderProps {
    title: string;
    showRightButton?: boolean;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    title,
    showRightButton = true,
    className = ''
}) => {
    return (
        <IonHeader
            translucent
            className={`backdrop-blur-sm ion-padding-horizontal safe-area-top ${className}`}
        >
            <IonToolbar className="px-4">
                {/* Title */}
                <IonTitle
                    className="left-0 text-xl font-semibold tracking-tight">
                    {title}
                </IonTitle>

                {/* Right Side Buttons */}
                {showRightButton && (
                    <IonButtons slot="end" className="space-x-2">
                        <IonButton
                            className="text-white rounded-lg p-2"
                            style={{
                                '--color-hover': 'white',
                                '--background-hover': 'rgba(255,255,255,0.1)'
                            }}
                        >
                            <IonIcon
                                slot="icon-only"
                                icon={menuOutline}
                                className="w-6 h-6 text-inherit"
                            />
                        </IonButton>
                    </IonButtons>
                )}
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;