fetch('/diferencia')
.then(response => response.json())
.then(data => {
    const width = 1000;
    const height = 1000;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.coord[0])])
    .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.coord[1])])
    .range([height - margin.bottom, margin.top]);

    // const negativeColorScale = d3.scaleLinear()
    // .domain([d3.min(data, d => d.count), 0])
    // .range(['blue', 'lightblue']);

    // const positiveColorScale = d3.scaleLinear()
    // .domain([0, d3.max(data, d => d.count) / 2, d3.max(data, d => d.count)])
    // .range(["lightgreen", "orange", "red"])
    // .interpolate(d3.interpolateRgb);

    // const colorScale = d => d.count < 0 ? negativeColorScale(d.count) : positiveColorScale(d.count);

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

    // svg.selectAll('circle')
    // .data(data)
    // .enter()
    // .append('circle')
    // .attr('cx', d => xScale(d.coord[0]))
    // .attr('cy', d => yScale(d.coord[1]))
    // .attr('r', 5)
    // .attr('fill', colorScale);
});