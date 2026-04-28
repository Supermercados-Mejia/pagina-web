import { useState, useEffect, useRef, useCallback } from "react";
import { useGetWithFiltersGeneralInIntelisisMutation } from "@/hooks/reducers/api_int";

type Sucursal = {
    id: string;
    nombre: string;
    almacen: string;
    sucursal: string;
};

const sucursales: Sucursal[] = [
    { id: "(Precio Lista)", nombre: "Mayoreo", almacen: "ALMMAYO", sucursal: "4" },
    { id: "(Precio 4)", nombre: "Palmas", almacen: "ALMPALM", sucursal: "3" },
    { id: "(Precio 2)", nombre: "Liz", almacen: "ALMVGPE", sucursal: "1" },
    { id: "(Precio 3)", nombre: "Testerazo", almacen: "ALMTEST", sucursal: "2" },
];

type OfertaBanner = {
    nombre: string;
    unidad: string;
    precioNormal: number;
    precioOferta: number;
    hasta?: string;
};

function OffersBanner({
    ofertas,
    page,
    totalPages,
    setPage,
    isLoading,
}: {
    ofertas: OfertaBanner[];
    page: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    isLoading: boolean;
}) {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [paused, setPaused] = useState(false);
    const posRef = useRef(0);
    const rafRef = useRef<number>(null);
    const fetchingRef = useRef(false);
    const containerWidthRef = useRef(window.innerWidth);
    const pageRef = useRef(page);
    const totalPagesRef = useRef(totalPages);

    const speed = 4;
    const itemWidth = 276; // 260px + gap de 16px

    // Mantener las refs actualizadas sin provocar reinicio de la animación
    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    useEffect(() => {
        totalPagesRef.current = totalPages;
    }, [totalPages]);

    // Medir ancho del contenedor
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                containerWidthRef.current = entry.contentRect.width;
            }
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    // Reiniciar bloqueo cuando lleguen nuevos datos
    useEffect(() => {
        fetchingRef.current = false;
    }, [ofertas.length]);

    const animate = useCallback(() => {
        const track = trackRef.current;
        if (!track) {
            rafRef.current = requestAnimationFrame(animate);
            return;
        }

        if (!paused) {
            posRef.current += speed;

            const currentTotalWidth = ofertas.length * itemWidth;
            const containerWidth = containerWidthRef.current;

            // Solicitar siguiente página cuando el scroll se acerque al final
            if (
                containerWidth > 0 &&
                pageRef.current < totalPagesRef.current &&
                !isLoading &&
                !fetchingRef.current &&
                posRef.current > currentTotalWidth - containerWidth - 100
            ) {
                fetchingRef.current = true;
                setPage((prev) => prev + 1);
            }

            track.style.transform = `translateX(-${posRef.current}px)`;
        }

        rafRef.current = requestAnimationFrame(animate);
    }, [paused, isLoading, setPage, ofertas]); // Dependencias controladas, sin page/totalPages directas

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [animate]);

    if (ofertas.length === 0) return null;

    return (
        <div className="w-full mb-3">
            <div
                ref={containerRef}
                className="overflow-hidden w-full rounded-xl py-3"
            >
                <div
                    ref={trackRef}
                    className="flex gap-4 w-max"
                    style={{ willChange: "transform" }}
                >
                    {ofertas.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col justify-between min-w-[260px] max-w-[260px] bg-white border border-purple-400 rounded-xl px-4 py-3 gap-1 select-none"
                        >
                            <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 w-fit">
                                OFERTA
                            </span>
                            <div className="text-[13px] font-medium text-gray-900 leading-tight">
                                {item.nombre}
                            </div>
                            <div className="text-[13px] font-medium text-gray-600 leading-tight">
                                {item.unidad}
                            </div>
                            <div>
                                <div className="text-[13px] text-red-500 line-through">
                                    ${item.precioNormal.toLocaleString("es-MX")}
                                </div>
                                <div className="text-[24px] font-semibold text-purple-800">
                                    ${item.precioOferta.toLocaleString("es-MX")}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-medium text-gray-600 leading-tight">
                                    Valida hasta{item.hasta}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function BannerChecker() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [getData, { isLoading }] = useGetWithFiltersGeneralInIntelisisMutation();
    const [ofertasBanner, setOfertasBanner] = useState<OfertaBanner[]>([]);
    const mountedRef = useRef(false);

    const buildSearchQuery = useCallback((lista: any) => {
        return `art INNER JOIN ListaPreciosDUnidad AS lpu ON art.Articulo = lpu.Articulo AND art.Unidad = lpu.Unidad AND lpu.Lista = '${lista.id}' AND lpu.Precio > 0 INNER JOIN ArtUnidad AS au ON art.Articulo = au.Articulo AND lpu.Unidad = au.Unidad INNER JOIN ArtDisponible AS ad on art.Articulo = ad.Articulo AND ad.Almacen = '${lista.almacen}' AND ad.DispMenosApartado > 0 AND (ad.DispMenosApartado / au.Factor) > 0 INNER JOIN Oferta AS ofr ON ofr.Estatus = 'VIGENTE' AND ofr.FechaD <= GETDATE() AND ofr.FechaA >= GETDATE() INNER JOIN OfertaD AS ofrd ON ofr.ID = ofrd.ID AND ofrd.Articulo = art.Articulo AND ofrd.Unidad = art.Unidad AND ofrd.Precio > 0`;
    }, []);

    // Carga de datos controlada solo por cambios en "page"
    useEffect(() => {
        // Evitar doble carga en StrictMode
        if (!mountedRef.current) {
            mountedRef.current = true;
        }

        const fetchData = async () => {
            try {
                const result = await getData({
                    table: buildSearchQuery(sucursales[2]),
                    pageSize: 10,
                    page,
                    filtros: {
                        Selects: [
                            { key: "art.Descripcion1" },
                            { key: "lpu.Unidad" },
                            { key: "lpu.Precio" },
                            { key: "ofrd.Precio", alias: "ofertaPrecio" },
                            { key: "ofrd.Porcentaje", alias: "porcentaje" },
                            { key: "ofr.fechaa", alias: "ofertaFechaHasta" },
                        ],
                        Order: [{ Key: "Descripcion1", Direction: "ASC" }],
                    },
                    signal: undefined,
                });

                if ("data" in result && result.data?.data) {
                    const serverTotalPages = result.data.totalPages ?? 1;
                    setTotalPages(serverTotalPages);

                    const mapped: OfertaBanner[] = result.data.data.map((item: any) => ({
                        nombre: item.Descripcion1 || "Sin nombre",
                        unidad: item.Unidad || "PZA",
                        precioNormal: item.Precio || 0,
                        precioOferta: item.porcentaje
                            ? item.Precio - (item.porcentaje / 100) * item.ofertaPrecio
                            : item.ofertaPrecio,
                        hasta: item.ofertaFechaHasta
                            ? new Date(item.ofertaFechaHasta).toLocaleDateString("es-MX")
                            : undefined,
                    }));

                    setOfertasBanner((prev) => [...prev, ...mapped]);
                }
            } catch (e) {
                console.error("Error cargando ofertas para banner:", e);
            }
        };

        fetchData();
    }, [page]); // Solo se vuelve a ejecutar cuando page cambia

    return (
        <div className="mx-auto inset-0 z-20">
            <div className="relative flex max-h-3/4 flex-col justify-start items-center">
                <div className="bg-background w-full sticky">
                    <div className="relative space-y-2">
                        <OffersBanner
                            page={page}
                            totalPages={totalPages}
                            setPage={setPage}
                            ofertas={ofertasBanner}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerChecker;