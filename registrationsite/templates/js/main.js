myApp = angular.module('myApp',['ngResource','ngMessages']);
myApp.factory('dataFactory', ['$http', function($http) {

    var urlBase = 'http://localhost:8000/users/';
    var urlUser = 'http://localhost:8000/user';
    var dataFactory = {};

    dataFactory.getUsers = function () {
        return $http.get(urlBase);
    };
    
    dataFactory.insertUser = function (usr) {
        return $http.post(urlBase, usr);
    };

   dataFactory.getUser = function (id) {
        return $http.get(urlUser  + '/' + id+'/');
    };

    
    dataFactory.updateUser = function (id, usr) {
        return $http.put(urlUser + '/'+id+'/' , usr);
    };

    dataFactory.deleteUser = function (id) {
        return $http.delete(urlUser + '/' + id +'/');
    };
    return dataFactory;
}]);

// UsersController
myApp.controller('UsersController', ['$scope', 'dataFactory','$window', function ($scope, dataFactory,$window) {
    $scope.status;
    $scope.users;
    getUsers();
    function getUsers() {
        dataFactory.getUsers()
            .success(function (usrs) {
                $scope.users = usrs;
            })
            .error(function (error) {
                $scope.status = 'Unable to load user data: ' + error.message;
            });
    }
    // Get all Users
    $scope.getUser = function (id) {
        var usr;
        for (var i = 0; i < $scope.users.length; i++) {
            var currusr = $scope.users[i];
             console.log(currusr);
            if (currusr.id  === id) {
                usr = currusr;
                break;
            }
        }
        $scope.id = usr.id;
        $scope.firstName = usr.first_name;
        $scope.lastName = usr.last_name;
        $scope.email = usr.email;
        $scope.username = usr.username;
        
        dataFactory.getUser(id)
          .success(function () {
        $scope.checkboxmodel = {};
                console.log("Get");
                $scope.status = 'Get current User info';
          })
          .error(function (error) {
              $scope.status = 'Unable to Get  current User info: ' + error.message;
          });
    };
   // Update User info
    $scope.updateUser = function(){
      var usr={
                  id :$scope.id,
                 first_name: $scope.firstName,
                 last_name: $scope.lastName,
                email:$scope.email,
                username:$scope.username
      };
        dataFactory.updateUser(usr.id, usr)
          .success(function (usr) {   
                console.log("Get");
                $scope.status = 'Get current User info';
                 $scope.users = usr;
                $scope.hidebutton = function(){
                    $scope.checkboxmodel = false;
                }();
                getUsers();     
          })
          .error(function (error) {
              $scope.status = 'Unable to Get  current User info: ' + error.message;
          }); 
    };
    
    //Insert new User and without refresh it adds to the userlist
    $scope.insertUser = function () {
        var usr = {
                 id :$scope.id,
                 first_name: $scope.firstName,
                 last_name: $scope.lastName,
                email:$scope.email,
                username:$scope.username
            };
        dataFactory.insertUser(usr)
            .success(function () {
                $scope.status = 'Inserted User!';
                $scope.users.push(usr);
            }).
            error(function(error) {
                $scope.status = 'Unable to insert User: ' + error.message;
            });
    };
//Delete the User
    $scope.deleteUser= function (id) {
        dataFactory.deleteUser(id)
        .success(function () {
            $scope.status = 'Deleted User! Refreshing User list.';
            for (var i = 0; i < $scope.users.length; i++) {
                var usr = $scope.users[i];
                if (usr.id === id) {
                    $scope.users.splice(i, 1);
                    break;
                }
            }
        })
        .error(function (error) {
            $scope.status = 'Unable to delete customer: ' + error.message;
        });
    };
    //Hide cancel Button
  $scope.hidecancelbutton = function(){
          $scope.checkboxmodel = false;
                console.log("clicked");   
     };
}]);