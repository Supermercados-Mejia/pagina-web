import { Calendar, MapPin } from "lucide-react";

export function CardVacante({ vacante, index }: any) {
    return (
        <li key={index} className="list-none">
            <article
                aria-labelledby={`position-${index}`}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all
                                     hover:shadow-lg cursor-pointer h-full
                                     flex flex-col"
            >
                <header className="flex justify-between items-start gap-3 mb-4">
                    <h3 id={`position-${index}`} className="text-xl font-semibold text-gray-900">
                        {vacante.titulo}
                    </h3>
                    <span className="border font-bold text-xs px-3 py-1 rounded-full shrink-0">
                        {vacante.tipo}
                    </span>
                </header>
                <ul className="flex flex-col mb-4 text-sm">
                    <p className="text-purple-600">{vacante.departamento}</p>
                    <p className="text-gray-400 flex items-center gap-1"><MapPin className="size-4" /> {vacante.ubicacion}</p>
                    <p className="text-gray-400 flex items-center gap-1"><Calendar className="size-4" /> {vacante.fechaPublicacion}</p>
                </ul>
                <p className="text-gray-600 mb-4 flex-grow">
                    {vacante.descripcion}
                </p>
                <footer className="mt-auto">
                    <button className="text-purple-600 hover:text-purple-800 hover:underline font-medium text-sm">
                        Ver detalles →
                    </button>
                </footer>
            </article>
        </li>
    )
}