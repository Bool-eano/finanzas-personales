let graficoEvolucion = null;

function dibujarEvolucion(movimientos) {
  const canvas = document.getElementById("grafico-evolucion");

  if (!canvas) return;

  let meses = [];

  let ingresos = [];

  let gastos = [];

  for (let i = 5; i >= 0; i--) {
    let fecha = new Date();

    fecha.setMonth(fecha.getMonth() - i);

    let mes = fecha.getMonth();

    let año = fecha.getFullYear();

    let nombre = fecha.toLocaleDateString("es-ES", {
      month: "short",
    });

    meses.push(nombre);

    let ingresoMes = 0;

    let gastoMes = 0;

    movimientos.forEach((m) => {
      let f = new Date(m.fecha);

      if (f.getMonth() === mes && f.getFullYear() === año) {
        if (m.tipo === "ingreso") {
          ingresoMes += Number(m.importe);
        }

        if (m.tipo === "gasto") {
          gastoMes += Number(m.importe);
        }
      }
    });

    ingresos.push(ingresoMes);

    gastos.push(gastoMes);
  }

  if (graficoEvolucion) {
    graficoEvolucion.destroy();
  }

  graficoEvolucion = new Chart(canvas, {
    type: "bar",

    data: {
      labels: meses,

      datasets: [
        {
          label: "Ingresos",

          data: ingresos,
        },

        {
          label: "Gastos",

          data: gastos,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          labels: {
            color: "#f8fafc",
          },
        },
      },
    },
  });
}
