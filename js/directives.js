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
    restrict: 'E',
    transclude: true,
    templateUrl: 'partials/new-workout.html',
    controller: function(){
      this.showForm = false;
      // range for the select fields
      this.scale = [1,2,3,4,5,6,7,8,9,10];
      this.minutes = [5,10,15,20,25,30,35,40,45,50,60,70,80,90];

      //default values
      myForm.workoutName.value = "";
      myForm.rounds.value = "";
      myForm.difficulty.value = "";
      myForm.exLength.value = "";

      var newWorkout = [];
      var exerciseArray = [];
      var repsArray = [];
      var weightArray = [];
      var helpArray = [];


      // this function adds fields to the form, so the user can add another single exercise (enables the above function)

      this.addFields = function(){        
          this.showFields = true;
          this.newFields = [];
          this.newFields.push({ exercise: '', reps: '', weight: '', help: ''
          });

      };

      // resets the form after a workout is added
      this.resetForm = function(){
      
        this.newFields = [];
        newWorkout = [];
        myForm.workoutName.value = "";
        myForm.rounds.value = "";
        myForm.difficulty.value = "";
        myForm.exLength.value = "";
        exerciseArray = [];
        repsArray = [];
        weightArray = [];
        helpArray = [];
        this.preview = [];
        // Cleaning up workout preview
        var workoutPreview = document.getElementById('workout-preview');
        var getSpan = workoutPreview.getElementsByTagName('span');

        for (var i = 0; i < 4; i++) {
          getSpan[i].innerHTML = " ";
          getSpan[i].innerText = " ";
        }
            


        //erases previous global error messages
        this.globalFormError = false;
      };

      // This function adds a single exercise to the workout
      this.addSingleExercise = function(subForm) {
        
        if(subForm.$valid && subForm.$dirty) {
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
        
        //hide "new exercise" fields
        this.showFields = false;
        // clean previous error messages
        this.formError = true;

      } else {
        this.formError = true;
      }
  
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
        var subForm = myForm.subForm;
        // Organizing exercises information to add to available workout


        if(myForm.$valid && myForm.$dirty){
          
          this.addSingleExercise(subForm);
          newWorkout = {
          name: myForm.workoutName.value,
          exercises: exerciseArray,
          reps: repsArray,
          rounds: myForm.rounds.value,
          weight: weightArray,
          help: helpArray,
          length: myForm.exLength.value,
          difficulty: myForm.difficulty.value
          };

          // Adding workout to available workout list
          availableWorkouts.push(newWorkout);

          // hides form when user adds workout to available list
          this.showForm = false;

          // clear new workout fields
          this.resetForm();
        } else {
          this.globalFormError = true;         

        }

      };
    },
    controllerAs: 'newWorkoutCtrl'
  };
});