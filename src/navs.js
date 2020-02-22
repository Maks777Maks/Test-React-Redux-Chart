import PersonsChart from "./views/PersonsChart/PersonsChart.jsx";
import Comments from "./views/CommentsChart.jsx";

var routes = [
  {
    path: "/persons",
    name: "PersonsChart",
    icon: "tim-icons icon-chart-pie-36",
    component: PersonsChart,
    layout: "/admin"
  },
  {
    path: "/comments",
    name: "Comments",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Comments,
    layout: "/admin"
  }
];
export default routes;
