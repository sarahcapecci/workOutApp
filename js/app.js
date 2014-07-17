//Angular Application

var workoutApp = angular.module('workoutApp', ['optionSelected']);

var workoutApp = angular.module('optionSelected', []);

workoutApp.controller('SelectListController', function ($scope) {


    $scope.workOutList = availableWorkouts;
    $scope.chosenWorkouts = chosenWorkouts;

    $scope.addWorkout = function(selectedWorkout){
        //adds selected car to wishlist
        selectedWorkout = $scope.optionSelected;
        workoutIndex = $scope.workOutList.indexOf(selectedWorkout);

        if (selectedWorkout === document.getElementById('default-option')) {
            return false;
         } else {
            //adds this workout to to-do list
            $scope.chosenWorkouts.push(selectedWorkout);
            //remove this car from selectable options
            $scope.workOutList.splice(workoutIndex, 1);
          
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
    controllerAs: 'workout',
    replace: true
  };
});

workoutApp.directive('newWorkout', function(){
  return {
    restrict: 'E',
    templateUrl: 'new-workout.html',
    controller: function(){
      this.showForm = false;
    },
    controllerAs: 'newWorkoutCtrl',
    replace: true
  };

});

workoutApp.controller('SelectedListController', ['$scope', function($scope){
  $scope.selectedWorkouts = chosenWorkouts;
  $scope.workOutList = availableWorkouts;

  //removes workout from to-do and makes it visible again in the select options

  $scope.removeItem = function(workout){
  index = $scope.selectedWorkouts.indexOf(workout);
  $scope.selectedWorkouts.splice(index, 1);
  $scope.workOutList.push(workout);
  };

   // Sort by specification Difficulty and Length
   $scope.predicate = 'difficulty';
   $scope.predicate = 'length';

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