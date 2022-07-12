var serviceManager = new ServiceManager();
serviceManager.init();

function ServiceManager() {
  var globalVar = {
    
  };

  var domElement = {};

  this.init = function () {
  };

  function InitializeVariables() {
  }

  
}
async function getRandomWordFromAPI(obj) {
    let url = obj;
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}