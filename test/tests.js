var expect  = require("chai").expect;
var chai = require("chai")
var request = require("request");
var chaiHttp = require("chai-http");
chai.use(chaiHttp);



describe("Tests #1", function() {
    describe("Bring all Users", function() {
      var url = "http://tap-octavioricci820054.codeanyapp.com:8080/api/users";
      it("Should return Status 200", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
      });
    });
});
 
  

