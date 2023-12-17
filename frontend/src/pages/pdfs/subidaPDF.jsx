import { useState } from "react";
import { useRouter } from "next/router";
import { uploadPDF } from "../../services/pdf.service";
import NavBar from "../../components/NavBar";

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
    <>
    <NavBar/>
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-300 mx-auto p-12 rounded-md">
        <div className="mb-6">
          <label
            htmlFor="archivos"
            className="block text-xl mb-2 text-center"
          >
            Selecciona un archivo para adjuntar a su beca
          </label>
          <input
            type="file"
            id="archivos"
            name="archivos"
            onChange={(e) => setNombreArchivo(e.target.files[0].name)}
            className="w-full p-2"
          />
          <p className="text-center mt-3">
            Solo se aceptan archivos PDF
          </p>
        </div>
        <div className="flex justify-center items-center gap-3 mt-5">
          <button
            type="submit"
            className="bg-teal-500 text-white py-4 w-full rounded-md hover:bg-teal-600"
          >
            Subir PDF
          </button>
        </div>
      </div>
    </form>
    </>
  );
}
