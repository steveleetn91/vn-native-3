const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('vnnativeos', {
  getOsName: () => {
      return "software";
  }
})