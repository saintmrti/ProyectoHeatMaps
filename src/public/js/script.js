function drawHeatMaps() {
    let maxP= 0.600;

    fetch('/data1')
    .then(response => response.json())
    .then(data => {
        update(data, '#heatmap1', maxP);
        // window.addEventListener('resize', update);
    });

    fetch('/data2')
    .then(response => response.json())
    .then(data => {
        update(data, '#heatmap2', maxP);
    });

    fetch('/data3')
    .then(response => response.json())
    .then(data => {
        updateDiff(data, maxP);
    });
};

function update(data, chartId, maxPercent) {
   try {

        if (JSON.stringify(data) === '{}') {
            console.log('La respuesta es un objeto JSON vacío');
        } else {
            // const container = document.querySelector('.heatmap');
            // const containerRect = container.getBoundingClientRect();
            // const width = containerRect.width;
            // const height = containerRect.height;
            // console.log(width);
            // console.log(height);
            const width = 742;
            const height = 929;
            const margin = { top: 20, right: 0, bottom: 30, left: 0  };

            const maxX = d3.max(data, d => d.coord[0]);
            const maxY = d3.max(data, d => d.coord[1]);

            const xScale = d3.scaleLinear()
            .domain([0, maxX])
            .range([margin.left, width - margin.right]);

            const yScale = d3.scaleLinear()
            .domain([0, maxY])
            .range([height - margin.bottom, margin.top]);

            const colorScale = d3.scaleLinear()
            .domain([0, maxPercent / 2, maxPercent])
            .range(["lightgreen", "orange", "red"])
            .interpolate(d3.interpolateRgb);

            // console.log(d3.max(data, d => d.percent));

            const svg = d3.select(chartId)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `180 0 ${width - 50} ${height - 350}`)
            .style("transform", "rotate(180deg) scale(-1,1)");

            svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d.coord[0]))
            .attr('cy', d => yScale(d.coord[1]))
            .attr('r', 5)
            .attr('fill', d => colorScale(d.percent));
        }
   } catch (error) {
        console.log(error)
   }
};

function updateDiff(data, maxPercent) {
    try {
        // const container = document.querySelector('.heatmap');
        // const containerRect = container.getBoundingClientRect();
        // const width = containerRect.width;
        // const height = containerRect.height;

        const width = 742;
        const height = 929;
        const margin = { top: 20, right: 0, bottom: 30, left: 0  };

        const maxX = d3.max(data, d => d.coord[0]);
        const maxY = d3.max(data, d => d.coord[1]);

        const xScale = d3.scaleLinear()
        .domain([0, maxX])
        .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([height - margin.bottom, margin.top]);

        const colorScale = d3.scaleLinear()
        .domain([-maxPercent, 0, maxPercent / 2, maxPercent])
        .range(['blue', 'lightgreen', 'orange', 'red'])
        .interpolate(d3.interpolateRgb);

        // console.log(d3.min(data, d => d.percent));
        // console.log(d3.max(data, d => d.percent));

        const svg = d3.select('#heatmap3')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `180 0 ${width - 50} ${height - 350}`)
        .style("transform", "rotate(180deg) scale(-1,1)");

        svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.coord[0]))
        .attr('cy', d => yScale(d.coord[1]))
        .attr('r', 5)
        .attr('fill', d => colorScale(d.percent));
    } catch (error) {
        console.log(error);
    }
};

function setAvailable() {
    try {
        fetch('/available')
        .then(response => response.json())
        .then(data => {
            const div1 = document.getElementById("textA1");
            const div2 = document.getElementById("textA2");

            div1.innerHTML= "";
            div2.innerHTML= "";

            switch (true) {
                case (data.dis_miercoles > 40):
                  div1.innerHTML = `<p id="textA1" class="text-success">${data.dis_miercoles}%</p>`;
                  break;
                case (data.dis_miercoles > 30 && data.dis_miercoles < 40):
                  div1.innerHTML = `<p id="textA1" class="text-warning">${data.dis_miercoles}%</p>`;
                  break;
                case (data.dis_miercoles > 0  && data.dis_miercoles < 30):
                  div1.innerHTML = `<p id="textA1" class="text-danger">${data.dis_miercoles}%</p>`;
                  break;
                case (data.dis_miercoles == 0):
                  div1.innerHTML = `<p id="textA1">No existe</p>`;
                  break;
            }

            switch (true) {
                case (data.dis_selec > 40):
                  div2.innerHTML = `<p id="textA2" class="text-success">${data.dis_selec}%</p>`;
                  break;
                case (data.dis_selec > 30 && data.dis_selec < 40):
                  div2.innerHTML = `<p id="textA2" class="text-warning">${data.dis_selec}%</p>`;
                  break;
                case (data.dis_selec > 0 && data.dis_selec < 30):
                  div2.innerHTML = `<p id="textA2" class="text-danger">${data.dis_selec}%</p>`;
                  break;
                case (data.dis_selec == 0):
                  div2.innerHTML = `<p id="textA2">No existe</p>`;
                  break; 
            }
        });
    } catch (error) {
        console.log(error)
    }
};

$(document).ready(function(){
    $('#fecha').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true, 
        todayHighlight: true,
        language: "es", 
        templates: {
            leftArrow: '<i class="bi bi-arrow-left"></i>',
            rightArrow: '<i class="bi bi-arrow-right"></i>'
        },
        container: '.container-fluid',
        todayBtn: "linked",
        todayHighlight: true,
        toggleActive: true,
    });
});

const fechaForm = document.querySelector('#fecha-form');
const fechaInput = document.querySelector('#fecha');
const planoInput = document.querySelector('#plano');

fechaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fechaSeleccionada= fechaInput.value;
    const planoSeleccionado= planoInput.value;
    const content = document.querySelectorAll('.contenedor');

    if (planoSeleccionado == "XY") {
        fetch('/endpoint', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({fecha: fechaSeleccionada, plano: 1})
        })
        .then(response => {
            response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        let heatmap1 = document.getElementById("heatmap1");
        let heatmap2 = document.getElementById("heatmap2");
        let heatmap3 = document.getElementById("heatmap3");

        heatmap1.classList.remove('heatmap2');
        heatmap2.classList.remove('heatmap2');
        heatmap3.classList.remove('heatmap2');

        heatmap1.className = 'heatmap';
        heatmap2.className = 'heatmap';
        heatmap3.className = 'heatmap';
        
        heatmap1.innerHTML = "";
        heatmap2.innerHTML = "";
        heatmap3.innerHTML = "";

        content.forEach(function(elemento) {
            elemento.innerHTML = "";
            elemento.innerHTML = `<img src="/img/XY_T.png" alt="" class="imagenS">`;
        });

        drawHeatMaps();
        setAvailable();
    };

    if (planoSeleccionado == "XZ") {
        fetch('/endpoint', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({fecha: fechaSeleccionada, plano: 2})
        })
        .then(response => {
            response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        let heatmap1 = document.getElementById("heatmap1");
        let heatmap2 = document.getElementById("heatmap2");
        let heatmap3 = document.getElementById("heatmap3");

        heatmap1.classList.remove('heatmap');
        heatmap2.classList.remove('heatmap');
        heatmap3.classList.remove('heatmap');

        heatmap1.className = 'heatmap2';
        heatmap2.className = 'heatmap2';
        heatmap3.className = 'heatmap2';
        
        heatmap1.innerHTML = "";
        heatmap2.innerHTML = "";
        heatmap3.innerHTML = "";
        content.forEach(function(elemento) {
            elemento.innerHTML = "";
            elemento.innerHTML = `<img src="/img/XZ_T.png" alt="" class="imagenS">`;
        });

        drawHeatMaps();
        setAvailable();
    }
});

drawHeatMaps();
setAvailable();