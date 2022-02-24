import {contextBridge} from "electron";

contextBridge.exposeInMainWorld('vnnativeos', {
  getOsName: () => {
      return "software";
  }
});

// native