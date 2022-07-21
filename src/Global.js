import Swal from "sweetalert2";

export var Global = {
    url: 'http://ec2-54-161-157-247.compute-1.amazonaws.com:8000'
};
export function isLogged(statusCode, router) {
    if (statusCode == 401) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Problemente no has iniciado sesion o tu sesion a caducado",
            allowOutsideClick: false,
            confirmButtonText: 'Volver al incio',
            confirmButtonColor: '#00457C',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                router.push('/')
            }
        });
    }
}