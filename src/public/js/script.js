fetch('/data1')
.then(response => response.json())
.then(data => {
    function update() {
        const container = document.querySelector('.heatmap');
        const containerRect = container.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        const margin = { top: 20, right: 0, bottom: 30, left: 0  };

        console.log(width);
        console.log(height);

        const maxX = d3.max(data, d => d.coord[0]);
        const maxY = d3.max(data, d => d.coord[1]);

        const xScale = d3.scaleLinear()
        .domain([0, maxX])
        .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([height - margin.bottom, margin.top]);

        const colorScale = d3.scaleLinear()
        .domain([0, 0.583 / 2, 0.583])
        .range(["lightgreen", "orange", "red"])
        .interpolate(d3.interpolateRgb);

        // console.log(d3.max(data, d => d.percent));

        const svg = d3.select('#heatmap1')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `180 0 ${width} ${height - 200}`)
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

    update();
    // window.addEventListener('resize', update);
});

fetch('/data2')
.then(response => response.json())
.then(data => {
    function update() {
        const container = document.querySelector('.heatmap');
        const containerRect = container.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

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
        .domain([0, 0.583 / 2, 0.583])
        .range(["lightgreen", "orange", "red"])
        .interpolate(d3.interpolateRgb);

        // console.log(d3.max(data, d => d.percent));

        const svg = d3.select('#heatmap2')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `180 0 ${width} ${height - 200}`)
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

    update();
});

fetch('/data3')
.then(response => response.json())
.then(data => {
    function update() {
        const container = document.querySelector('.heatmap');
        const containerRect = container.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

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
        .domain([-0.583, 0, 0.583 / 2, 0.583])
        .range(['blue', 'lightgreen', 'orange', 'red'])
        .interpolate(d3.interpolateRgb);

        // console.log(d3.max(data, d => d.percent));

        const svg = d3.select('#heatmap3')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `180 0 ${width} ${height - 200}`)
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

    update();
});

$(document).ready(function(){
    $('#fecha').datepicker({
        format: "dd/mm/yyyy", // Formato de la fecha
        autoclose: true, // Cierra automáticamente el calendario al seleccionar una fecha
        todayHighlight: true, // Destaca la fecha actual en el calendario
        language: "es", // Idioma del calendario
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