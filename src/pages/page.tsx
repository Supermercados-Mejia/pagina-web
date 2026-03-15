import { BentoGrid, BentoItem } from "@/components/bento-grid";
import { PageProps } from "@/utils/types/page";
import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import { ArrowRightIcon, BadgeDollarSign, BellRing, HistoryIcon, LocateIcon, MoveRight, Newspaper, PackageSearch, ShoppingCart } from "lucide-react";
import { empresas } from "./data/empresas";
import { OffertCard } from "./components/cards";
import { servicios } from "./data/servicios";
import Sucursales from "./components/sucursales";
import { socialLinks } from "./data/enlaces";
import { cn } from "@/utils/functions/cn";
import Footer from "@/template/footer";
import { useHistory } from "react-router-dom";
import { IconLiz } from "@/template/icon-liz";

const Page: React.FC<PageProps> = ({ onScroll }: PageProps) => {
    const duplicatedItems = [...empresas, ...empresas];

    const history = useHistory();
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
                className="custom-toolbar-clear h-fit absolute -top-0"
            >
                <IonToolbar>
                    <a className="cursor-pointer" href="/">
                        <IconLiz fill={onScroll ? "#FFF" : "#7927F5"} width={55} />
                    </a>
                </IonToolbar>
            </IonHeader>

            <section className="section w-full lg:min-h-[70vh] min-h-[60vh] -top-8 absolute px-1">
                <div className="overlay m-auto ">
                    <h2 className="text-center text-lg font-semibold text-violet-800 shadow-2xl">Tu supermercado de confianza</h2>
                    <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold font-[Lobster] tracking-tight text-balance text-purple-600 sm:text-5xl">
                        Siempre Fresco Siempre Bien
                    </p>
                </div>
            </section>

            <ul className="md:mt-[64vh] mt-[62vh] mb-28 bottom-0 left-0 z-50 flex w-full items-center justify-center gap-4 p-4 border-t border-t-gray-200">

                {socialLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                        <li key={index}>
                            <a href={link.href} target={link.target}>
                                <IonButton
                                    shape="round"
                                    fill="clear"
                                    color={link.color}
                                >
                                    <IonIcon icon={IconComponent} className={cn("h-6 w-6", link.className)} />
                                </IonButton>
                            </a>
                        </li>
                    );
                })}
            </ul>
            <div className="lg:mb-16 mb-36 max-w-6xl m-auto">

                <section
                    className="-mt-10">
                    <BentoGrid cols={3}>
                        {/* Area Oferta y Pickup */}
                        <BentoItem
                            rowSpan={1}
                            title="Promociones"
                            description="Ofertas especiales esta semana"
                            icon={<BadgeDollarSign className="h-6 w-6 text-green-500" />}
                        >
                            <a
                                href="/promociones"
                                className="group  bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl shadow-yellow-500/25 transition-all hover:scale-105 hover:shadow-yellow-500/40 flex items-center gap-3 min-w-[200px] justify-center"
                            >
                                Ver oferta
                                <MoveRight className="size-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </BentoItem>

                        <BentoItem
                            rowSpan={0}
                            title="Servicio Pick up "
                            description="Haz tu pedido en línea y recogerlo en la tienda"
                            icon={<ShoppingCart className="h-6 w-6 text-purple-600" />}
                        >
                            <a
                                href="https://dev.mercadosliz.com/home"
                                className="group  bg-purple-300 hover:bg-purple-300 text-purple-900 font-bold px-8 py-4 rounded-2xl text-lg shadow-2xl shadow-purple-500/25 transition-all hover:scale-105 hover:shadow-purple-500/40 flex items-center gap-3 min-w-[200px] justify-center"
                            >
                                Pick up
                                <MoveRight className="size-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </BentoItem>

                        {/* Sección Servicios */}
                        <BentoItem
                            rowSpan={3}
                            colSpan={1}
                            title="Servicios"
                            className="h-full"
                            description="Descubre nuestra variedad de servicios"
                            icon={<PackageSearch className="h-6 w-6 text-green-500" />}
                        >
                            <ul className="grid gap-2 md:grid-row-3">
                                {servicios.map((servicio, index) => (
                                    <li
                                        key={index}
                                        className=" flex gap-4 rounded-xl border border-gray-100 bg-white p-2 transition-all hover:border-purple-100 "
                                    >
                                        {servicio.icon && (
                                            <div
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-purple-600 transition-colors"
                                                /* aria-hidden="true" */>
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

                        {/* Sección Nuestra Historia */}
                        <BentoItem
                            rowSpan={3}
                            colSpan={2}
                            title="Nuestra historia"
                            description="Conoce como empezó nuestra historia"
                            icon={<HistoryIcon className="h-6 w-6 text-primary" />}
                        >
                            <div className="overflow-hidden rounded-s-lg shadow-md group">
                                <img
                                    src="/historia.png"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                            </div>
                            <a href="/historia" className="absolute bottom-0 m-4 inline-flex items-center text-purple-600"> Ver más <ArrowRightIcon /> </a>
                        </BentoItem>

                        {/* Sección Newsletter */}
                        <BentoItem
                            rowSpan={1}
                            colSpan={1}
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
                                    <BellRing className="ml-1 inline" />  Suscribirme
                                </button>
                            </div>
                        </BentoItem>

                    </BentoGrid>
                </section>
            </div>

            <h2 className="text-center font-bold text-">Marcas que nos acompañan</h2>
            <div className="flex animate-infinite-scroll mb-5">
                {duplicatedItems.map((data, key) => (
                    <OffertCard key={key} avatarUrl={data.link} />
                ))}
            </div>

            <Footer />
        </IonContent >
    )
}

export default Page;