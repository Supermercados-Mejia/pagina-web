import { ShoppingBag, Tag } from "lucide-react";
import { useHistory } from "react-router";

// Componente para promociones individuales
export function ProductoCard({ promocion, index }: any) {
    const history = useHistory();
    return (
        <li key={index} className="list-none">
            <article
                aria-labelledby={`producto-${index}`}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all
                     hover:shadow-lg cursor-pointer h-full flex flex-col"
            >
                <header className="flex justify-between items-start gap-3 mb-4">
                    <div>
                        <h3 id={`producto-${index}`} className="text-xl font-semibold text-gray-900">
                            {promocion.nombre}
                        </h3>
                        <p className="text-purple-600">{promocion.categoria}</p>
                    </div>
                    {promocion.descuento && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                            -{promocion.descuento}%
                        </span>
                    )}
                </header>

                <ul className="flex flex-col mb-4 text-sm gap-2">
                    <label className="flex items-center gap-2">
                        <ShoppingBag className="size-4 text-gray-400" />
                        <span className="text-gray-600 line-through">{promocion.precioOriginal}</span>
                        <strong className="text-lg text-green-600">{promocion.precioDescuento}</strong>
                    </label>

                    <label className="flex items-center gap-2">
                        <Tag className="size-4 text-gray-400" />
                        <span className="font-medium">Código: </span>
                        <code className="bg-yellow-100 px-2 py-1 rounded">{promocion.codigoPromo}</code>
                    </label>
                </ul>

                <p className="text-gray-600 mb-4 flex-grow">{promocion.descripcion}</p>

                <footer className="mt-auto">
                    <button onClick={() => history.push("/promociones/P7501026000119")} className="text-purple-600 hover:text-purple-800 hover:underline font-medium text-sm">
                        Ver oferta →
                    </button>
                </footer>
            </article>
        </li>
    )
}

// Componente para combos de productos
export function ComboCard({ combo, index }: any) {
    return (
        <li key={index} className="list-none">
            <article
                aria-labelledby={`combo-${index}`}
                className="bg-white border-2 border-purple-200 rounded-xl p-6 transition-all
                     hover:shadow-lg cursor-pointer h-full flex flex-col"
            >
                <header className="mb-4">
                    <h3 id={`combo-${index}`} className="text-xl font-semibold text-gray-900">
                        {combo.nombreCombo}
                    </h3>
                    <p className="text-purple-600">Combo especial</p>
                </header>

                <section className="mb-4 flex-grow">
                    <p className="font-medium mb-2">Incluye:</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        {combo.productos.map((producto: string, i: number) => (
                            <li key={i} className="text-gray-600">{producto}</li>
                        ))}
                    </ul>
                </section>

                <article className="space-y-2">
                    <label className="flex items-center gap-2">
                        <ShoppingBag className="size-4 text-purple-500" />
                        <span className="font-bold text-gray-900">Precio total: </span>
                        <span className="text-gray-600 line-through">{combo.precioTotal}</span>{/* precio PrecioLista */}
                        <strong className="text-lg text-green-600">{combo.ahorroTotal}</strong>{/* precio ofertaD */}
                    </label>

                    <label className="mt-3 bg-purple-100 p-2 rounded flex items-center gap-2">
                        <Tag className="size-4 text-purple-600" />
                        <span className="font-medium">Código combo: </span>
                        <code className="font-bold text-purple-800">{combo.codigoPromo}</code>
                    </label>
                </article>

                <footer className="mt-4">
                    <button className="text-purple-600 hover:text-purple-800 hover:underline font-medium text-sm">
                        Ver combo completo →
                    </button>
                </footer>
            </article>
        </li>
    )
}