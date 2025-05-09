// components/Header.tsx
import { cn } from '@/utils/functions/cn';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton
} from '@ionic/react';
import { Menu } from 'lucide-react';

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
            className={cn(
                `bg-violet-700/90 backdrop-blur-sm ion-padding-horizontal safe-area-top
                 duration-300`, // Condición para cambiar el color
                className
            )}
        >
            <IonToolbar className="pr-4 pl-0">
                {/* Título alineado a la izquierda */}
                <IonTitle
                    slot='start'
                    className="text-left text-xl font-light tracking-tight pl-0 text-white"
                >
                    {title}
                </IonTitle>

                {/* Botones derechos */}
                {showRightButton && (
                    <IonButtons slot="end" className="space-x-2">
                        <IonButton
                            className="rounded-lg p-2"
                            style={{
                                '--color-hover': 'white',
                                '--background-hover': 'rgba(255,255,255,0.1)'
                            }}
                        >
                            <Menu className='text-white' />
                        </IonButton>
                    </IonButtons>
                )}
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;