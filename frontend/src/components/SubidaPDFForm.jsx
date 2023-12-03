import { useState } from "react";
import { useRouter } from "next/router";
import { uploadPDF } from "../services/pdf.service";

export default function SubidaPDFForm() {
  const router = useRouter();
  const [nombreArchivo, setNombreArchivo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const file = e.target.archivos.files[0];
      const personId = router.query.id;

      await uploadPDF(file, personId);

      // Manejo de respuesta sin alerta
      console.log("Se ha subido correctamente el PDF");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-300 mx-auto p-12 rounded-md">
        <h1 className="text-4xl uppercase text-center mb-6">
          Subir comprobante
        </h1>
        <div className="mb-6">
          <label
            htmlFor="archivos"
            className="block text-xl uppercase mb-2 text-center"
          >
            Selecciona un archivo
          </label>
          <input
            type="file"
            id="archivos"
            name="archivos"
            onChange={(e) => setNombreArchivo(e.target.files[0].name)}
            className="w-full p-4"
          />
          <p className="text-xl uppercase text-center mt-2">
            Solo se aceptan archivos PDF
          </p>
        </div>
        <div className="flex justify-center items-center gap-4 mt-14">
          <button
            type="submit"
            className="bg-teal-500 text-white py-8 w-full md:w-2/5 text-2xl"
          >
            Subir PDF
          </button>
          {/* Agrega el botón de ver PDFs subidos según la lógica de tu aplicación */}
        </div>
      </div>
    </form>
  );
}
