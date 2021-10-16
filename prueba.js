d3.json ("https://raw.githubusercontent.com/josefo1978/poblacion_espana/main/evolucion_de_la_poblacion_de_espa%C3%B1a_desde_el_a%C3%B1o_2002.json").then (function (datosCompletos){
    
    
    // NUEVA VARIABLE CON LA INFO DE PARTIDOS DEL NUEVO DATASET
    var datosPoblacion = datosCompletos.poblacion
    
    datos = datosPoblacion
    
    
    var height = 500
    var width = 1500
    
    var margin = {
        top: 50,
        botton: 50,
        left: 40,
        right: 100
    }
    
    timeScale = d3.scaleTime()
        .domain([new Date(2002), new Date(2022)])
        //.range([0, 40]);

    //timeScale(new Date(2002,12,31))
    //timeScale(new Date(2021,12,31))
    
    
    
    var escalaX = timeScale
    
    //var escalaX = d3.scaleLinear()
        //.domain ([1,10])
        //.range (["0","40"])
       
       .range ([ + margin.left, width - margin.right])
    
    var escalaY = d3.scaleLinear()
        //.domain ([0, 3000])
        .domain (d3.extent(datos, d => d.Valor))
       // .range (["500","0"])
          .range ([height-margin.botton, 0 + margin.top]) 
    
    // CREAMOS ESCALA COLOR
    
    var escalaColor = d3.scaleLinear()
        .domain(d3.extent(datos, d => d.Agno)) 
        .range(["green","green"]) 
    
    // CREAMOS ESCALA TAMAÑO CIRCULOS
    
    //var escala_tamanio = d3.scaleLinear()
        //.domain (d3.extent(datos, d=>d.Agno))
        //.range ([8,30]) 
    
    
    var elementoSVG = d3.select ("body").append ("svg")
        .attr("width",width)
        .attr("height",height)

    elementoSVG
        .selectAll("circle")
        .data(datos)
        .enter()
        .append("circle")
        
        .attr("cx",d => escalaX(d.Agno))
        .attr("cy",d => escalaY(d.Valor))
    
        // APLICAR ESCALA COLOR
        .attr ("fill", d => escalaColor(d.Valor))
    
        .attr("r",3)
        //.attr("r", d => escala_tamanio(d.Parametro))
    
    //// EJES
    // VISUALIZAMOS EJE Y
    var ejeY = d3.axisLeft (escalaY)
    
    // PINTAR eje y
    elementoSVG
        .append("g")
        .attr ("transform", "translate (" + margin.left + ",0)")
        .call (ejeY)
    
    /// VISUALIZAMOS EJE X
    var ejeX = d3.axisBottom (escalaX)
    // PONER TICKS
        .ticks (10)
        .tickFormat (d3.format("d"))
    
    // PINTAR eje X
    elementoSVG
        .append("g")
        .attr ("transform", "translate (0," + (height - margin.botton) + ")")
        .call (ejeX)
    
    
}                                 
)

