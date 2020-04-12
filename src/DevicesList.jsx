import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";

// Imports for icons
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";

import {
  getStatusStyle,
  getCpuTempStyle,
  getMicStatusStyle,
  getStorageStyle,
} from "./getStyle";

const headerColor = "WhiteSmoke";
const columnColor = "WhiteSmoke";

class DevicesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // define columns of table
      columns: [
        {
          title: "Status",
          field: "status",
          editable: "never",
          headerStyle: { pointerEvents: "none", textAlign: "right" }, // prevent column drag
          cellStyle: (data) => {
            return {
              whiteSpace: "nowrap",
              textAlign: "right",
              backgroundColor: getStatusStyle(data), // dynamic background based on data
            };
          },
        },
        {
          title: "Patient ID",
          field: "patientId",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "right",
            backgroundColor: columnColor,
          },
        },
        {
          title: "Box ID",
          field: "boxId",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "right",
          },
        },
        {
          title: "Site",
          field: "site",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "right",
            backgroundColor: columnColor,
          },
        },
        {
          title: "Date Deployed",
          field: "dateDeployed",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "right",
          },
        },
        {
          title: "First Online",
          field: "firstOnline",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "right",
            backgroundColor: columnColor,
          },
        },
        {
          title: "Cough Count",
          field: "coughCount",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "right",
          },
        },
        {
          title: "Nights Since Online",
          field: "nightsSinceOnline",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "right",
            backgroundColor: columnColor,
          },
        },
        {
          title: "Most Recent Cough",
          field: "mostRecentCough",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "right",
          },
        },
        {
          title: "CPU Temperature",
          field: "cpuTemp",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: (data) => {
            return {
              whiteSpace: "nowrap",
              textAlign: "right",
              backgroundColor: getCpuTempStyle(data), // dynamic background based on data
            };
          },
        },
        {
          title: "Microphone Status",
          field: "micStatus",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: (data) => {
            return {
              whiteSpace: "nowrap",
              textAlign: "right",
              backgroundColor: getMicStatusStyle(data), // dynamic background based on data
            };
          },
        },
        {
          title: "Storage",
          field: "storage",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: (data) => {
            return {
              whiteSpace: "nowrap",
              textAlign: "right",
              backgroundColor: getStorageStyle(data), // dynamic background based on data
            };
          },
        },
        {
          title: "Algo Version",
          field: "version",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "right",
          },
        },
      ],
      data: [],
    };
  }

  // to get the count from the first device: res.data.Devices[1].count[0].daily
  // HTTP get request, transfers data from JSON file to data state
  componentDidMount() {
    axios.get(`https://ericfan2770.github.io/data.json`).then((response) => {
      this.setState({
        data: response.data.Devices.map((row) => ({
          status: row.status,
          patientId: row.patientId,
          boxId: row.boxId,
          site: row.site,
          dateDeployed: row.dateDeployed,
          firstOnline: row.firstOnline,
          coughCount: row.count[0].daily + " / " + row.count[0].cumulative,
          nightsSinceOnline: row.nightsSinceOnline,
          mostRecentCough: row.mostRecentCough,
          cpuTemp: row.cpuTemp + "°C",
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
        <MaterialTable
          title="CoughBox Dashboard"
          columns={this.state.columns}
          data={this.state.data}
          options={{
            search: false,
            sorting: false,
            paging: false,
            filtering: false,
            grouping: false,
            headerStyle: {
              backgroundColor: headerColor,
            },
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    this.setState((prevState) => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      // HTTP put request
                      axios
                        .put(
                          `https://ericfan2770.github.io/data.json/{this.state.data}`,
                          this.state.data
                        )
                        .then((response) => {
                          console.log(response);
                        })
                        .catch((error) => {
                          console.log(error.response);
                        });
                      return { ...prevState, data };
                    });
                  }
                });
              }),
          }}
          icons={{
            Check: Check,
            Edit: Edit,
            Clear: Clear,
          }}
        />
      </React.Fragment>
    );
  }
}

export default DevicesList;
