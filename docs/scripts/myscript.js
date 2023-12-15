document.addEventListener("DOMContentLoaded", function () {
  d3.csv("https://raw.githubusercontent.com/Kanisha-Shah/NYC-Crime-County-Insights/main/docs/data_d3.csv").then(function (allData) {
    var data = allData.filter(function (d) { return d['Area'] === 'Total'; });

    var featureNameMapping = {
      "Bronx": "Bronx",
      "Kings": "Kings",
      "Queens": "Queens",
      "New York": "New York",
      "Richmond": "Richmond"
    };

    var featureNames = Object.keys(featureNameMapping);

    var margin = { top: 30, right: 30, bottom: 200, left: 60 },
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    var svg = d3.select("div#plot")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.right},${margin.bottom})`);

    // Add a background color to the entire plot
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f9f9f9");

    var x = d3.scaleBand()
      .range([0, width])
      .padding(0.2);
    var xAxis = svg.append("g")
      .attr("transform", `translate(0,${height})`);

    var y = d3.scaleLinear()
      .range([height, 0]);
    svg.append("g")
      .attr("class", "myYaxis");

    function update(selectedState) {
      var dataFilter = data.filter(function (d) { return d['Year'] == selectedState })[0];

      var dataArray = featureNames.map(function (key) {
        return { Feature: featureNameMapping[key], Value: parseFloat(dataFilter[key]) };
      });

      x.domain(dataArray.map(d => d.Feature));
      xAxis.transition().duration(1000).call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "center");

      y.domain([0, d3.max(dataArray, d => d.Value)]);
      svg.selectAll(".myYaxis").transition().duration(1000).call(d3.axisLeft(y));

      var u = svg.selectAll("rect")
        .data(dataArray);
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 20)
        .attr("x", 0 - (height / 2))
        .style("text-anchor", "middle")
        .text("Total Crimes");

      svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("New York City Crime Rate Analysis");

      var u = svg.selectAll("rect")
        .data(dataArray);
      u.join("rect")
        .transition()
        .duration(1000)
        .attr("x", d => x(d.Feature))
        .attr("y", d => y(d.Value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.Value))
        .attr("fill", "#43E3DE")
        .attr("stroke", "#69b3a2") // Add a stroke to create a border
        .attr("stroke-width", 1); // Set the border width
    }

    update(data[1]['Year']);

    var dropdown = d3.select("#selectButton")
      .append("select");

    dropdown
      .selectAll("option")
      .data([...new Set(data.map(d => d['Year']))])
      .enter()
      .append("option")
      .text(function (d) { return d; })
      .attr("value", function (d) { return d; });

    dropdown.on("change", function (event) {
      var selectedOption = d3.select(this).property("value");
      update(selectedOption);
    });
  });
});
