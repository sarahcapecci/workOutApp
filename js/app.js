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


// workoutApp.directive('newExercise', function(){
//   return {
//     restrict: 'E',
//     templateUrl: 'partials/new-exercise.html',
//     controller: function(){
//       this.showFields = false;


//     },
//     controllerAs: 'newExerciseCtrl'
//   };
// });

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

// form logic

workoutApp.directive('newWorkout', function(){
  return {
    restrict: 'EA',
    templateUrl: 'partials/new-workout.html',
    controller: function(){
      this.showForm = false;
      this.range = [1,2,3,4,5,6,7,8,9,10];

      
      // this function adds fields to the form, so the user can add another single exercise (enables the above function)

      this.addFields = function(){
        this.newFields = [];
        this.newFields.push({ exercise: '', reps: '', weight: ''
        });
         
      };
      
      var newWorkout = [];
      var exerciseArray = [];
      var repsArray = [];
      var weightArray = [];

      // This function adds a single exercise to the workout
      this.addSingleExercise = function() {
        var newExercise = this.newFields;
        newWorkout.push(newExercise);
        exerciseArray.push(newExercise[0].exercise);
        repsArray.push(newExercise[0].reps);
        weightArray.push(newExercise[0].weight);
        this.addFields();
      };

      // This function adds a new workout to the existing "Availabe Workouts"

      this.addWorkout = function(myForm){

        var newWorkout = {
        name: myForm.workoutName,
        exercises: exerciseArray,
        reps: repsArray,
        rounds: myForm.rounds,
        weight: weightArray,
        length: myForm.length,
        difficulty: myForm.difficulty
        };

        availableWorkouts.push(newWorkout);
        this.showForm = false;
      };
    },
    controllerAs: 'newWorkoutCtrl'
  };
});
