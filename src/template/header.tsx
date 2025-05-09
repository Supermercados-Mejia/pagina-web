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
    showSearchButton?: boolean;
    className?: string;
    isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    title,
    isScrolled = false,
    showRightButton = true,
    showSearchButton = false,
    className = ''
}) => {

    return (
        <IonHeader
            className={cn(
                `transition-all duration-300
                ion-padding-horizontal safe-area-top`,
                isScrolled ? 'bg-white/80 border backdrop-blur-sm' : 'bg-transparent',
                className
            )}
        >
            <IonToolbar>
                <IonTitle
                    className={cn(
                        "text-xl font-light tracking-tight pl-0", isScrolled ? "text-purple-700" : "text-white",
                        showSearchButton ? "text-left" : ""
                    )}
                >
                    {title}
                </IonTitle>

                {showRightButton && (
                    <IonButtons slot="end" className="space-x-2">
                        <IonButton
                            fill="clear"
                            className="rounded-lg p-2 hover:bg-white/10 transition-colors"
                        >
                            <Menu className={cn(isScrolled ? 'text-purple-700' : 'text-white')} size={24} />
                        </IonButton>
                    </IonButtons>
                )}
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;