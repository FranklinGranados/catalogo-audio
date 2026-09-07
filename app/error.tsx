'use client';// errores que se manejan en el servidor no se pueden manejar en el cliente, por eso usamos 'use client' para que este componente se renderice en el cliente y pueda manejar los errores que ocurren en el servidor. Esto es parte del manejo de errores en Next.js 13+ con la nueva arquitectura de app directory.
//server component no puede manejar eventos de click, por eso usamos 'use client' para que este componente se renderice en el cliente y pueda manejar los eventos de click
//ademas de que el servidor solo carga los datos y entrega el html y hasta ahi llego su trabajo, el cliente es el que se encarga de manejar los eventos y la interactividad de la pagina, por eso usamos 'use client' para que este componente se renderice en el cliente y pueda manejar los eventos de click y la interactividad de la pagina.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-red-600">Algo salió mal</h2>
      <p className="text-gray-500">No pudimos cargar la información. Intentá de nuevo.</p>
      <button
        onClick={() => reset()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Reintentar
      </button>
    </main>
  );
}