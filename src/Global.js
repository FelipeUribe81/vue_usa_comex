import Swal from "sweetalert2";

export var Global = {
    url: 'http://ec2-3-86-164-109.compute-1.amazonaws.com:8000'
};

export function isLogged(statusCode, router) {
    if (statusCode == 401) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Problemente no has iniciado sesion o tu sesion ha caducado",
            allowOutsideClick: false,
            confirmButtonText: 'Volver al incio',
            confirmButtonColor: '#00457C',
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/')
            }
        });
    }
}

export function serverError(statusCode, router) {
    if (statusCode >= 500 && statusCode < 600) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrido un error en el servidor... Por favor intenta de nuevo más tarde ",
            showCancelButton: true,
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Volver al incio',
            cancelButtonText: 'Seguir en la pagina',
            confirmButtonColor: '#00457C',
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/')
            }
        });
    }
}