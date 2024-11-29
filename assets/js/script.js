async function todasLasMonedas(){
    try{
        const res = await fetch("https://mindicador.cl/api/");
        const data = await res.json();
        GetValues(data);
    }
    catch(error){
        alert (error.message);
    }
}

todasLasMonedas()

async function todasLasFechas(divisa){
    try{
        const res = await fetch(`https://mindicador.cl/api/${divisa}`);
        const fechas = await res.json();
        console.log(fechas)
        let fechasMod = []
        let valoresMod = []
        for (let i = 10; i > 0;i--){
            fechasMod.push ({fecha: fechas.serie[i].fecha})
            valoresMod.push ({valor: fechas.serie[i].valor})
        }
        
    prepararGraficos(fechasMod.map((fecha) => fecha.fecha),valoresMod.map((valor) => valor.valor),divisa)
    console.log(fechasMod.map((fecha) => fecha.fecha))
    console.log(valoresMod.valor)
    }
    catch(error){
        alert (error.message);
    }
}

// TODO CARGA DE LAS ETIQUETAS HTML
const divisa = document.querySelector(".divisa");
const input = document.querySelector("input");
const parrafo = document.querySelector(".parrafo")
const selector = document.querySelector("#sel-divisa");
const boton = document.querySelector("button");

//! Cargando las variables que se necesitan para el cálculo
const GetValues = (data)=>{
    const divisa_uf = {cod:data.uf["codigo"], nombre:data.uf["nombre"], valor:data.uf["valor"]};
    const divisa_dolar = {cod:data.dolar["codigo"], nombre:data.dolar["nombre"], valor:data.dolar["valor"]};
    const divisa_euro = {cod:data.euro["codigo"], nombre:data.euro["nombre"], valor:data.euro["valor"]};
    const divisa_bitcoin = {cod:data.bitcoin["codigo"], nombre:data.bitcoin["nombre"], valor:data.bitcoin["valor"]};
    renderDivisas(divisa_uf, divisa_dolar, divisa_euro, divisa_bitcoin);
    boton.addEventListener("click",()=>{
        Multiplicar(divisa_uf, divisa_dolar, divisa_euro, divisa_bitcoin)
    })
}

//! Cargando el Selector
const renderDivisas = (dato1,dato2,dato3,dato4)=>{
    const valor_uf = dato1;
    const valor_dolar = dato2;
    const valor_euro = dato3;
    const valor_bitcoin = dato4;
    divisa.innerHTML = "";
    let html=""
    html+= `
            <option selected>Selecciona Moneda</option>
            <option value="${valor_uf.nombre}">1 ${valor_uf.nombre}</option>
            <option value="${valor_dolar.nombre}">1 ${valor_dolar.nombre}</option>
            <option value="${valor_euro.nombre}">1 ${valor_euro.nombre}</option>
            <option value="${valor_bitcoin.nombre}">1 ${valor_bitcoin.nombre}</option>
        `
    selector.innerHTML = html;
    selector.addEventListener("change",()=>{
        let result = "" 

        if (selector.value == valor_uf.nombre){
            result = new Intl.NumberFormat().format(valor_uf.valor)
            todasLasFechas(valor_uf.cod)
        }else if(selector.value == valor_dolar.nombre){
            result = new Intl.NumberFormat().format(valor_dolar.valor)
            todasLasFechas(valor_dolar.cod)
        }else if(selector.value == valor_euro.nombre){
            result = new Intl.NumberFormat().format(valor_euro.valor)
            todasLasFechas(valor_euro.cod)
        }else if(selector.value == valor_bitcoin.nombre){
            result = new Intl.NumberFormat().format(valor_bitcoin.valor)
            todasLasFechas(valor_bitcoin.cod)
        }else{
            result = ""
        }
        divisa.innerHTML = result
        });
}

//! Función de multiplicación de valor divisa y valor input
const Multiplicar = (dato1, dato2, dato3, dato4)=>{
    const valor_uf = dato1;
    const valor_dolar = dato2;
    const valor_euro = dato3;
    const valor_bitcoin = dato4;
    let resultado = 0;
    if(selector.value == valor_uf.nombre){
        resultado = input.value / valor_uf.valor 
    }else if(selector.value == valor_dolar.nombre){
        resultado = input.value / valor_dolar.valor 
    }else if(selector.value == valor_euro.nombre){
        resultado = input.value / valor_euro.valor 
    }else if(selector.value == valor_bitcoin.nombre){
        resultado = input.value / valor_bitcoin.valor
    }else{
    };

    //* Conversion a formato con separador de miles
    parrafo.innerHTML = new Intl.NumberFormat().format(resultado);

}
let myChart = null;

function prepararGraficos(fechas,valores,divisa){
    const chartDOM = document.getElementById("myChart");
    if(myChart != null){
        myChart.destroy()
    }
    myChart = new Chart(chartDOM, {
            type: 'line',
            data:{
                labels: fechas,
                datasets: [{
                    label: divisa,
                    data: valores,
                    backgroundColor: '#FD0054',
                }]
            }

    });
}


/* function prepararConfiguracionParaLaGrafica(monedas) {
    // Creamos las variables necesarias para el objeto de configuración
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = monedas.map((moneda) => moneda.fecha);
    const titulo = "Monedas";
    const colorDeLinea = "red";
    const valores = monedas.map((moneda) => {
    const valor = moneda.Valor.replace(",", ".");
    return Number(valor);
    });
    // Creamos el objeto de configuración usando las variables anteriores
    const config = {
    type: tipoDeGrafica,
    data: {
    labels: nombresDeLasMonedas,
    datasets: [
    
    {
    label: titulo,
    backgroundColor: colorDeLinea,
    data: valores
    }
    ]
    }
    };
    return config;
}

async function renderGrafica(divisas) {
    const monedas = await divisas;
    const config = prepararConfiguracionParaLaGrafica(monedas);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
}

renderGrafica();
 */