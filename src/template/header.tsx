
import { useAppSelector } from '@/hooks/selector';
import { RootState } from '@/hooks/store';
import { formatValue } from '@/utils/constants/format-values';
import { cn } from '@/utils/functions/cn';
import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonBackButton,
    IonBadge,
    IonItem,
} from '@ionic/react';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { IconLiz } from './icon-liz';

interface HeaderProps {
    isScrolled?: boolean;
    showMenuButton?: boolean;
    showScrollBarr?: boolean;
    showBackButton?: boolean;
    className?: string;
    defaultBack?: string;
    mobileScreen?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    isScrolled = false,
    showMenuButton = true,
    showScrollBarr = false,
    showBackButton = false,
    className = '',
    defaultBack,
    mobileScreen
}) => {
    const mobile = mobileScreen;
    return (
        <>
            <IonHeader
                className={cn(
                    `transition-all duration-300 safe-area-top`,
                    showBackButton || isScrolled
                        ? 'bg-white/70 border-b backdrop-blur-md border-gray-200 shadow-md'
                        : 'bg-transparent',
                    className
                )}
            >
                <IonToolbar className='p-2 flex items-center relative'>
                    {showBackButton && (
                        <IonButtons slot="start">
                            <IonBackButton
                                defaultHref={defaultBack ?? "/"}
                                className={'text-purple-700'}
                                text="Atras"
                            />
                        </IonButtons>
                    )}

                    <section slot="end" className='flex flex-1 justify-center items-center mt-2 absolute left-0 right-0 top-0 z-50'>
                        {isScrolled && (
                            <a className='decoration-none cursor-pointer' href='/'>
                                <IconLiz className='mx-auto' fill={"#7927F5"} width={35} />
                            </a>
                        )}
                    </section>

                    {!mobile && showMenuButton && (
                        <IonButtons slot="end">
                            <IonMenuButton className={cn(
                                showBackButton || isScrolled ? 'text-purple-700' : 'text-white'
                            )} />
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default Header;