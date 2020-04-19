import React, { Component } from "react";
import axios from "axios";

import MaterialTable from "material-table";

// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";

// import { borders } from "@material-ui/system";
// import Box from "@material-ui/core/Box";

import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";

import {
  formatNum,
  getStatusStyle,
  getCpuTempStyle,
  getMicStatusStyle,
  getStorageStyle,
} from "./getStyle";

const headerColor = "White";
const columnColor = "White";

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
              textAlign: "center",
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
            textAlign: "center",
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
            textAlign: "center",
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
            textAlign: "center",
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
            textAlign: "center",
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
            textAlign: "center",
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
            textAlign: "center",
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
            textAlign: "center",
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
            textAlign: "center",
          },
        },
        {
          title: "Days Since Test",
          field: "daysSinceTest",
          editable: "never",
          headerStyle: {
            pointerEvents: "none", // prevent column drag
            whiteSpace: "nowrap",
            textAlign: "right",
          },
          cellStyle: {
            whiteSpace: "nowrap",
            textAlign: "center",
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
              textAlign: "center",
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
              textAlign: "center",
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
              textAlign: "center",
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
            textAlign: "center",
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
          coughCount:
            formatNum(row.count[0].daily) +
            " / " +
            formatNum(row.count[0].cumulative),
          nightsSinceOnline: row.nightsSinceOnline,
          mostRecentCough: row.mostRecentCough,
          daysSinceTest: row.daysSinceTest,
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
          components={{
            Header: (props) => {
              return (
                <TableHead>
                  <TableRow padding={"none"}>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{
                        backgroundColor: "WhiteSmoke",
                      }}
                    >
                      <b>General Information</b>
                    </TableCell>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{
                        backgroundColor: "WhiteSmoke",
                      }}
                    >
                      <b>Logistics</b>
                    </TableCell>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{
                        backgroundColor: "WhiteSmoke",
                      }}
                    >
                      <b>Cough Data</b>
                    </TableCell>
                    <TableCell
                      colSpan={5}
                      align="center"
                      style={{
                        backgroundColor: "WhiteSmoke",
                      }}
                    >
                      <b>Device Troubleshooting</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Edit</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Status</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Patient ID</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Box ID</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Site</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Date Deployed</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>First Online</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Cough Count</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Nights Since Online</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Most Recent Cough</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Days Since Test</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>CPU Temperature</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Microphone Status</b>
                      </span>
                    </TableCell>
                    <TableCell align="right">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Storage</b>
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <b>Algo Version</b>
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
              );
            },
          }}
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
                    this.setState(
                      (prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      },
                      () => {
                        console.log("Callback value", this.state.data);
                      }
                    );
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

// // HTTP put request
// axios
// .put(
//   `https://ericfan2770.github.io/data.json/{this.state.data}`,
//   this.state.data
// )
// .then((response) => {
//   console.log(response);
// })
// .catch((error) => {
//   console.log(error.response);
// });
