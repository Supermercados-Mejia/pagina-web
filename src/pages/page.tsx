import { BentoGrid, BentoItem } from "@/components/bento-grid";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { BarChart3, Calendar } from "lucide-react";

const Page: React.FC<PageProps> = ({ }: PageProps) => {
    return (
        <IonContent fullscreen className="mb-16">
            <IonHeader
                collapse="condense"
                className="custom-toolbar">
                <IonToolbar>
                    <IonTitle
                        size="large"
                        className="text-white font-light tracking-tight text-4xl absolute top-0 left-0 pl-4 z-50">
                        Liz
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
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
                    colSpan={2}
                    title="Listado de productos"
                    description={"Tu carrito está vacío"}
                    icon={<BarChart3 className="h-6 w-6 text-primary" />}
                >
                    <div className="max-h-[300px] p-4 min-h-0 flex flex-col gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/30 scrollbar-track-transparent transition-colors">
                    </div>
                </BentoItem>
            </BentoGrid>
        </IonContent>
    )
}

export default Page;