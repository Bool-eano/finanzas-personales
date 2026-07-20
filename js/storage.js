const STORAGE_KEYS = {
  MOVIMIENTOS: "movimientos",

  CUENTAS: "cuentas",

  CATEGORIAS: "categorias",

  CONFIG: "configuracion",
};

/*
==============================
 MOVIMIENTOS
==============================
*/

function guardarMovimientos(datos) {
  localStorage.setItem(
    STORAGE_KEYS.MOVIMIENTOS,

    JSON.stringify(datos),
  );
}

function obtenerMovimientos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.MOVIMIENTOS)) || [];
}

/*
==============================
 CUENTAS
==============================
*/

const cuentasIniciales = [
  {
    id: 1,
    nombre: "Banco",
    icono: "🏦",
    saldo: 0,
  },

  {
    id: 2,
    nombre: "Efectivo",
    icono: "💵",
    saldo: 0,
  },

  {
    id: 3,
    nombre: "Tarjeta",
    icono: "💳",
    saldo: 0,
  },
];

function guardarCuentas(cuentas) {
  localStorage.setItem(
    STORAGE_KEYS.CUENTAS,

    JSON.stringify(cuentas),
  );
}

function obtenerCuentas() {
  let cuentas = localStorage.getItem(STORAGE_KEYS.CUENTAS);

  if (!cuentas) {
    guardarCuentas(cuentasIniciales);

    return cuentasIniciales;
  }

  return JSON.parse(cuentas);
}

/*
==============================
 CATEGORIAS
==============================
*/

const categoriasIniciales = [
  {
    nombre: "Vivienda",
    icono: "🏠",
  },

  {
    nombre: "Alimentación",
    icono: "🛒",
  },

  {
    nombre: "Transporte",
    icono: "🚗",
  },

  {
    nombre: "Ocio",
    icono: "🎮",
  },

  {
    nombre: "Restaurantes",
    icono: "🍽️",
  },

  {
    nombre: "Salud",
    icono: "💊",
  },

  {
    nombre: "Vacaciones",
    icono: "🌊",
  },

  {
    nombre: "Veterinario",
    icono: "🐈‍⬛",
  },

  {
    nombre: "Ropa",
    icono: "👖",
  },

  {
  nombre: "Ahorros",
  icono: "🏦",
  },

  {
    nombre: "Otros",
    icono: "📦",
  },
];

function obtenerCategorias() {
  let categorias = localStorage.getItem(STORAGE_KEYS.CATEGORIAS);

  if (!categorias) {
    guardarCategorias(categoriasIniciales);

    return categoriasIniciales;
  }

  return JSON.parse(categorias);
}

function guardarCategorias(datos) {
  localStorage.setItem(
    STORAGE_KEYS.CATEGORIAS,

    JSON.stringify(datos),
  );
}
