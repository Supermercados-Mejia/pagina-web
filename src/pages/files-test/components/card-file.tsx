export const CardFile = ({ selectFile }: any) => {
    return (
        <article className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-2">Archivo de ejemplo</h2>
            <p className="text-gray-600 mb-4">Haz clic para seleccionar un archivo.</p>
            <button
                onClick={() => selectFile({ name: "example.pdf", size: "1MB" })}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Seleccionar Archivo
            </button>
        </article>
    );
}