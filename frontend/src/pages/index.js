import React from 'react';

const Home = () => {
  return (
  <div className=''>
    <header className='container py-4 px-4 mx-auto'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <a className='font-bold text-xl flex flex-col justify-center items-center'>
          <img className='h-20' src="/images/logos/escudo.png"/>
          <h3 className='text-center font-light'>[Nombre municipalidad]</h3>
        </a>


        <a href='/auth/login'>
          <button  className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Iniciar sesion
          </button>
        </a>

      </div>
    </header>

    <section className="flex flex-wrap items-center justify-center p-10 container mx-auto bg-blue-200 my-2 rounded-xl">
      {/* Columna 1 */}
      <div>
        <div className="p-4 text-center max-w-lg">
            <h2 className="mb-4 text-3xl font-bold lg:text-5xl"> Portal Municipal
                 <span className="text-5xl text-[#2041ad] leading-relaxeds lg:text-5xl"> Becas y Beneficios</span>
            </h2>
            <p className="text-gray-700">
              Estamos comprometidos a proporcionar servicios de alta calidad y mejorar la calidad de
              vida de nuestros ciudadanos.
            </p>
        </div>
      </div>
      {/* Columna 2 */}
      <div>
        <div className='w-96 h-96'>
          <img src='/images/municipalidad.png'/>
        </div>
      </div>
    </section>

    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 container mx-auto my-4'>

      <div className='bg-blue-400 hover:bg-blue-500 transition duration-300 ease-in-out h-52 rounded-xl flex justify-center items-center transform '>
        <button className='text-3xl font-bold text-white text-center group-hover:text-black'>Contacto</button>
      </div>

      <div className='bg-blue-400 hover:bg-blue-500 transition duration-300 ease-in-out h-52 rounded-xl flex justify-center items-center'>
        <button className='text-3xl font-bold text-white text-center'>Sobre Nosotros</button>
      </div>

      <div className='bg-blue-400 hover:bg-blue-500 transition duration-300 ease-in-out h-52 rounded-xl flex justify-center items-center'>
        <button className='text-3xl font-bold text-white text-center'>Becas y Beneficios</button>
      </div>

      <div className='bg-blue-400 hover:bg-blue-500 transition duration-300 ease-in-out h-52 rounded-xl flex justify-center items-center'>
        <button className='text-3xl font-bold text-white text-center'>Personas</button>
      </div>
    </section>

    <section className='container mx-auto bg-to p-4 rounded-xl bg-gradient-to-b from-blue-300 to-blue-100 my-4'>

      <div className='text-center flex flex-col flex-wrap justify-center items-center my-4'>
        <div className='max-w-[510px]'>
          <span className="font-semibold text-sm text-primary  block">
            Lo más reciente
          </span>
          <h2 className='font-bold text-3xl sm:text-4xl md:text-[40px]'>Noticias</h2>
          <p className="text-base text-body-color my-4">
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form.
          </p>
        </div>
      </div>

      <div className='flex flex-wrap p-2 justify-center'>

        {/* Noticia 1 */}
        <div className='max-w-[370px] bg-blue-50 p-4 rounded-lg m-2'>
            <div className="rounded overflow-hidden mb-8">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/blogs/blog-01/image-01.jpg"
                  alt="image"
                  className="w-full"
                />
            </div>
            <div>
              <span className="bg-blue-600 rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
                Diciembre, 2023
              </span>
              <h3>
                <a className="font-semibold text-xl">
                  Diseño Sostenible: Creando un Futuro más Verde y Ecológico
                </a>
              </h3>
              <p className="text-base text-body-color">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
        </div>

        {/* Noticia 2 */}
        <div className='max-w-[370px] bg-blue-50 p-4 rounded-lg m-2'>
            <div className="rounded overflow-hidden mb-8">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/blogs/blog-01/image-02.jpg"
                  alt="image"
                  className="w-full"
                />
            </div>
            <div>
              <span className="bg-blue-600 rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
                Diciembre, 2023
              </span>
              <h3>
                <a className="font-semibold text-xl">
                Convocatoria para Postulación a Becas Municipales
                </a>
              </h3>
              <p className="text-base text-body-color">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
        </div>

        {/* Noticia 3 */}
        <div className='max-w-[370px] bg-blue-50 p-4 rounded-lg m-2'>
            <div className="rounded overflow-hidden mb-8">
                <img
                  src="https://cdn.tailgrids.com/1.0/assets/images/blogs/blog-01/image-03.jpg"
                  alt="image"
                  className="w-full"
                />
            </div>
            <div>
              <span className="bg-blue-600 rounded inline-block text-center py-1 px-4 text-xs leading-loose font-semibold text-white mb-5">
                Diciembre, 2023
              </span>
              <h3>
                <a className="font-semibold text-xl">
                  Innovación Tecnológica y nuevas tendencias
                </a>
              </h3>
              <p className="text-base text-body-color">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
            </div>
        </div>
        
      </div>






    </section>



  </div>
  );
};

export default Home;
