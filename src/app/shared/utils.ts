export const TEXT = {
    table:{
        search: 'Search...',
        btnAdd: 'Agregar',
        columnNameTable:[
            'Logo',
            'Nombre del producto',
            'Descripción',
            'Fecha de liberación',
            'Fecha de reestructuración'
        ],
        total: 'Resultados',
        productPerPage: 'Productos por página:',
        page: 'Página: ',
        forward: 'Adelante',
        back: 'Atrás'
    },
    form: {
        title:'Formulario de Registro',
        errorRequire:'Este campo es requerido.',
        errorLength: 'Este campo debe tener entre {min} y {max} caracteres.',
        id: { label: 'ID', placeholder: 'Introduce el id', error: 'ID no valido!' },
        name: {
            label: 'Nombre',
            placeholder: 'Introduce el nombre del producto',
            error: 'Este campo debe tener entre 5 y 100 caracteres.',
        },
        description: {
            label: 'Descripción',
            placeholder: 'Introduce la descripción',
            error: 'Este campo debe tener entre 10 y 200 caracteres.',

        },
        logo:{
            label: 'Logo',
            placeholder: 'Introduzca la url del logo.',
        },
        dateRelease: {
            label: 'Fecha Liberación',
            placeholder: 'Introduzca la fecha a liberar el producto',
            error: 'La fecha debe ser igual o mayor a la actual.',
        },
        dateReview: {
            label: 'Fecha Revisión',
            placeholder: 'Introduzca la fecha a liberar el producto',
        },
    }
}