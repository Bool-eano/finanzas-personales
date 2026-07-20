let grafico = null;

const coloresCategorias = {
  Vivienda: "#8b5cf6", // morado

  Alimentación: "#f59e0b", // naranja

  Transporte: "#38bdf8", // azul claro

  Ocio: "#ec4899", // rosa

  Salud: "#22c55e", // verde

  Vacaciones: "#06b6d4", // turquesa

  Veterinario: "#a3e635", // lima

  Ropa: "#f97316", // naranja intenso

  Otros: "#71717a", // gris
};

function dibujarGrafico(categorias) {
  const canvas = document.getElementById("grafico");

  const empty = document.getElementById("empty-chart");

  if (!canvas) {
    return;
  }

  const tieneDatos = Object.keys(categorias).length > 0;

  /*
    =========================
       ESTADO VACÍO
    =========================
    */

  if (!tieneDatos) {
    canvas.style.display = "none";

    if (empty) {
      empty.style.display = "flex";
    }

    if (grafico) {
      grafico.destroy();

      grafico = null;
    }

    return;
  }

  /*
    =========================
       MOSTRAR GRÁFICO
    =========================
    */

  canvas.style.display = "block";

  if (empty) {
    empty.style.display = "none";
  }

  if (grafico) {
    grafico.destroy();
  }

  const etiquetas = Object.keys(categorias);

  const valores = Object.values(categorias);

  const colores = etiquetas.map(
    (categoria) => coloresCategorias[categoria] || "#71717a",
  );

  grafico = new Chart(canvas, {
    type: "doughnut",

    data: {
      labels: etiquetas,

      datasets: [
        {
          data: valores,

          backgroundColor: colores,

          borderWidth: 0,

          hoverOffset: 8,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      cutout: "65%",

      animation: {
        duration: 700,
      },

      plugins: {
        legend: {
          position: "bottom",

          labels: {
            color: "#f8fafc",

            padding: 20,

            font: {
              size: 14,
            },
          },
        },
      },
    },
  });
}
