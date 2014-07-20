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


workoutApp.controller('SelectedListController', ['$scope', function($scope){
  $scope.selectedWorkouts = chosenWorkouts;
  $scope.workOutList = availableWorkouts;

  //removes workout from to-do and makes it visible again in the select options

  $scope.removeItem = function(workout){
  index = $scope.selectedWorkouts.indexOf(workout);
  $scope.selectedWorkouts.splice(index, 1);
  $scope.workOutList.push(workout);
  $scope.optionSelected = document.getElementById('default-option');
  };



   // Sort by specification Difficulty and Length
   $scope.predicate = 'difficulty';
   $scope.predicate = 'length';

   //Changing Background color of the filter button

   $scope.selectTab = function(setTab) {
      $scope.tab = setTab;
   };

   $scope.isSelected = function(checkTab){
      return $scope.tab === checkTab;
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

// Logic behind form. Adding fields, displaying preview of workout and adding workout to available list

workoutApp.directive('newWorkout', function(){
  return {
    restrict: 'EA',
    templateUrl: 'partials/new-workout.html',
    controller: function(){
      this.showForm = false;
      // range for the select fields
      this.range = [1,2,3,4,5,6,7,8,9,10];

      
      // this function adds fields to the form, so the user can add another single exercise (enables the above function)

      this.addFields = function(){
        this.newFields = [];
        this.newFields.push({ exercise: '', reps: '', weight: '', help: ''
        });
        // hides "add an exercise" button
        this.active = "inactive";
      };

      var newWorkout = [];
      var exerciseArray = [];
      var repsArray = [];
      var weightArray = [];
      var helpArray = [];

      // This function adds a single exercise to the workout
      this.addSingleExercise = function() {
        var newExercise = this.newFields;
        newWorkout.push(newExercise[0]);
        this.preview = newWorkout;

        // adds exercises and specifications to arrays
        exerciseArray.push(newExercise[0].exercise);
        repsArray.push(newExercise[0].reps);
        weightArray.push(newExercise[0].weight);
        helpArray.push(newExercise[0].help);
        // empty input fields
        this.addFields();
      };

// This function adds a new workout to the existing "Availabe Workouts"

      this.addWorkout = function(myForm){

        // Organizing exercises information to add to available workout
        var newWorkout = {
        name: myForm.workoutName,
        exercises: exerciseArray,
        reps: repsArray,
        rounds: myForm.rounds,
        weight: weightArray,
        help: helpArray,
        length: myForm.length,
        difficulty: myForm.difficulty
        };

        // Adding workout to available workout list
        availableWorkouts.push(newWorkout);

        // hides form when user adds workout to available list
        this.showForm = false;

        // form validation
        this.submitted = true;

      };
    },
    controllerAs: 'newWorkoutCtrl'
  };
});
