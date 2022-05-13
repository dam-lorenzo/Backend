const { normalize, schema, denormalize } = require('normalizr')
const util = require('util')

const holding = {
  id: '10000',
  empresas: [
    {
      id: '1000',
      nombre: 'Coderhouse',
      gerente: {
        id: '2',
        nombre: 'Pedro',
        apellido: 'Mei',
        DNI: '20442639',
        direccion: 'CABA 457',
        telefono: '1567811544',
      },
      encargado: {
        id: '3',
        nombre: 'Pablo',
        apellido: 'Blanco',
        DNI: '20442640',
        direccion: 'CABA 458',
        telefono: '1567811545',
      },
      empleados: [
        {
          id: '1',
          nombre: 'Nicole',
          apellido: 'Gonzalez',
          DNI: '20442638',
          direccion: 'CABA 456',
          telefono: '1567811543',
        },
        {
          id: '2',
          nombre: 'Pedro',
          apellido: 'Mei',
          DNI: '20442639',
          direccion: 'CABA 457',
          telefono: '1567811544',
        },
        {
          id: '3',
          nombre: 'Pablo',
          apellido: 'Blanco',
          DNI: '20442640',
          direccion: 'CABA 458',
          telefono: '1567811545',
        },
        {
          id: '4',
          nombre: 'Ana',
          apellido: 'Rojo',
          DNI: '20442641',
          direccion: 'CABA 459',
          telefono: '1567811546',
        },
        {
          id: '5',
          nombre: 'Lucia',
          apellido: 'Sorbo',
          DNI: '20442642',
          direccion: 'CABA 460',
          telefono: '1567811547',
        },
        {
          id: '6',
          nombre: 'Jose',
          apellido: 'Pieres',
          DNI: '20442643',
          direccion: 'CABA 461',
          telefono: '1567811548',
        },
        {
          id: '7',
          nombre: 'Maria',
          apellido: 'Lopez',
          DNI: '20442644',
          direccion: 'CABA 462',
          telefono: '1567811549',
        },
      ],
    },
    {
      id: '1001',
      nombre: 'Coderhouse2',
      gerente: {
        id: '6',
        nombre: 'Jose',
        apellido: 'Pieres',
        DNI: '20442643',
        direccion: 'CABA 461',
        telefono: '1567811548',
      },
      encargado: {
        id: '5',
        nombre: 'Lucia',
        apellido: 'Sorbo',
        DNI: '20442642',
        direccion: 'CABA 460',
        telefono: '1567811547',
      },
      empleados: [
        {
          id: '1',
          nombre: 'Nicole',
          apellido: 'Gonzalez',
          DNI: '20442638',
          direccion: 'CABA 456',
          telefono: '1567811543',
        },
        {
          id: '2',
          nombre: 'Pedro',
          apellido: 'Mei',
          DNI: '20442639',
          direccion: 'CABA 457',
          telefono: '1567811544',
        },
        {
          id: '5',
          nombre: 'Lucia',
          apellido: 'Sorbo',
          DNI: '20442642',
          direccion: 'CABA 460',
          telefono: '1567811547',
        },
        {
          id: '6',
          nombre: 'Jose',
          apellido: 'Pieres',
          DNI: '20442643',
          direccion: 'CABA 461',
          telefono: '1567811548',
        },
        {
          id: '7',
          nombre: 'Maria',
          apellido: 'Lopez',
          DNI: '20442644',
          direccion: 'CABA 462',
          telefono: '1567811549',
        },
        {
          id: '8',
          nombre: 'Lucio',
          apellido: 'Garcia',
          DNI: '20442645',
          direccion: 'CABA 463',
          telefono: '1567811550',
        },
      ],
    },
    {
      id: '1002',
      nombre: 'Coderhouse3',
      gerente: {
        id: '9',
        nombre: 'Diego',
        apellido: 'Sojo',
        DNI: '20442646',
        direccion: 'CABA 464',
        telefono: '1567811551',
      },
      encargado: {
        id: '8',
        nombre: 'Lucio',
        apellido: 'Garcia',
        DNI: '20442645',
        direccion: 'CABA 463',
        telefono: '1567811550',
      },
      empleados: [
        {
          id: '4',
          nombre: 'Ana',
          apellido: 'Rojo',
          DNI: '20442641',
          direccion: 'CABA 459',
          telefono: '1567811546',
        },
        {
          id: '5',
          nombre: 'Lucia',
          apellido: 'Sorbo',
          DNI: '20442642',
          direccion: 'CABA 460',
          telefono: '1567811547',
        },
        {
          id: '6',
          nombre: 'Jose',
          apellido: 'Pieres',
          DNI: '20442643',
          direccion: 'CABA 461',
          telefono: '1567811548',
        },
        {
          id: '7',
          nombre: 'Maria',
          apellido: 'Lopez',
          DNI: '20442644',
          direccion: 'CABA 462',
          telefono: '1567811549',
        },
        {
          id: '9',
          nombre: 'Diego',
          apellido: 'Sojo',
          DNI: '20442646',
          direccion: 'CABA 464',
          telefono: '1567811551',
        },
      ],
    },
  ],
}

const empleado = new schema.Entity('empleado')

const organigrama = new schema.Entity('organigrama', {
  gerente: empleado,
  encargado: empleado,
  empleados: [empleado],
})

const grupEmpresas = new schema.Entity('grupo', {
  empresas: [organigrama],
})

function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true))
}

const normalizado = normalize(holding, grupEmpresas)
print(normalizado)

/* 
entities: {
    empleado: {
      '1': {
        id: '1',
        nombre: 'Nicole',
        apellido: 'Gonzalez',
        DNI: '20442638',
        direccion: 'CABA 456',
        telefono: '1567811543'
      },
      '2': {
        id: '2',
        nombre: 'Pedro',
        apellido: 'Mei',
        DNI: '20442639',
        direccion: 'CABA 457',
        telefono: '1567811544'
      },
      '3': {
        id: '3',
        nombre: 'Pablo',
        apellido: 'Blanco',
        DNI: '20442640',
        direccion: 'CABA 458',
        telefono: '1567811545'
      },
      '4': {
        id: '4',
        nombre: 'Ana',
        apellido: 'Rojo',
        DNI: '20442641',
        direccion: 'CABA 459',
        telefono: '1567811546'
      },
      '5': {
        id: '5',
        nombre: 'Lucia',
        apellido: 'Sorbo',
        DNI: '20442642',
        direccion: 'CABA 460',
        telefono: '1567811547'
      },
      '6': {
        id: '6',
        nombre: 'Jose',
        apellido: 'Pieres',
        DNI: '20442643',
        direccion: 'CABA 461',
        telefono: '1567811548'
      },
      '7': {
        id: '7',
        nombre: 'Maria',
        apellido: 'Lopez',
        DNI: '20442644',
        direccion: 'CABA 462',
        telefono: '1567811549'
      },
      '8': {
        id: '8',
        nombre: 'Lucio',
        apellido: 'Garcia',
        DNI: '20442645',
        direccion: 'CABA 463',
        telefono: '1567811550'
      },
      '9': {
        id: '9',
        nombre: 'Diego',
        apellido: 'Sojo',
        DNI: '20442646',
        direccion: 'CABA 464',
        telefono: '1567811551'
      }
    },
    organigrama: {
      '1000': {
        id: '1000',
        nombre: 'Coderhouse',
        gerente: '2',
        encargado: '3',
        empleados: [
          '1', '2', '3',
          '4', '5', '6',
          '7'
        ]
      },
      '1001': {
        id: '1001',
        nombre: 'Coderhouse2',
        gerente: '6',
        encargado: '5',
        empleados: [ '1', '2', '5', '6', '7', '8' ]
      },
      '1002': {
        id: '1002',
        nombre: 'Coderhouse3',
        gerente: '9',
        encargado: '8',
        empleados: [ '4', '5', '6', '7', '9' ]
      }
    },
    grupo: { '10000': { id: '10000', empresas: [ '1000', '1001', '1002' ] } }
  },
  result: '10000'
} */