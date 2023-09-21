const form = document.getElementById('registerForm');

form.addEventListener('submit', async (event)=>{
    
    event.preventDefault();
    
    const data = new FormData(form);
       
    await fetch('/api/session/register',{
        method:'POST',
        body: data
    })
    .then(result=>{
        if(result.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'Excelente',
                text: 'Te registraste correctamente',
            });
            window.location.replace('/');

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El usuario ya existe o ocurrió algo inesperado',
                footer: 'Intenta registrarte nuevamente'
            });
            form.reset();
        };
    });
})