//Angular Application

var workoutApp = angular.module('workoutApp', ['optionSelected']);

var workoutApp = angular.module('optionSelected', []);

workoutApp.controller('SelectListController', function ($scope) {

    // //Sorting array by Make
    // $scope.carsSorted = dreamCars.sort(function(a,b){
    //     var x = a.make;
    //     var y = b.make;
    //     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    // });
    // //Sorting array by Model
    // $scope.carsSortedByModel = $scope.carsSorted.sort(function(a,b){
    //     var x = a.model;
    //     var y = b.model;
    //     return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    // });

    $scope.workOutList = availableWorkouts;
    $scope.chosenWorkouts = chosenWorkouts;

    $scope.addCar = function(selectedWorkout){
        //adds selected car to wishlist
        selectedWorkout = $scope.optionSelected;
        workoutIndex = $scope.workOutList.indexOf(selectedWorkout);

        if (selectedWorkout === document.getElementById('default-option')) {
            return false;
         } else {
            //adds this car to wish list
            $scope.chosenWorkouts.push(selectedWorkout);
            //remove this car from selectable options
            $scope.workOutList.splice(workoutIndex, 1);
      
          // Logic behind select box:
            // for (var i = 0; i < $scope.workOutList.length; i++) {
            //    if (selectedCarMake === $scope.carsList[i].make) {
            //        //displays next car from the same make when there is any remaining
            //        $scope.optionSelected = $scope.carsList[i];
            //          break;
            //     } else {
            //       //if there's no more cars of this make, then default option
            //       $scope.optionSelected = document.getElementById('default-option');
            //     }
            // };    
         }
      };
});

workoutApp.directive('workOutDetail', function(){
  return {
    restrict: 'E',
    templateUrl: 'work-out-detail.html',
    controller: function($scope){
      $scope.selectedWorkouts = chosenWorkouts;
    },
    controllerAs: 'workout'
  };
});

workoutApp.controller('WishListController', ['$scope', function($scope){
  $scope.selectedWorkouts = chosenWorkouts;
  $scope.workOutList = availableWorkouts;

  //removes the car from wish list and makes it visible again in the select-options

  $scope.removeItem = function(workout){
  index = $scope.selectedWorkouts.indexOf(workout);
  $scope.selectedWorkouts.splice(index, 1);
  $scope.workOutList.push(workout);
  };

   // Sort by specification HP and Top Speed
   // $scope.predicate = 'horsePower';
   // $scope.predicate = 'topSpeed';

   //Changing Background color of the filter button

   //initializes with most recently added filter
   this.tab = 1;

   this.selectTab = function(setTab) {
      this.tab = setTab;
   };

   this.isSelected = function(checkTab){
      return this.tab === checkTab;
   };
}]);