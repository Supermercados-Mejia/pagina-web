import { useState, useEffect, useRef, useCallback } from "react";
import { useGetWithFiltersGeneralInIntelisisMutation } from "@/hooks/reducers/api_int";
import Page from "@/pages/page";

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

function OffersBanner({ ofertas }: { ofertas: OfertaBanner[] }) {
    const trackRef = useRef<HTMLDivElement>(null);
    const [paused, setPaused] = useState(false);
    const posRef = useRef(0);
    const rafRef = useRef<number>(null);
    const speed = 0.9;

    const items = [...ofertas, ...ofertas];

    const animate = useCallback(() => {
        const track = trackRef.current;
        if (!track) { rafRef.current = requestAnimationFrame(animate); return; }
        if (!paused) {
            const halfWidth = track.scrollWidth / 1;
            posRef.current += speed;
            if (posRef.current >= halfWidth) posRef.current = 0;
            track.style.transform = `translateX(-${posRef.current}px)`;
        }
        rafRef.current = requestAnimationFrame(animate);
    }, [paused]);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [animate]);
    if (ofertas.length === 0) return null;

    return (
        <div className="w-full mb-3">
            <div className="flex items-center gap-2 px-1 pb-2">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                <span className="text-[16px] font-medium text-gray-900">Ofertas del día</span>
            </div>
            <div className="overflow-hidden w-full  rounded-xl  py-3">
                <div ref={trackRef} className="flex gap-4 w-max" style={{ willChange: "transform" }}>
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col justify-between min-w-[260px] max-w-[260px] bg-white border border-purple-400 rounded-xl px-4 py-3 gap-1 select-none">
                            <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 w-fit"> OFERTA </span>
                            <div className="text-[13px] font-medium text-gray-900 leading-tight">{item.nombre}</div>
                            <div>
                                <div className="text-[13px] text-red-500 line-through">${item.precioNormal.toLocaleString("es-MX")}</div>
                                <div className="text-[24px] font-semibold text-purple-800">${item.precioOferta.toLocaleString("es-MX")}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function BannerChecker() {

    const [getData, { isLoading }] = useGetWithFiltersGeneralInIntelisisMutation();
    const [ofertasBanner, setOfertasBanner] = useState<OfertaBanner[]>([]);
    const buildSearchQuery = useCallback((lista: any) => {
        return `art INNER JOIN ListaPreciosDUnidad AS lpu ON art.Articulo = lpu.Articulo AND lpu.Lista = '${lista.id}' AND lpu.Precio > 0 LEFT JOIN CB AS cb ON cb.Cuenta = art.Articulo LEFT JOIN (SELECT ofrd.Articulo, ofrd.Unidad, ofrd.Precio AS OfertaPrecio, ofrd.Porcentaje, ofr.FechaA AS OfertaFechaHasta FROM OfertaD ofrd INNER JOIN Oferta ofr ON ofr.ID = ofrd.ID AND ofr.FechaD < GETDATE() AND ofr.FechaA > GETDATE() AND ofr.Estatus = 'VIGENTE' ) AS ofr ON ofr.Articulo = art.Articulo AND ofr.Unidad = art.Unidad`;
    }, []);

    // Cargar ofertas para el banner siempre sucursal Liz
    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                const result = await getData({
                    table: buildSearchQuery(sucursales[2]),
                    pageSize: 1000,
                    page: Page,
                    filtros: {
                        Filtros: [
                            { key: "ofr.OfertaPrecio", Operator: "is not null", Value: "" }
                        ],
                        Selects: [
                            { key: "art.Descripcion1" },
                            { key: "lpu.Unidad" },
                            { key: "lpu.Precio" },
                            { key: "ofr.OfertaPrecio", alias: "ofertaPrecio" },
                            { key: "ofr.Porcentaje", alias: "porcentaje" },
                            { key: "ofr.OfertaFechaHasta", alias: "ofertaFechaHasta" },
                        ],
                        Order: [{ Key: "Descripcion1", Direction: "ASC" }],
                    },
                    signal: undefined,
                });
                if ("data" in result && result.data?.data) {
                    const mapped: OfertaBanner[] = result.data.data
                        .filter((item: any, _: number, arr: any[]) =>
                            item.ofertaPrecio &&
                            !item.Descripcion1?.toLowerCase().includes("caja") &&
                            !["CAJ", "CAJA", "CJ",].includes(item.Unidad?.toUpperCase()) &&
                            arr.findIndex((x: any) => x.Descripcion1 === item.Descripcion1) === arr.indexOf(item)
                        )
                        .map((item: any) => ({
                            nombre: item.Descripcion1
                                ? item.Descripcion1.toLowerCase().split(" ").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
                                : "Sin nombre",
                            unidad: item.Unidad || "PZA",
                            precioNormal: item.Precio || 0,
                            precioOferta: item.porcentaje
                                ? item.Precio - (item.porcentaje / 100) * item.ofertaPrecio
                                : item.ofertaPrecio,
                            hasta: item.ofertaFechaHasta
                                ? new Date(item.ofertaFechaHasta).toLocaleDateString("es-MX")
                                : undefined,
                        }));
                    setOfertasBanner(mapped);
                }
            } catch (e) {
                console.error("Error cargando ofertas para banner:", e);
            }
        };
        fetchOfertas();
    }, [getData, buildSearchQuery]);
    return (
        <div className="mx-auto inset-0 z-20">
            <div className="relative flex max-h-3/4 flex-col justify-start items-center">
                <div className="bg-background w-full sticky">
                    <div className="relative space-y-2"><OffersBanner ofertas={ofertasBanner} /></div>
                </div>
            </div>
        </div>
    );
}

export default BannerChecker;