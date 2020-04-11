import React, { Component } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Status", field: "status" },
        { title: "Patient ID", field: "patientId" },
        { title: "Box ID", field: "boxId" },
        { title: "Site", field: "site" },
        { title: "Date Deployed", field: "dateDeployed" },
        { title: "First Online", field: "firstOnline" },
        { title: "Cough Count", field: "coughCount" },
        { title: "Nights Since Online", field: "nightsSinceOnline" },
        { title: "Most Recent Cough", field: "mostRecentCough" },
        { title: "CPU Temperature", field: "cpuTemp" },
        { title: "Microphone Status", field: "micStatus" },
        { title: "Storage", field: "storage" },
        { title: "Algo Version", field: "version" },
      ],
      data: [],
    };
  }

  // to get the count from the first device: res.data.Devices[1].count[0].daily
  componentDidMount() {
    axios.get(`https://ericfan2770.github.io/data.json`).then((res) => {
      this.setState({
        data: res.data.Devices.map((row) => ({
          status: row.status,
          patientId: row.patientId,
          boxId: row.boxId,
          site: row.site,
          dateDeployed: row.dateDeployed,
          dateOnline: row.dateOnline,
          coughCount: row.count[0].daily + " / " + row.count[0].cumulative,
          nightsSinceOnline: row.nightsSinceOnline,
          mostRecentCough: row.mostRecentCough,
          cpuTemp: row.cpuTemp,
          micStatus: row.micStatus,
          storage: row.storage,
          version: row.version,
        })),
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <MaterialTable columns={this.state.columns} data={this.state.data} />
      </React.Fragment>
    );
  }
}

export default App;
