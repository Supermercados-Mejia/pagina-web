import { BentoGrid, BentoItem } from "@/components/bento-grid";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { BarChart3, Calendar } from "lucide-react";
import { useMemo } from "react";
import { empresas } from "./data/empresas";

const Page: React.FC<PageProps> = ({ onScroll }: PageProps) => {
    /* 
    const useInfiniteArray = (baseArray: any) => {
        return useMemo(() => ({
            getItem: (index: any) => baseArray[index % baseArray.length],
            totalItems: Infinity
        }), [baseArray]);
    };
    const infiniteArray = useInfiniteArray(empresas);
    console.log(infiniteArray.getItem); 
    */

    /*
    const useInfiniteCycle = (initialItems, interval = 3000) => {
        const [currentIndex, setCurrentIndex] = useState(0);

        const next = useCallback(() => {
            setCurrentIndex(prev => (prev + 1) % initialItems.length);
        }, [initialItems.length]);

        const prev = useCallback(() => {
            setCurrentIndex(prev => (prev - 1 + initialItems.length) % initialItems.length);
        }, [initialItems.length]);

    // Auto-avance opcional
        useEffect(() => {
            if (interval) {
            const timer = setInterval(next, interval);
            return () => clearInterval(timer);
            }
        }, [next, interval]);

        return {
            currentItem: initialItems[currentIndex],
            next,
            prev,
            currentIndex
        };
    };
    const { currentItem, next, prev } = useInfiniteCycle(ruta);
    */
    const duplicatedItems = [...empresas, ...empresas];
    return (
        <IonContent
            fullscreen
            scrollEvents
            onIonScroll={(e) => {
                const isScrolled = e.detail.scrollTop > 20;
                onScroll?.(isScrolled);
            }}
        >
            <IonHeader
                collapse="condense"
                className="custom-toolbar z-50 -top-16"
            >
                <IonToolbar>
                    <IonTitle
                        size="large"
                        className="text-white font-medium tracking-tight"
                    >
                        <span className="text-6xl">Liz</span>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <section
                className="mb-12 -mt-10">
                <BentoGrid>
                    {/* Listado de productos */}
                    <BentoItem
                        rowSpan={3}
                        colSpan={2}
                        title="Listado de productos"
                        description={"Tu carrito está vacío"}
                        icon={<BarChart3 className="h-6 w-6 text-primary" />}
                    >
                        <div className="max-h-[300px] p-4 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/30 scrollbar-track-transparent transition-colors">
                        </div>
                    </BentoItem>

                    {/* Informe del pedido */}
                    <BentoItem
                        rowSpan={3}
                        title="Informe del pedido"
                        description={"Sin citas recientes"}
                        icon={<Calendar className="h-6 w-6 text-green-500" />}
                    >
                    </BentoItem>


                    {/* Informe del pedido */}
                    <BentoItem
                        rowSpan={3}
                        title="Informe del pedido"
                        description={"Sin citas recientes"}
                        icon={<Calendar className="h-6 w-6 text-green-500" />}
                    >
                    </BentoItem>


                    {/* Informe del pedido */}
                    <BentoItem
                        rowSpan={3}
                        title="Informe del pedido"
                        description={"Sin citas recientes"}
                        icon={<Calendar className="h-6 w-6 text-green-500" />}
                    >
                    </BentoItem>

                    {/* Listado de productos */}
                    <BentoItem
                        rowSpan={3}
                        colSpan={2}
                        title="Listado de productos"
                        description={"Tu carrito está vacío"}
                        icon={<BarChart3 className="h-6 w-6 text-primary" />}
                    >
                        <div className="max-h-[300px] p-4 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/30 scrollbar-track-transparent transition-colors">
                        </div>
                    </BentoItem>

                    {/* Informe del pedido */}
                    <BentoItem
                        rowSpan={3}
                        title="Informe del pedido"
                        description={"Sin citas recientes"}
                        icon={<Calendar className="h-6 w-6 text-green-500" />}
                    >
                    </BentoItem>
                    {/* Listado de productos */}
                    <BentoItem
                        rowSpan={3}
                        colSpan={2}
                        title="Listado de productos"
                        description={"Tu carrito está vacío"}
                        icon={<BarChart3 className="h-6 w-6 text-primary" />}
                    >
                        <div className="max-h-[300px] p-4 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/30 scrollbar-track-transparent transition-colors">
                        </div>
                    </BentoItem>

                    {/* Informe del pedido */}
                    <BentoItem
                        rowSpan={3}
                        title="Informe del pedido"
                        description={"Sin citas recientes"}
                        icon={<Calendar className="h-6 w-6 text-green-500" />}
                    >
                    </BentoItem>
                    {/* Listado de productos */}
                    <BentoItem
                        rowSpan={3}
                        colSpan={3}
                        title="Listado de productos"
                        description={"Tu carrito está vacío"}
                        icon={<BarChart3 className="h-6 w-6 text-primary" />}
                    >
                        <div className="max-h-[300px] p-4 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/30 scrollbar-track-transparent transition-colors">
                        </div>
                    </BentoItem>

                    <BentoItem
                        rowSpan={3}
                        title="Informe del pedido"
                        description={"Sin citas recientes"}
                        icon={<Calendar className="h-6 w-6 text-green-500" />}
                    >
                    </BentoItem>

                    <BentoItem
                        rowSpan={3}
                        title="Informe del pedido"
                        description={"Sin citas recientes"}
                        icon={<Calendar className="h-6 w-6 text-green-500" />}
                    >
                    </BentoItem>

                    <BentoItem
                        rowSpan={3}
                        title="Informe del pedido"
                        description={"Sin citas recientes"}
                        icon={<Calendar className="h-6 w-6 text-green-500" />}
                    >
                    </BentoItem>
                </BentoGrid>
            </section>
        </IonContent>
    )
}

export default Page;