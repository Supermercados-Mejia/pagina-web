import { Calendar, BookMarked } from "lucide-react";
import {
    format
} from "date-fns"
import { es } from "date-fns/locale"
export function CardCandidato({ candidato, index }: any) {
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
                        {candidato.nombre}
                    </h3>
                </header>
                <ul className="flex flex-col mb-4 text-sm">
                    <p className="text-purple-600">{candidato.vacante}</p>
                    <p className="text-gray-400 flex items-center gap-1"><BookMarked className="size-4" /> {candidato.ultimo_grado_estudios}</p>
                    <p className="text-gray-400 flex items-center gap-1"><Calendar className="size-4" />{format(candidato.fecha_registro, "dd MMMM yyyy", { locale: es })}</p>
                </ul>
                <p className="text-gray-600 mb-4 flex-grow overflow-hidden line-clamp-3">
                    {candidato.presentacion}
                </p>
                <footer className="mt-auto flex gap-2">
                    <button className="bg-white border border-gray-200 text-purple-700 p-2 text-sm">
                        Rechasar
                    </button>
                    <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-800 font-medium text-sm">
                        Aceptar
                    </button>
                </footer>
            </article>
        </li>
    )
}