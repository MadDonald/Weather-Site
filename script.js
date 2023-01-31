//Variables for generation options
var choiceArray = [];
var characterLenght = [];

var upperCase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerCase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var special = ["!", "%", "&", ",", "*", "+", "-", ".", "/", "<", ">", "?","~"];

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
    var correctOptions = getOptions(); //Checks if the user selected any options
    var passwordText = document.querySelector("#password");
    
     if (correctOptions) {
      var newPassword = generatePassword();

      passwordText.value = newPassword;
    } else {
        passwordText.value = "Please select one option for a password";
    }
}

function generatePassword() {
  //Generates the password based on the options selected
  var password = "";
  for(var i = 0; i < characterLenght; i++) {
    var randomChar = Math.floor(Math.random() * choiceArray.length);
    password = password + choiceArray[randomChar];
  }
  return password;
}

//Prompt for how many characters
function getOptions(){
    choiceArray = []; //Resets the array each time

    characterLenght = parseInt(prompt("How many characters would you like? Please choose between 8 and 128"));

  //Confirms the lenght
      while(characterLenght<= 7 || characterLenght >= 129) {
        alert("The password must be between 8-128 characters, try again");
        characterLenght = (prompt("How many characters would you like? Please choose between 8 and 128"));
    }
    //Notifies the user how long the password will be
        alert("Your password will be " + characterLenght + " characters long");

  //Asks user for other options
    if(confirm("Do you want uppercase letters in your password?")) {
     choiceArray = choiceArray.concat(upperCase);
    }

    if(confirm("Do you want lowercase letters in your password?")) {
      choiceArray = choiceArray.concat(lowerCase);
    }

    if(confirm("Do you want numbers in your password?")) {
      choiceArray = choiceArray.concat(numbers);
    }

    if(confirm("Do you want special characters in your password?")) {
      choiceArray = choiceArray.concat(special);
    }    
    return true;
}