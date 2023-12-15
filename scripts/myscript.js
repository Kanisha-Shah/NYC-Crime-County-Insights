// Your data as a constant array
const data = [
    { County: "Bronx", Year: 2019, TotalCrime: 100 },
    { County: "New York", Year: 2019, TotalCrime: 150 },
    { County: "Queens", Year: 2019, TotalCrime: 120 },
    { County: "Kings", Year: 2019, TotalCrime: 130 },
    { County: "Richmond", Year: 2019, TotalCrime: 140 }
];

// Your D3 code for creating the graph
data.forEach(function(d) {
    d.TotalCrime = +d.TotalCrime;
});

var width = 500;
var height = 300;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d, i) { return i * (width / data.length); })
    .attr("y", function(d) { return height - d.TotalCrime; })
    .attr("width", width / data.length - 1)
    .attr("height", function(d) { return d.TotalCrime; })
    .style("fill", "steelblue");
