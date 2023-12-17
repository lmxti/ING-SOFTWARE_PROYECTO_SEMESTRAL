import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { getPDF } from "../../services/pdf.service";

const GetPDFForm = () => {
  const [pdfList, setPDFList] = useState([]);

  const setPDF = async () => {
    try {
      const response = await getPDF();
      setPDFList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPDF();
  }, []);

  const showPDF = () => (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th className="border border-blue-300 px-4 py-2">Nombre</th>
            <th className="border border-blue-300 px-4 py-2">Postulante</th>
            <th className="border border-blue-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pdfList.map((pdf) => (
            <tr key={pdf.id}>
              <td className="border border-blue-300 px-4 py-2">{pdf.name}</td>
              <td className="border border-blue-300 px-4 py-2">{pdf.nombre}</td>
              <td className="border border-blue-300 px-4 py-2"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <NavBar />
      <div className="container mx-auto my-4">
        {showPDF()}
      </div>
    </>
  );
};

export default GetPDFForm;
