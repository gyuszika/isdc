var selectCtrl = function($scope, $http) {

      $scope.selected = [];

      $scope.toggle = function (person, list) {
        var idx = list.indexOf(person);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(person);
        }
      };

      $scope.exists = function (person, list) {
        return list.indexOf(person) > -1;
      };
};
app.controller("selectCtrl", [ "$scope", "$http", selectCtrl ]);