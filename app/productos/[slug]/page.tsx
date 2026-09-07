import {  supabase } from '@/lib/supabase';
import Link from 'next/link';
type PageProps = {
    params: Promise<{ slug: string }>; //un objeto params que, cuando se resuelve, contiene el slug de la URL. Está envuelto en Promise<> porque en Next.js 15+ los parámetros de ruta llegan de forma asíncrona (por eso ves await params en la siguiente línea).
};

export default async function ProductoDetalle({ params }: PageProps) {
    const { slug } = await params;
    const { data: producto, error } = await supabase
        .from('productos')
        .select('*')
        .eq('slug', slug)//esto se refiere a la columna 'slug' en la tabla 'productos' y compara su valor con el valor de la variable slug que obtenemos de los parámetros de la URL. Esto nos permite filtrar los productos y obtener solo aquel cuyo slug coincida con el proporcionado en la URL.
        .single();//el método single() indica que esperamos un solo resultado de la consulta. Si la consulta devuelve más de un producto, se lanzará un error. Esto es útil cuando sabemos que el slug es único para cada producto y queremos asegurarnos de obtener solo un registro.
        //estos parametros siguen siendo para un select, pero el .eq es equivalente al where de sql, y el .single es para que nos devuelva un solo resultado, en caso de que haya más de uno, nos dará un error.
        //entonces esta solicitud llega a supabase y ahi se hace la comparacion, no en el front, y supabase nos devuelve el resultado de la consulta
        //que es lo que estamos haciendo con el await supabase.from('productos').select('*').eq('slug', slug).single();. Esto nos devuelve un objeto con dos propiedades: data y error. La propiedad data contiene el producto que coincide con el slug, y la propiedad error contiene cualquier error que haya ocurrido durante la consulta.
    if (error || !producto) {
        //return <p>Ocurrió un error al cargar el producto.</p>;
        return <p className="text-center text-red-600 py-10">Producto no encontrado.</p>;
    }


    /*return (
        <main>
        <h1>{producto.nombre}</h1>
        <p>Marca: {producto.marca}</p>
        <p>Modelo: {producto.modelo}</p>
        <p>Categoría: {producto.categoria}</p>
        <p>Precio: ${producto.precio.toFixed(2)}</p>
        <p>Stock: {producto.stock} unidades</p>
        <p>{producto.descripcion}</p>
        </main>
    );*/
    return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/" className="text-blue-600 hover:underline text-sm">&larr; Volver al catálogo</Link>

      <div className="mt-4 border rounded-xl p-6 shadow-sm bg-white">
        <Link href={`/marcas/${producto.marca}`} className="text-2xl uppercase text-blue-600 font-semibold hover:underline">
          {producto.marca}
        </Link>
        <h1 className="text-2xl md:text-3xl text-orange-600 font-bold mt-1">{producto.nombre}</h1>
        <p className="text-black font-semibold">{producto.categoria} · Modelo {producto.modelo}</p>
        <p className="text-3xl text-green-600 font-bold mt-4">${producto.precio}</p>
        <p className="text-sm text-gray-500 mt-1">{producto.stock} unidades disponibles</p>
        <p className="mt-4 text-gray-700 leading-relaxed">{producto.descripcion}</p>
      </div>
    </main>
  );
}