fetch('/miercoles')
.then(response => response.json())
.then(data => {
    function update() {
        const container = document.getElementById('heatmap1');
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
        .domain([0, 0.509 / 2, 0.509])
        .range(["lightgreen", "orange", "red"])
        .interpolate(d3.interpolateRgb);

        // console.log(d3.max(data, d => d.count));

        const svg = d3.select('#heatmap1')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} 500`)
        .style("transform", "rotate(180deg)");

        svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.coord[0]))
        .attr('cy', d => yScale(d.coord[1]))
        .attr('r', 5)
        .attr('fill', d => colorScale(d.count));
    }

    update();
    window.addEventListener('resize', update);
});

fetch('/viernes')
.then(response => response.json())
.then(data => {
    const width = 900;
    const height = 900;
    const margin = { top: 20, right: 0, bottom: 30, left: 0  };

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.coord[0])])
    .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.coord[1])])
    .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleLinear()
    .domain([0, 0.509 / 2, 0.509])
    .range(["lightgreen", "orange", "red"])
    .interpolate(d3.interpolateRgb);

    console.log(d3.max(data, d => d.count));

    const svg = d3.select('#heatmap2')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.coord[0]))
    .attr('cy', d => yScale(d.coord[1]))
    .attr('r', 5)
    .attr('fill', d => colorScale(d.count));
});

fetch('/diferencia')
.then(response => response.json())
.then(data => {
    const width = 900;
    const height = 900;
    const margin = { top: 20, right: 0, bottom: 30, left: 0  };

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.coord[0])])
    .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.coord[1])])
    .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleLinear()
    .domain([-0.509, 0, 0.509 / 2, 0.509])
    .range(['blue', 'lightgreen', 'orange', 'red'])
    .interpolate(d3.interpolateRgb);

    console.log(d3.min(data, d => d.count));
    console.log(d3.max(data, d => d.count));

    const svg = d3.select('#heatmap3')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

    svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xScale(d.coord[0]))
    .attr('cy', d => yScale(d.coord[1]))
    .attr('r', 5)
    .attr('fill', d => colorScale(d.count));
});

