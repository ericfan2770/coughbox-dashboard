import React, { Component } from "react";
import axios from "axios";

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
          <table>
            <thead>
              <th>Status</th>
              <th>Patient ID</th>
              <th>Box ID</th>
              <th>Site</th>
              <th>Date Deployed</th>
              <th>First Online</th>
              <th>Cough Count</th>
              <th>Nights Since Online</th>
              <th>Most Recent Cough</th>
              <th>CPU Temperature</th>
              <th>Microphone Status</th>
              <th>Storage</th>
              <th>Algo Version</th>
            </thead>
            <tbody>
              {this.state.devices.map((row) => (
                <tr>
                  <td>{row.status}</td>
                  <td>{row.patientId}</td>
                  <td>{row.boxId}</td>
                  <td>{row.site}</td>
                  <td>{row.dateDeployed}</td>
                  <td>{row.dateOnline}</td>
                  <td>
                    {row.count[0].daily + " / " + row.count[0].cumulative}
                  </td>
                  <td>{row.nightsSinceOnline}</td>
                  <td>{row.mostRecentCough}</td>
                  <td>{row.cpuTemp}</td>
                  <td>{row.micStatus}</td>
                  <td>{row.storage}</td>
                  <td>{row.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </React.Fragment>
    );
  }
}

export default App;
