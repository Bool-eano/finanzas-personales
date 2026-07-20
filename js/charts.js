let grafico = null;

const coloresCategorias = {
  Vivienda: "#8b5cf6", // Morado
  Alimentación: "#f97316", // Naranja
  Transporte: "#3b82f6", // Azul
  Ocio: "#ec4899", // Rosa
  Restaurantes: "#ef4444", // Rojo
  Salud: "#22c55e", // Verde
  Vacaciones: "#06b6d4", // Turquesa
  Veterinario: "#84cc16", // Lima
  Ropa: "#a855f7", // Violeta
  Ahorros: "#14b8a6", // Verde azulado (Teal)
  Otros: "#71717a", // Gris
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
            boxWidth: 12,
            padding: 8,
            font: {
              size: 11,
            },
          },
        },
      },
    },
  });
}
