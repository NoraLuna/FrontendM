import React,{Fragment} from 'react';
import { ChartDonut, ChartThemeColor} from '@patternfly/react-charts';
import axios from "axios";

function App() {
  const [graphs, setGraph] = React.useState([]);
  const getGraph = () => {
    axios
      .get("http://localhost:3000/graph", {
      })
      .then((response) => {
        setGraph(response.data);
      })
      .catch((err) => {
      });
  };
  React.useEffect(() => {
    getGraph();
  }, []);

  return (
    <Fragment>
    <main>
      <div className="graphs">
        {graphs.map((graph) => (
          <div class="contenedor" >
          <div className="graph">
              <ChartDonut
                constrainToVisibleArea={true}
                data={[{},{},{ x: `${graph.article2}`, y: Number(graph.percentage2) },{ x: `${graph.article1}` , y: Number(graph.percentage1 )},]}
                donutOrientation="top"
                height={275}
                subTitle = {graph.name}
                subTitlePosition="center"
                title={graph.count}
                ariaTitle="bottom"
                themeColor=
                  {(() => {
                    switch (graph.color) {
                      case "green":   return ChartThemeColor.green;
                      case "blue": return ChartThemeColor.blue;
                      case "orange":  return ChartThemeColor.orange;
                      default:      return ChartThemeColor.black;
                    }
                  })()}
                width={250}
              />
              <div class={
                    (() => {
                      switch (graph.color) {
                        case "green":   return "colgreen";
                        case "blue": return "colblue";
                        case "orange":  return "colorange";
                        default:      return "colblue";
                      }
                    })()}>

                <strong>
                  {graph.article1}
                </strong>
                <br></br>
                <p class="cantidad"><strong class="porcentaje">{graph.percentage1}% </strong>&nbsp;  {graph.number1}</p> 
              </div>
              <div 
                class= {
                  (() => {
                      switch (graph.color) {
                        case "green":   return "col2green";
                        case "blue": return "col2blue";
                        case "orange":  return "col2orange";
                        default:      return "col2blue";
                      }
                    })()}>
                <strong>
                  {graph.article2}
                </strong>
                <br></br>
                <p class="cantidad"><strong class="porcentaje">{graph.percentage2}% </strong> &nbsp;{graph.number2}</p> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
    </Fragment>
  );
}

export default App;
