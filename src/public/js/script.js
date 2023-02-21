fetch('/viernes')
.then(response => response.json())
.then(data => {
    const width = 900;
    const height = 900;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.coord[0])])
    .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.coord[1])])
    .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleLinear()
    .domain([-2.261, 0, 2.261 / 2, 2.261])
    .range(['blue', 'lightgreen', 'orange', 'red'])
    .interpolate(d3.interpolateRgb);

    console.log(d3.min(data, d => d.count));
    console.log(d3.max(data, d => d.count));

    const svg = d3.select('.heatmap')
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