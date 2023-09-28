/*Botón para eliminar un usuario*/

const deleteUser = document.querySelectorAll("#deleteUser")

deleteUser.forEach((button)=>{
    //const userEmail = document.querySelector('#userEmail').textContent
    button.addEventListener('click', async (event)=>{
        const email = event.target.parentNode.parentNode.children[1].children[1].textContent
        console.log(email)

        await fetch(`api/users/${email}`, {method: 'DELETE'})
        .then(result=>{
            console.log(result)
            if(result.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'OK',
                    text: 'Se eliminó el usuario correctamente',
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo ocurrió',
                    footer: 'Intentalo nuevamente'
                });
            };

            location.reload(true)
        });        
    })
})

//Boton para cambiar de rol un usuario

const changeRole = document.querySelectorAll('#changeRole');

changeRole.forEach((button)=>{
    button.addEventListener('click', async (event)=>{
        event.preventDefault()
        const email = event.target.parentNode.parentNode.children[1].children[1].textContent

        const response = await fetch(`/api/users/premium/${email}`, { method: 'POST' })
        const data = await response.json()
        console.log(data)
        
        if(data.status === 'success'){
            Swal.fire({
                icon: 'success',
                title: 'OK',
                text: 'Se modificó el rol correctamente',
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No es posible cambiar el rol',
                footer: 'Debe cargar la documentacion del usuario requerida'
            });
        };

        location.reload(true)
        
    })
})

