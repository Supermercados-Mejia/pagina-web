import { BentoGrid, BentoItem } from "@/components/bento-grid";
import { PageProps } from "@/utils/types/page";
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import { ArrowDownAzIcon, ArrowRightIcon, BadgeDollarSign, BarChart3, Blocks, Calendar, HistoryIcon, LocateIcon, Newspaper, PackageSearch } from "lucide-react";
import { empresas } from "./data/empresas";
import { OffertCard } from "./components/cards";
import { servicios } from "./data/servicios";
import Sucursales from "./components/sucursales";

const Page: React.FC<PageProps> = ({ onScroll }: PageProps) => {
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
                        className="text-white font-medium tracking-tight">
                        <span className="text-6xl">Liz</span>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <div className="lg:mb-16 mb-36">
                <section
                    className="-mt-10">
                    <BentoGrid>
                        {/* Sección Nuestra Historia */}
                        <BentoItem
                            rowSpan={3}
                            colSpan={2}
                            title="Nuestra historia"
                            className="px-0 pl-4"
                            description="Conoce como empezó nuestra historia y como hemos crecido..."
                            icon={<HistoryIcon className="h-6 w-6 text-primary" />}
                        >
                            <div className="relative h-[32vh]">
                                <div className="float-right -right-4 h-[30vh] md:w-[70%] rounded-s-full inset-0 bg-[#f2f2f7]">
                                    <img src="/historia.png" className="h-full w-full object-cover rounded-s-lg shadow-md" />
                                </div>
                                <a href="/historia" className="absolute bottom-0 m-4 inline-flex items-center text-purple-600">
                                    Ver más <ArrowRightIcon />
                                </a>
                            </div>
                        </BentoItem>

                        {/* Sección Servicios */}
                        <BentoItem
                            rowSpan={3}
                            title="Servicios"
                            description="Descubre nuestra variedad de servicios"
                            icon={<PackageSearch className="h-6 w-6 text-green-500" />}
                        >
                            <ul className="grid gap-2 md:grid-row-3">
                                {servicios.map((servicio, index) => (
                                    <li
                                        key={index}
                                        className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-2 transition-all hover:border-purple-100 hover:bg-purple-50"
                                    >
                                        {servicio.icon && (
                                            <div
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-purple-600 transition-colors"
                                                aria-hidden="true">
                                                <servicio.icon className="h-6 w-6" />
                                            </div>
                                        )}

                                        <div className="flex flex-col">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {servicio.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {servicio.desc}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </BentoItem>

                        {/* Sección Promociones */}
                        <BentoItem
                            rowSpan={3}
                            title="Promociones"
                            description="Ofertas especiales esta semana"
                            icon={<BadgeDollarSign className="h-6 w-6 text-green-500" />}
                        >
                            <div className="p-4">
                                <div className="rounded-xl border p-4 hover:shadow-md">
                                    <img src="/merc1.jpg" alt="Oferta" className="mb-2 h-32 w-full object-cover" />
                                    <div className="text-center">
                                        <p className="font-bold text-purple-600">-30%</p>
                                        <p className="text-lg font-medium">$69.99</p>
                                        <button className="mt-2 text-purple-600 hover:underline">
                                            Ver oferta <ArrowRightIcon className="ml-1 inline" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </BentoItem>

                        {/* Sección Sucursales */}
                        <BentoItem
                            rowSpan={3}
                            colSpan={2}
                            title="Sucursales"
                            description="Encuéntranos en estas ubicaciones"
                            icon={<LocateIcon className="h-6 w-6 text-orange-500" />}
                        >
                            <Sucursales />
                        </BentoItem>

                        {/* Sección Newsletter */}
                        <BentoItem
                            rowSpan={3}
                            colSpan={2}
                            title="Mantente informado"
                            description="Suscríbete a nuestras novedades"
                            icon={<Newspaper className="h-6 w-6 text-red-500" />}
                        >
                            <div className="p-4 text-center">
                                <input
                                    type="email"
                                    placeholder="Tu email"
                                    className="mb-3 w-full rounded-lg border p-3"
                                />
                                <button className="text-purple-600 hover:underline">
                                    Suscribir <ArrowRightIcon className="ml-1 inline" />
                                </button>
                            </div>
                        </BentoItem>

                        {/* Sección Únete */}
                        <BentoItem
                            rowSpan={3}
                            title="Únete al equipo"
                            description="Vacantes disponibles"
                            icon={<Blocks className="h-6 w-6 text-purple-500" />}
                        >
                            <div className="flex flex-col p-4 text-center">
                                <button className="mb-2 block text-purple-600 hover:underline">
                                    Ver vacantes <ArrowRightIcon className="ml-1 inline" />
                                </button>
                                <button className="text-purple-600 hover:underline">
                                    Postulate <ArrowRightIcon className="ml-1 inline" />
                                </button>
                            </div>
                        </BentoItem>
                    </BentoGrid>
                </section>

                <h2 className="text-center">Marcas que nos acompañan</h2>
                <div className="flex animate-infinite-scroll mt-10 mb-10">
                    {duplicatedItems.map((data, key) => (
                        <OffertCard key={key} avatarUrl={data.link} />
                    ))}
                </div>
            </div>
        </IonContent >
    )
}

export default Page;