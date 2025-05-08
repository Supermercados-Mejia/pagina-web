export default function Background({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="relative isolate overflow-hidden bg-white dark:bg-neutral-950 px-2 py-20 sm:py-24 md:py-28 lg:px-8 min-h-screen transition-colors duration-300">
            {/* Fondo radial responsive con ajustes para dark */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.purple.100),white] dark:bg-[radial-gradient(60rem_60rem_at_top,theme(colors.purple.900),theme(colors.neutral.950)] opacity-20 dark:opacity-25" />

            {/* Sombra y skew responsive mejorado para dark */}
            <div className="absolute inset-y-0 right-1/2 -z-10 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white dark:bg-neutral-900 shadow-xl shadow-purple-600/10 dark:shadow-purple-800/20 ring-1 ring-purple-50 dark:ring-purple-900/30 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center transition-colors duration-300" />

            {/* Contenido con ajustes de texto para dark */}
            <div className="mx-auto dark:text-neutral-200">
                {children}
            </div>
        </main>
    );
}