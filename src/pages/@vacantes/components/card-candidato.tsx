import { Calendar, BookMarked, X, Heart } from "lucide-react";
import {
    format
} from "date-fns"
import { es, se } from "date-fns/locale"
import { useRef, useState } from "react";
import ModalInfo from "./modal-info";
export function CardCandidato({ candidato, index }: any) {
    const modal = useRef<HTMLIonModalElement>(null);
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <li key={index} className="list-none" onClick={() => { setShowModal(true) }}>
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
                        <button className="bg-white border border-gray-200 text-purple-700 p-2 text-sm flex items-center gap-1">
                            <X className="text-red-600 size-4" /> Rechasar
                        </button>
                        <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-800 font-medium text-sm flex items-center gap-1">
                            <Heart className="text-white size-4" /> Aceptar
                        </button>
                    </footer>
                </article>
            </li>
            <ModalInfo modal={modal} setShowModal={setShowModal} showModal={showModal}>
                <section>
                    <header className="mb-4">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{candidato.nombre}</h2>
                        <p className="text-purple-600">{candidato.vacante}</p>
                    </header>
                    <ul className="flex items-center justify-between w-full mb-4 text-sm">
                        <li className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 text-gray-600">
                                <BookMarked className="w-4 h-4 text-gray-400" />
                                <span>{candidato.ultimo_grado_estudios}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>{format(candidato.fecha_registro, "dd MMMM yyyy", { locale: es })}</span>
                            </div>
                        </li>

                        <li className="flex gap-2">
                            <button className="flex items-center justify-center w-10 h-10 p-2 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50">
                                <X className="w-5 h-5 text-red-600" />
                            </button>
                            <button className="flex items-center justify-center w-10 h-10 p-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700">
                                <Heart className="w-5 h-5" />
                            </button>
                        </li>
                    </ul>
                    <p className="text-gray-600 mb-4">
                        {candidato.presentacion}
                    </p>
                </section>
            </ModalInfo>
        </>
    )
}