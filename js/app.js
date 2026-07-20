let fechaSeleccionada = new Date();

let movimientos = obtenerMovimientos();

let movimientoEditando = null;

/*
=========================
 INICIO
=========================
*/

document.addEventListener("DOMContentLoaded", iniciarApp);

function iniciarApp() {
  actualizar();
}

/*
=========================
 GUARDAR
=========================
*/

function guardar() {
  guardarMovimientos(movimientos);

  cerrarModal();

  actualizar();
}

/*
=========================
 CREAR / EDITAR
=========================
*/

function agregarMovimiento() {
  let tipo = document.getElementById("tipo").value;

  let descripcion = document.getElementById("descripcion").value;

  let importe = Number(document.getElementById("importe").value);

  let categoria =
    tipo === "gasto" ? document.getElementById("categoria").value : "";

  let fecha = document.getElementById("fecha").value;

  if (!descripcion || !importe || !fecha) {
    alert("Completa todos los campos");

    return;
  }

  if (movimientoEditando) {
    let movimiento = movimientos.find((m) => m.id === movimientoEditando);

    if (movimiento) {
      movimiento.tipo = tipo;

      movimiento.descripcion = descripcion;

      movimiento.importe = importe;

      movimiento.categoria = categoria;

      movimiento.fecha = fecha;
    }

    movimientoEditando = null;
  } else {
    movimientos.push({
      id: Date.now(),

      fecha,

      tipo,

      descripcion,

      importe,

      categoria,
    });
  }

  guardar();

  limpiarFormulario();
}

function nuevoMovimiento() {
  movimientoEditando = null;

  document.getElementById("modal-title").textContent = "Nuevo movimiento";

  limpiarFormulario();

  cambiarTipoMovimiento();

  document.getElementById("fecha").value = new Date()
    .toISOString()
    .slice(0, 10);

  abrirModal();
}

function cambiarTipoMovimiento() {
  let tipo = document.getElementById("tipo").value;

  let categoria = document.getElementById("categoria-container");

  if (tipo === "ingreso") {
    categoria.style.display = "none";
  } else {
    categoria.style.display = "block";
  }
}

function editarMovimiento(id) {
  let movimiento = movimientos.find((m) => m.id === id);

  if (!movimiento) return;

  movimientoEditando = id;

  document.getElementById("modal-title").textContent = "Editar movimiento";

  document.getElementById("tipo").value = movimiento.tipo;

  document.getElementById("descripcion").value = movimiento.descripcion;

  document.getElementById("importe").value = movimiento.importe;

  document.getElementById("categoria").value = movimiento.categoria;

  document.getElementById("fecha").value = movimiento.fecha;

  cambiarTipoMovimiento();

  abrirModal();
}

function limpiarFormulario() {
  document.getElementById("descripcion").value = "";

  document.getElementById("importe").value = "";

  document.getElementById("fecha").value = new Date()
    .toISOString()
    .slice(0, 10);
}

function eliminarMovimiento(id) {
  if (!confirm("¿Eliminar este movimiento?")) {
    return;
  }

  movimientos = movimientos.filter((m) => m.id !== id);

  guardarMovimientos(movimientos);

  actualizar();
}

/*
=========================
 DASHBOARD
=========================
*/

function actualizar() {
  actualizarTituloMes();

  let movimientosMes = movimientos.filter((m) => {
    let fecha = new Date(m.fecha);

    return (
      fecha.getMonth() === fechaSeleccionada.getMonth() &&
      fecha.getFullYear() === fechaSeleccionada.getFullYear()
    );
  });

  let ingresos = 0;

  let gastos = 0;

  let categorias = {};

  movimientosMes.forEach((m) => {
    let importe = Number(m.importe);

    if (m.tipo === "ingreso") {
      ingresos += importe;
    } else {
      gastos += importe;

      if (categorias[m.categoria]) {
        categorias[m.categoria] += importe;
      } else {
        categorias[m.categoria] = importe;
      }
    }
  });

  let balance = ingresos - gastos;

  document.getElementById("ingresos").textContent = ingresos.toFixed(2) + " €";

  document.getElementById("gastos").textContent = gastos.toFixed(2) + " €";

  document.getElementById("balance").textContent = balance.toFixed(2) + " €";

  document.getElementById("ahorro").textContent = balance.toFixed(2) + " €";

  pintarMovimientos(movimientosMes);

  dibujarGrafico(categorias);

  dibujarEvolucion(movimientos);
}

function pintarMovimientos(listaMovimientos) {
  let lista = document.getElementById("lista");

  lista.innerHTML = "";

  if (listaMovimientos.length === 0) {
    lista.innerHTML = `

        <div class="empty-chart">

            📭

            <p>
            No hay movimientos este mes
            </p>

        </div>

        `;

    return;
  }

  listaMovimientos
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .forEach((m) => {
      lista.innerHTML += `


        <div class="movement">


            <div>


                <strong>
                ${m.categoria}
                </strong>


                <br>


                ${m.descripcion}


                <br>


                <small>
                ${m.fecha}
                </small>


            </div>



            <div class="movement-actions">


                <span class="${m.tipo}">


                ${m.tipo === "gasto" ? "-" : "+"}


                ${Number(m.importe).toFixed(2)} €


                </span>



                <button onclick="editarMovimiento(${m.id})">
                ✏️
                </button>



                <button onclick="eliminarMovimiento(${m.id})">
                🗑️
                </button>


            </div>


        </div>


        `;
    });
}

/*
=========================
 MODAL
=========================
*/

function abrirModal() {
  document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

/*
=========================
 MESES
=========================
*/

function cambiarMes(valor) {
  fechaSeleccionada.setMonth(fechaSeleccionada.getMonth() + valor);

  actualizar();
}

function actualizarTituloMes() {
  let texto = fechaSeleccionada.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  document.getElementById("mes-actual").textContent =
    texto.charAt(0).toUpperCase() + texto.slice(1);
}

/*
=========================
 EXPORTAR / IMPORTAR
=========================
*/

function exportar() {
  let datos = JSON.stringify(movimientos, null, 2);

  let blob = new Blob([datos], {
    type: "application/json",
  });

  let url = URL.createObjectURL(blob);

  let a = document.createElement("a");

  a.href = url;

  a.download = "mis-finanzas.json";

  a.click();
}

function importar() {
  let archivo = document.getElementById("archivo").files[0];

  if (!archivo) return;

  let reader = new FileReader();

  reader.onload = function (e) {
    movimientos = JSON.parse(e.target.result);

    guardar();
  };

  reader.readAsText(archivo);
}

function exportarMesPDF() {
  const { jsPDF } = window.jspdf;

  let movimientosMes = movimientos.filter((m) => {
    let fecha = new Date(m.fecha);

    return (
      fecha.getMonth() === fechaSeleccionada.getMonth() &&
      fecha.getFullYear() === fechaSeleccionada.getFullYear()
    );
  });

  let ingresos = 0;

  let gastos = 0;

  movimientosMes.forEach((m) => {
    if (m.tipo === "ingreso") {
      ingresos += Number(m.importe);
    } else {
      gastos += Number(m.importe);
    }
  });

  let ahorro = ingresos - gastos;

  let nombreMes = fechaSeleccionada.toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const pdf = new jsPDF();

  pdf.setFontSize(18);

  pdf.text("Informe financiero", 20, 20);

  pdf.setFontSize(14);

  pdf.text(nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1), 20, 32);

  pdf.setFontSize(12);

  pdf.text(`Ingresos: ${ingresos.toFixed(2)} €`, 20, 50);

  pdf.text(`Gastos: ${gastos.toFixed(2)} €`, 20, 60);

  pdf.text(`Ahorro: ${ahorro.toFixed(2)} €`, 20, 70);

  pdf.text("Movimientos:", 20, 90);

  let y = 105;

  movimientosMes
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .forEach((m) => {
      let linea = `${m.fecha} - ${m.descripcion} - ${m.importe.toFixed(2)} €`;

      pdf.text(linea, 20, y);

      y += 8;

      // Nueva página si se llena

      if (y > 280) {
        pdf.addPage();

        y = 20;
      }
    });

  pdf.save("informe-finanzas-" + nombreMes + ".pdf");
}
