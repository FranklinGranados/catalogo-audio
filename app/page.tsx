import { supabase } from "@/lib/supabase";
import Link from 'next/link';

export default async function Home() {//usamor async para abajo poder usar await.
  const { data: productos, error } = await supabase//para poder usar await en la función, debemos marcarla como async. Esto permite que la función espere a que se resuelva la promesa devuelta por supabase.from("productos").select("*") antes de continuar con la ejecución del código.
    .from("productos")
    .select("*");

    if (error) {
      //return <p>Ocurrio un error al cargar los productos.</p>;//originalmente para pruebas estaba asi, se reemplaza por algo con estilizacion y mas amigable para el usuario final.
      //console.log(error);
      //return <p>Ocurrió un error: {error.message}</p>;//si hay un error, lo mostramos en la consola y también lo mostramos en la interfaz de usuario., ideal para ver que está pasando, pero en producción no es recomendable mostrar errores al usuario final.
      return <p className="text-center text-red-600 py-10">Ocurrió un error al cargar los productos.</p>;
    }

    /*return (
      <main>
        <h1>Catalogo de Audio</h1>
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>{producto.nombre} - {producto.marca} - ${producto.precio.toFixed(2)}</li>
          ))}
        </ul>
      </main>
    );*/
    return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Catálogo de Audio</h1>
      <p className="text-center text-gray-500 mb-8">Las mejores marcas de audio profesional y portátil</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <Link
            key={producto.id}
            href={`/productos/${producto.slug}`}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <span className="text-xl uppercase text-blue-600 font-bold">{producto.marca}</span>
            <h2 className="text-black font-bold mt-1">{producto.nombre}</h2>
            <p className="text-gray-600 text-sm">{producto.categoria}</p>
            <p className="text-green-600 font-bold mt-3">${producto.precio}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}