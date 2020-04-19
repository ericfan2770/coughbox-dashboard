const columnColor = "WhiteSmoke";

// returns cell background color for "status" column depending on status of device
export function getStatusStyle(status) {
  let background;
  if (status === "Active") {
    background = "LightGreen";
  } else if (status === "Deployed") {
    background = "NavajoWhite";
  } else if (status === "Offline") {
    background = "LightCoral";
  } else if (status === "Inactive") {
    background = "LightGray";
  } else if (status === "Returned") {
    background = "LightSkyBlue";
  } else {
    background = "White";
  }
  return background;
}

// returns cell background color for "cpuTemp" column depending on temperature of CPU
export function getCpuTempStyle(temp) {
  let numTemp = parseInt(temp.substring(0, temp.length - 2));
  let background;
  if (numTemp > 80) {
    background = "LightCoral";
  } else if (numTemp > 70) {
    background = "#ffd699";
  } else {
    background = columnColor;
  }
  return background;
}

// returns cell background color for "micStatus" column depending on status of microphone
export function getMicStatusStyle(status) {
  let background;
  if (status === "Fail") {
    background = "LightCoral";
  } else {
    background = "White";
  }
  return background;
}

// returns cell background color for "storage" column depending on storage of device
export function getStorageStyle(storage) {
  let background;
  if (storage > 61) {
    background = "LightCoral";
  } else if (storage > 56) {
    background = "#ffd699";
  } else {
    background = columnColor;
  }
  return background;
}
