function renderCharts(sentiment) {
  const ctxBar = document.getElementById("sentimentBar").getContext("2d");
  new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: ["Positive", "Neutral", "Negative"],
      datasets: [
        {
          label: "Sentiment Scores (%)",
          data: [sentiment.pos * 100, sentiment.neu * 100, sentiment.neg * 100],
          backgroundColor: ["#18b85bff", "#e5991dff", "#e74c3c"],
          borderRadius: 10,
          borderColor: "#333",
          borderWidth: 1
        },
      ],
    },
    options: {
      responsive: false,
      indexAxis: "y",
      scales: {
        x: { beginAtZero: true, max: 100 },
      },
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "Vader Sentiment Analysis",
          font: { size: 18 },
          color: "#333",
          padding: { bottom: 10 },
        },
      },
    },
  });

  const normalizedSentimentScore = (sentiment.custom_score)*100 ;

  const ctxCompound = document.getElementById("compoundChart").getContext("2d");
  new Chart(ctxCompound, {
    type: "bar",
    data: {
      labels: ["Sentiment Value"],
      datasets: [
        {
          label: "Sentiment Score",
          data: [normalizedSentimentScore],
          backgroundColor:
            normalizedSentimentScore < 30
              ? "#e74c3c"
              : normalizedSentimentScore < 70
              ? "#e5991dff"
              : "#18b85bff",
          borderColor: "#333",
          borderWidth: 1,
          borderRadius:10
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 100,
          display:true,
          ticks: {
            stepSize: 25,
          },
        },
        x: {
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        tooltip: {
          enabled: true,
        },
        legend: {
          display: true,
          position: "bottom",
        },
        title: {
          display: true,
          text: "Custom Model Sentiment Analysis",
          font: {
            size: 18,
          },
          color: "#333",
          padding: { bottom: 10 },
        },
      },
    },
  });
}

function renderScores(sentiment) {
  
   var VaderData = [{
              type: 'bar',
      x: [sentiment.pos * 100,  sentiment.neu * 100, sentiment.neg * 100],
      y: ['Positive ', 'Neutral ', 'Negative '],
      orientation: 'h',
      marker: {
        color: ['rgba (30, 130, 76, 0.8)', 'rgba (255, 218, 112, 0.8)', 'rgba (200, 0, 0, 0.8)']  // Specify the colors here
      }
      }];
       var layoutVaderScores = {
          title: { text: "Vader Sentiment Analysis", font: { size: 20 }, },
        width: 400,
        height: 300,
        paper_bgcolor: "#f4f4f4ff",
        font: { color: "#333333", family: "lato" }
      };

        var customData = [
        {
          
          type: "indicator",
          mode: "gauge+number",
          value: (sentiment.custom_score)*100,
          font: { color: "yellow", family: "lato" },
          delta: { position : "top", reference: 0, increasing: { color: "#49b170" } },
          
          
          gauge: {
            paddingTop: 10,
            axis: { range: [0, 100], tickwidth: 0, tickcolor: "white" },
            bar: { color: "#000" },
            bgcolor: "#f4f4f4",
            borderwidth: 2,
            bordercolor: "black",
            steps: [
              { range: [0, 20], color: "rgba (200, 0, 0, 0.8)" },
              { range: [21, 40], color: "rgba (247, 156, 71, 0.8)"},
              { range: [41, 60], color: "rgba (255, 218, 112, 0.8)" },
              { range: [61, 80], color: "rgba (125, 223, 180, 0.8)" },
              { range: [81, 100], color: "rgba (30, 130, 76, 0.8)"}
            ],
          }
        }
      ];
      
      var layoutCustomScore = {
          title: { text: "Custom Model Sentiment Analysis", font: { size: 20 } },
        width: 400,
        height: 300,
        paper_bgcolor: "#f4f4f4ff",
        font: { color: "#333333", family: "lato" }
      };
    
     
    
      Plotly.newPlot('VaderBarChart', VaderData, layoutVaderScores);
      Plotly.newPlot('CustomScoreGuage', customData, layoutCustomScore);
    }