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

class App extends Component {
  state = {
    devices: [],
  };

  // to get the count from the first device: res.data.Devices[1].count[0].daily
  componentDidMount() {
    axios.get(`https://ericfan2770.github.io/data.json`).then((res) => {
      this.setState({ devices: res.data.Devices });
    });
  }

  render() {
    return (
      <React.Fragment>
        {
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Box ID</TableCell>
                <TableCell>Site</TableCell>
                <TableCell>Date Deployed</TableCell>
                <TableCell>First Online</TableCell>
                <TableCell>Cough Count</TableCell>
                <TableCell>Nights Since Online</TableCell>
                <TableCell>Most Recent Cough</TableCell>
                <TableCell>CPU Temperature</TableCell>
                <TableCell>Microphone Status</TableCell>
                <TableCell>Storage</TableCell>
                <TableCell>Algo Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.devices.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.patientId}</TableCell>
                  <TableCell>{row.boxId}</TableCell>
                  <TableCell>{row.site}</TableCell>
                  <TableCell>{row.dateDeployed}</TableCell>
                  <TableCell>{row.dateOnline}</TableCell>
                  <TableCell>
                    {row.count[0].daily + " / " + row.count[0].cumulative}
                  </TableCell>
                  <TableCell>{row.nightsSinceOnline}</TableCell>
                  <TableCell>{row.mostRecentCough}</TableCell>
                  <TableCell>{row.cpuTemp}</TableCell>
                  <TableCell>{row.micStatus}</TableCell>
                  <TableCell>{row.storage}</TableCell>
                  <TableCell>{row.version}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </React.Fragment>
    );
  }
}

export default App;
