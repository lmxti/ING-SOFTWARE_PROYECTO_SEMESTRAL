import Swal from 'sweetalert2';

const Mensajes ={
    mensajeError: (mensaje) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: mensaje,
        });
    },
    mensajeExito: (mensaje) => {
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: mensaje,
        });
    }
}

export default Mensajes;