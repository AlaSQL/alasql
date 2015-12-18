export function loadFileFromPath(path, asy, success, error){
  var data;
  // For browser read from tag
  /*
      SELECT * FROM TXT('#one') -- read data from HTML element with id="one"
  */
  if((path.substr(0,1) === '#') && (typeof document !== 'undefined')) {
      data = document.querySelector(path).textContent;
      success(data);
  } else {
      /*
          Simply read file from HTTP request, like:
          SELECT * FROM TXT('http://alasql.org/README.md');
      */
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
              if (xhr.status === 200) {
                  if (success){
                      success(cutbom(xhr.responseText));
                  }
              } else if (error){
                  error(xhr);
              }
              // Todo: else...?

          }
      };
      xhr.open("GET", path, asy); // Async
      xhr.send();
  }
};

export function loadFilefromFileInput(path, asy, success, error){
  /*
      For browser read from files input element
      <input type="files" onchange="readFile(event)">
      <script>
          function readFile(event) {
              alasql('SELECT * FROM TXT(?)',[event])
          }
      </script>
  */
  /** @type {array} List of files from <input> element */
  var files = path.target.files;
  /** type {object} */
  var reader = new FileReader();
  /** type {string} */
  var name = files[0].name;
  reader.onload = function(e) {
      var data = e.target.result;
      success(cutbom(data));
  };
  reader.readAsText(files[0]);
}

/**
    Load text file from anywhere
    @param {string|object} path File path or HTML event
    @param {boolean} asy True - async call, false - sync call
    @param {function} success Success function
    @param {function} error Error function
    @return {string} Read data

    @todo Define Event type
*/
export function loadFile(path, asy, success, error) {
  /* For string */
  if(typeof path === "string") {
    loadFileFromPath(path, asy, success, error);
  } else if(path instanceof Event) {
     loadFilefromFileInput(path, asy, success, error);
  }
}

/**
  @function Load binary file from anywhere
  @param {string} path File path
  @param {boolean} asy True - async call, false - sync call
  @param {function} success Success function
  @param {function} error Error function
  @return 1 for Async, data - for sync version
*/
export function loadBinaryFile(path, asy, success, error) {
  if(typeof path === "string") {
      // For browser
      var xhr = new XMLHttpRequest();
      xhr.open("GET", path, asy); // Async
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
          var data = new Uint8Array(xhr.response);
          var arr = [];
          for(var i = 0; i < data.length; ++i){
              arr[i] = String.fromCharCode(data[i]);
          }
          success(arr.join(""));
      }
      xhr.send();
  } else if(path instanceof Event) {
      // console.log("event");
      var files = path.target.files;
      var reader = new FileReader();
      var name = files[0].name;
      reader.onload = function(e) {
          var data = e.target.result;
          success(data);
      };
      reader.readAsBinaryString(files[0]);
  } else if(path instanceof Blob) {
    success(path);
  }
};