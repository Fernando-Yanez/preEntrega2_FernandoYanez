//Inicio de secion

//Variables
let i = 0; //definicion de iterador

let usuario = [
    {
        nombre: '',
        apellido: '',
        nickName: '',
        edad: 0,
        rut: '',
        correo: ''

    }
]

// Creacion de nuevo usuario
class Usuario {
    constructor(nombre, apellido, nickName, edad, rut, correo) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.nickName = nickName,
            this.edad = edad,
            this.rut = rut,
            this.correo = correo

    }
}



// funcion para validar que el rut,correo y nombre siga un formato y no se ingrese caracteres incorrectos 
function FormatoRut(rut) {
    const formatoRut = /^[0-9]{8,9}-[1-9kK]{1}$/
    return formatoRut.test(rut);
}

function FormatoCorreo(correo)
{
    const formatoCorreo = /^[a-zA-Z0-9.-_]@[a-zA-Z0-9.]{2,}$/
    return formatoCorreo.test(correo);
}

function FormatoNombre(nombre)
{
    const formatoNombre = /^[a-zA-Z]$/;
    return formatoNombre.test(nombre);
}

function FormatoEdad(edad)
{
    const formatoEdad = /^[0-9]{1,3}$/;
    return formatoEdad.test(edad);
}

//Funcion para invertir los datos ingresados
function invertirRut(rut)
{
    let rutInvertido = '';

    for( i = rut.length - 1; i>=0; i--)
    {
        rutInvertido += rut[i];
    }
    return rutInvertido;
}


//Funcion para validar que el rut sea correcto
function ValidadorRut(rut)
{
    let salida = true; //Variable de salida del ciclo
    let digitoVerificador= rut[rut.length - 1]; //Obtencion del digito verificador del rut
    let rutSinVerificador = '';
    let rutInvertido = '';
    let multiplicador = 2;
    let suma = 0;
    let resto = 0;
    let digitoVerificadorCalculado = 0;

    //ciclo para separar la primera parte del string 
    for(i = 0; i< rut.length; i++)
    {
        if(rut[i] != '-')
        {
            rutSinVerificador += rut[i];
        }else{break;}
    }

    rutInvertido = invertirRut(rutSinVerificador); 

    for(i = 0; i < rutInvertido.length; i++)
    {
        let numero = parseInt(rutInvertido[i]); // Obtencion de los caracteres del string rut y convirtiendolos en numero

        suma += numero * multiplicador;

        multiplicador++;

        if(multiplicador > 7)
        {
            multiplicador = 2;
        }

    }

    resto = suma % 11;
    digitoVerificadorCalculado = 11-resto; //Fin del calculo para obtener el digito verificador

    if(digitoVerificadorCalculado == 10)
    {
        digitoVerificadorCalculado = 'k';
    }
    if(digitoVerificadorCalculado == 11)
    {
        digitoVerificadorCalculado = 0;
    }


    if(digitoVerificador == digitoVerificadorCalculado)
    {
        return true;
    }else{
        return false;
    }
}
let salida = true; //Variable salida de ciclo


//Funcion de busqueda del usuario atravez del parametro unico(rut)
function buscarUsuario(rut)
{
    return usuario.find((usuario) => usuario.rut === rut);
}

while(salida)
{
    let opcion = prompt('Ingrese la opcion \n opcion 1 = Crear usuario \n opcion 2 = buscar usuario \n opcion 3 = salida')

    switch(opcion)
    {
        case '1':

                let nombre = prompt('Ingrese nombre');

                if(FormatoNombre(nombre))
                {
                    let apellido = prompt('Ingrese apellido');
                    if(FormatoNombre(apellido))
                    {
                        let edad = prompt('Ingrese su edad');
                        if(FormatoEdad(edad))
                        {
                            let rut = prompt('Ingrese rut \n Formato 00000000-0');

                            if(FormatoRut(rut))
                            {
                                if(ValidadorRut(rut))
                                {
                                    let nickName= prompt('Ingrese su nombre de usuario');
                                    let correo = prompt('Ingrese correo');

                                    if(FormatoCorreo(correo))
                                    {
                                        let nuevoUsuario = new Usuario( nombre, apellido, nickName, edad, rut, correo )
                                        usuario.push(nuevoUsuario);
                                        console.log('Se a ingresado usuario correcta mente');
                                    }
                                    else
                                    {
                                        alert('Formato de correo invalido');
                                    }
                                }else
                                {
                                    alert('Rut invalido');
                                }
                            }
                            else
                            {
                                alert('Formato de rut invalido');
                            }
                        }
                        else(
                            alert('Edad invalida')
                        )
                    }else{
                        alert('Formato del apellido mal ingresado')
                    }
                }else
                {
                    alert('Formato de nombre invalido');
                }



                break;
        case '2':
   
                
                if(usuario.length != 1)
                {
                    console.log(usuario.length)
                    let rutBuscar = prompt('Favor ingresar rut a buscar \n Ej 00000000-0'); 

                    if(FormatoRut(rutBuscar))
                        {
                            let usuarioEncontrado = buscarUsuario(rutBuscar);
                            console.table(usuarioEncontrado);
                        }else
                        {
                                alert('El formato ingresado no es correcto');
                        }

                }else
                {
                    console.log('No hay usuarios registrados');
                }
        break;

        case '3':
                salida = false;
                break;
        default:
            alert('Favor de ingresar la opcion correcta')
    }

}