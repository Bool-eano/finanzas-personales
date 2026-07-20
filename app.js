let movimientos =
JSON.parse(localStorage.getItem("movimientos"))
|| [];



let grafico;



function guardar(){

localStorage.setItem(
"movimientos",
JSON.stringify(movimientos)
);

}



function agregarMovimiento(){


let tipo =
document.getElementById("tipo").value;


let descripcion =
document.getElementById("descripcion").value;


let importe =
Number(document.getElementById("importe").value);


let categoria =
document.getElementById("categoria").value;



if(!descripcion || !importe){

alert("Completa todos los campos");

return;

}



movimientos.push({

id:Date.now(),

fecha:
new Date().toISOString().slice(0,10),

tipo,

descripcion,

importe,

categoria

});


guardar();

actualizar();


document.getElementById("descripcion").value="";
document.getElementById("importe").value="";


}



function actualizar(){


let ingresos=0;
let gastos=0;


const lista =
document.getElementById("lista");


lista.innerHTML="";


let categorias={};



movimientos.forEach(m=>{


if(m.tipo==="ingreso")
ingresos+=m.importe;

else{

gastos+=m.importe;


categorias[m.categoria] =
(categorias[m.categoria]||0)
+m.importe;

}



lista.innerHTML += `

<tr>

<td>${m.fecha}</td>

<td>${m.descripcion}</td>

<td>${m.categoria}</td>

<td class="${m.tipo}">
${m.tipo}
</td>


<td>
${m.importe.toFixed(2)} €
</td>


<td>

<button onclick="borrar(${m.id})">
❌
</button>

</td>


</tr>

`;


});



document.getElementById("balance")
.innerHTML =
(ingresos-gastos).toFixed(2)+" €";


document.getElementById("ingresos")
.innerHTML =
ingresos.toFixed(2)+" €";


document.getElementById("gastos")
.innerHTML =
gastos.toFixed(2)+" €";



dibujarGrafico(categorias);


}



function borrar(id){

movimientos =
movimientos.filter(
m=>m.id!==id
);

guardar();

actualizar();

}




function dibujarGrafico(datos){


let ctx =
document
.getElementById("grafico");



if(grafico)
grafico.destroy();



grafico =
new Chart(ctx,{

type:"doughnut",

data:{

labels:Object.keys(datos),

datasets:[{

data:Object.values(datos)

}]

}

});


}




function exportar(){


let datos =
JSON.stringify(
movimientos,
null,
2
);


let blob =
new Blob(
[datos],
{type:"application/json"}
);


let url =
URL.createObjectURL(blob);



let a =
document.createElement("a");


a.href=url;

a.download=
"mis-finanzas.json";


a.click();


}



function importar(){


let archivo =
document.getElementById("archivo")
.files[0];


if(!archivo)
return;



let reader =
new FileReader();



reader.onload=function(e){


movimientos =
JSON.parse(e.target.result);


guardar();

actualizar();


};


reader.readAsText(archivo);


}



actualizar();