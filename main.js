var data = [{
    project: "508 Audit Remediation",
    projectDetails: "No Issues",
    resources: "Green",
    cost: "Green",
    scope: "Green"
  },
  {
    project: "New DR Site Buildout",
    projectDetails: "Additional information describing why New DR Site Buildout is flagged Yellow",
    resources: "Yellow",
    cost: "Green",
    scope: "Green"
  },
  {
    project: "Router Refresh",
    projectDetails: "No Issues",
    resources: "Green",
    cost: "Yellow",
    scope: "Green"
  },
  {
    project: "Security Audit Remediation",
    projectDetails: "Further details describing why Security Audit Remediation is flagged Red",
    resources: "Green",
    cost: "Green",
    scope: "Green"
  },
  {
    project: "Teams Migration",
    projectDetails: "Further details describing why Teams Migration is flagged Red",
    resources: "Green",
    cost: "Green",
    scope: "Red"
  },
  {
    project: "VOIP Upgrade",
    projectDetails: "No Issues",
    resources: "Green",
    cost: "Green",
    scope: "Green"
  },
];

// column definitions
var columnNames = ['Project', 'Resources', 'Cost', 'Scope'];


// tool tip tied to body and default hidden; 
// z index high to put above everything
var tooltip = d3.select(".tooltip")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden")
  .style("background", "#DDEFEF")


// create table
var table = d3.select('body')
  .append('table');

// create table header
table.append('thead')
  .append('tr')
  .selectAll('th')
  .data(columnNames)
  .join('th')
  .text(function(d) {
    return d
  });

// create table body
table.append('tbody')
  .selectAll('tr')
  .data(data)
  .join('tr')
  .selectAll('td')
  .data(function(row) {
    return Object.keys(row).map(function(column) {
      return {
        column: column,
        detail: row.projectDetails,
        value: row[column]
      };
    });
  })
  .join((enter) => {
    let cell = enter.append('td')
      .html((d) => {
        if (d.value === 'Green') {
          return "<span id='green' class='material-symbols-outlined'>circle</span>";
        } else if (d.value === 'Yellow') {
          return "<span id='yellow' class='material-symbols-outlined'>change_history</span>";
        } else if (d.value === 'Red') {
          return "<span id='red' class='material-symbols-outlined'>close</span>";
        } else {
          return d.value
        }
      })

    cell.append("span")
      .on("mouseover", function(e, d) {
        if (d.detail != "No Issues" && d.column == "project") {
          tooltip.text(d.detail);
          return tooltip.style("visibility", "visible");
        }
      })
      .on("mousemove", function(e, d) {
        return tooltip.style("top", (e.pageY - 10) + "px").style("left", (e.pageX + 10) + "px");
      })
      .on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
      })
      .html((d) => {
        if (d.detail != "No Issues" && d.column == "project") {
          return "<span id='hover' class='material-symbols-outlined'>warning</span>"
        }
      })

    return cell
  })
  .style("display", function(d, i) {
    if (d.column === 'projectDetails') {
      return "none"
    }
  });