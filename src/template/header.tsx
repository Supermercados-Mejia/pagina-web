// components/Header.tsx
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon
} from '@ionic/react';
import { menuOutline } from 'ionicons/icons';

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
        <IonHeader className={`bg-[#2b3e50] text-white shadow-md ${className}`}>
            <IonToolbar className="px-4">
                {/* Title */}
                <IonTitle className="text-xl font-semibold tracking-tight space-x-2" slot='start'>
                    {title}
                </IonTitle>

                {/* Right Side Buttons */}
                {showRightButton && (
                    <IonButtons slot="end" className="space-x-2">
                        <IonButton
                            onClick={() => console.log('Notifications clicked')}
                            className="text-white hover:bg-white/10 rounded-lg p-2 transition-colors"
                        >
                            <IonIcon slot="icon-only" icon={menuOutline} className="w-6 h-6" />
                        </IonButton>
                    </IonButtons>
                )}
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;