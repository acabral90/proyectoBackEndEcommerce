import Swal from "sweetalert2";

const form = document.getElementById("loginForm");

form.addEventListener('submit', e =>{
    e.preventDefault();

    const data = new FormData(form);

    const obj = {};

    data.forEach((value,key) => obj[key]=value)

    fetch('/api/session/',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=>{
        if(result.status == 200){
            window.location.replace('/products')
        }else if(result.status == 400){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Datos incorrectos',
                footer: 'Ingrese una cuenta ya registrada'
              })
        }
    })
})