//Angular Application

var workoutApp = angular.module('workoutApp', ['optionSelected', 'myForm']);
var workoutApp = angular.module('myForm', []);
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
    templateUrl: 'partials/work-out-detail.html',
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
    require: 'myForm',
    templateUrl: 'partials/new-workout.html',
    controller: function(){
      this.showForm = false;
      this.range = [1,2,3,4,5,6,7,8,9,10];

      this.addWorkout = function(myForm){
        var newWorkout = {
          name: myForm.name,
          exercises: myForm.exercises,
          reps: myForm.reps,
          rounds: myForm.rounds,
          weight: myForm.weight,
          help: myForm.help,
          length: myForm.length,
          difficulty: myForm.difficulty
        };
      console.log(newWorkout);
      };
    },
    controllerAs: 'newWorkoutCtrl'
  };
});

workoutApp.directive('newExercise', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/new-exercise.html',
    controller: function(){
      this.showFields = false;
      this.addExercise = function(){
        console.log("yes");
      };
    },
    controllerAs: 'newExerciseCtrl'
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