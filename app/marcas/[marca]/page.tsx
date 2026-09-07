import { supabase } from '@/lib/supabase';
import Link from 'next/link';
//aplicamos tailwind para estilizar y hacer responsive el diseño de la pagina de productos por marca, y tambien agregamos un boton para volver al catalogo principal.
/*
import Link from 'next/link' y <Link href={...}>. Es el componente oficial de Next.js para navegar entre páginas sin recargar el navegador completo — 
el equivalente moderno de un <a href="...">, pero optimizado (Next.js precarga la página destino en segundo plano para que la navegación se sienta instantánea).
*/

type PageProps = {
  params: Promise<{ marca: string }>;
};

export default async function ProductosPorMarca({ params }: PageProps) {
  const { marca } = await params;

  const { data: productos, error } = await supabase
    .from('productos')
    .select('*')
    .eq('marca', marca);// como aqui queremos traer los productos de una marca en especifico, usamos el metodo eq para filtrar por la marca que recibimos como parametro. y tambiien quitamos a single

  if (error) {
    //return <p>Ocurrió un error al cargar los productos.</p>;
    return <p className="text-center text-red-600 py-10">Ocurrió un error al cargar los productos.</p>;
  }

  /*if (productos.length === 0) {
    return <p>No hay productos de la marca {marca}.</p>;
  }*/

  /*return (//este codigo fue util para pruebas, pero lo reemplazamos por algo con estilizacion y mas amigable para el usuario final.
    <main>
      <h1>Productos de {marca}</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <Link href={`/productos/${producto.slug}`}> 
              {producto.nombre} - ${producto.precio}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );*/

  return (//este codigo es el que se va a mostrar al usuario final, con estilizacion y mas amigable para el usuario final con diseño responsive y con un boton para volver al catalogo principal.

    <main className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/" className="text-blue-600 hover:underline text-sm">&larr; Volver al catálogo</Link>
      <h1 className="text-3xl font-bold mt-4 mb-8">Productos de {marca}</h1>

      {productos.length === 0 ? (
        <p className="text-gray-500">No hay productos de esta marca.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <Link
            key={producto.id}
            href={`/productos/${producto.slug}`}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-white"
        >
            <h2 className="text-black font-bold mt-1">{producto.nombre}</h2>
            <p className="text-gray-600 text-sm">{producto.categoria}</p>
            <p className="text-green-600 font-bold mt-3">${producto.precio}</p>
            </Link>
            ))}
        </div>
      )}
    </main>
  );
}