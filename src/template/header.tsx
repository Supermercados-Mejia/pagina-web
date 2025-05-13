// components/Header.tsx
import { cn } from '@/utils/functions/cn';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton
} from '@ionic/react';

interface HeaderProps {
    title: string;
    showMenuButton?: boolean;
    showSearchButton?: boolean;
    className?: string;
    isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    title,
    isScrolled = false,
    showMenuButton = true,
    showSearchButton = false,
    className = ''
}) => {

    return (
        <>
            <IonHeader
                className={cn(
                    `transition-all duration-300
                ion-padding-horizontal safe-area-top`,
                    isScrolled ? 'bg-white/70 border backdrop-blur-sm' : 'bg-transparent',
                    className
                )}
            >
                <IonToolbar className='p-2 flex items-center justify-between'>
                    <IonTitle
                        className={cn(
                            "text-xl font-light tracking-tight",
                            isScrolled ? "text-purple-700" : "text-white",
                            showSearchButton ? "text-left" : "",
                        )}
                    >
                        {title}
                    </IonTitle>

                    {showMenuButton && (
                        <IonButtons slot="end">
                            <IonMenuButton className={cn(isScrolled ? 'text-purple-700' : 'text-white')} />
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default Header;