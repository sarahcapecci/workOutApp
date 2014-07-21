//Angular Application
// Hey, are you a developer too? You can check this project's code here: https://github.com/sarahcapecci/workOutApp  :)


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


workoutApp.controller('SelectedListController', function($scope){
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
   this.tab = 0;

   this.selectTab = function(setTab) {
      this.tab = setTab;
   };

   this.isSelected = function(checkTab){
      return this.tab === checkTab;
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

// Logic behind form. Adding fields, displaying preview of workout and adding workout to available list

workoutApp.directive('newWorkout', function(){
  return {
    restrict: 'EA',
    templateUrl: 'partials/new-workout.html',
    controller: function(){
      this.showForm = false;
      // range for the select fields
      this.scale = [1,2,3,4,5,6,7,8,9,10];
      this.minutes = [5,10,15,20,25,30,35,40,45,50,60,70,80,90];

      
      // this function adds fields to the form, so the user can add another single exercise (enables the above function)

      this.addFields = function(){
        this.showFields = true;
        this.newFields = [];
        this.newFields.push({ exercise: '', reps: '', weight: '', help: ''
        });

        this.state = "active";

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
        
        // hides "add an exercise" button
        this.state = "inactive";
        //hide "new exercise" fields
        this.showFields = false;
      };

      // Removes single exercise from workout preview

      this.removeExercise = function(workout){
      index = newWorkout.indexOf(workout);
      newWorkout.splice(index, 1);
      console.log(workout);
      console.log(index);
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
        length: myForm.exLength,
        difficulty: myForm.difficulty
        };

        // Adding workout to available workout list
        availableWorkouts.push(newWorkout);

        // hides form when user adds workout to available list
        this.showForm = false;

        // form validation - not completed
        this.submitted = true;

      };
    },
    controllerAs: 'newWorkoutCtrl'
  };
});
