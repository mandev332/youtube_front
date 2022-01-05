module.exports = {
  GET: function (req, res) {
    console.log("GET");
    res.end("GET");
  },
  POST: function (req, res) {
    console.log("POST");
    res.end("POST");
  },
  PUT: function (req, res) {
    console.log("PUT");
    res.end("PUT");
  },
  DELETE: function (req, res) {
    console.log("DELETE");
    res.end("DELETE");
  },
};
