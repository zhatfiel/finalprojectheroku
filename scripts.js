var dataSource = {
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  };

function createChart() {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myPieChart = new Chart(ctx, {
      type: "pie",
      data: dataSource,
    });
  };

function getBudget() {
    axios
      .get("https://zhatfiel-final-project.herokuapp.com/budget")
      .then(function (res) {
        console.log(res.data);
        for (var i = 0; i < res.data.budget.length; i++) {
          dataSource.datasets[0].data[i] = res.data.budget[i].budget;
          dataSource.labels[i] = res.data.budget[i].title;
          dataSource.datasets[0].backgroundColor[i] =
            res.data.budget[i].color;
        }
        createChart();
      });
  }
  getBudget();

  function addBudget() {
    const data = {
      title: document.getElementById("title").value,
      budget: document.getElementById("budget").value,
      color: document.getElementById("color").value,
    };
    axios
      .post("https://zhatfiel-final-project.herokuapp.com/add-data", data)
      .then(function (res) {
        document.getElementById("title").value = "";
        document.getElementById("budget").value = "";
        document.getElementById("color").value = "";
      });
  }