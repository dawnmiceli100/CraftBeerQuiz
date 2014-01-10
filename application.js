
$(document).ready(function() {

	// constructor for question Object
	function questionObject(num, question, answers, answerPosition) {
		this.num = num;
		this.question = question;
		this.answers = answers;
		this.answerPosition = answerPosition;
	}
	
	// info for question 0
	var question0Question = "This brewery is based in Delaware and some of it\'s popular brews include Midas Touch, 60 Minute IPA and Burton Baton.";
	var question0Answers = ["Lagunitas Brewing Company", "Dogfish Head Brewing Company", "Bell\'s Brewing Company", "Stone Brewing Company"];
	var question0AnswerPosition = 1;

	// info for question 1
	var question1Question = "This Fort Collins Colorado Brewery is 100% employee owned and receives all of it\'s energy from wind power. They brew Fat Tire and Ranger.";
	var question1Answers = ["Oskar Blues Brewery", "Founders Brewing Company", "New Belgium Brewing Company", "Dogfish Head Brewing Company"];
	var question1AnswerPosition = 2;

	// info for question 2
	var question2Question = "This Vermont Brewery has only ever brewed one beer, the very popular double IPA named Heady Topper.";
	var question2Answers = ["Otter Creek Brewing Company", "Alchemist Brewery", "Longtrail Brewing Company", "Harpoon Brewery"];
	var question2AnswerPosition = 1;

	// info for question 3
	var question3Question = "This California brewery has a pitbull on every label. Their brews include Little Sumpin\' Sumpin\', Hop Stoopid and a very popular IPA.";
	var question3Answers = ["Lagunitas Brewing Company", "Stone Brewing Company", "Russian River Brewing Company", "Rogue Brewery"];
	var question3AnswerPosition = 0;

	// info for question 4
	var question4Question = "This Kalamazoo Michigan brewery grows their own barley. They brew Two Hearted Ale and Expedition Stout.";
	var question4Answers = ["Founders Brewing Company", "New Belgium Brewing Company", "Bell\'s Brewing Company", "Cigar City Brewing Company"];
	var question4AnswerPosition = 2;

	// create the question objects
	var question0 = new questionObject(0, question0Question, question0Answers, question0AnswerPosition);
	var question1 = new questionObject(1, question1Question, question1Answers, question1AnswerPosition);
	var question2 = new questionObject(2, question2Question, question2Answers, question2AnswerPosition);
	var question3 = new questionObject(3, question3Question, question3Answers, question3AnswerPosition);
	var question4 = new questionObject(4, question4Question, question4Answers, question4AnswerPosition);

	//Create array of question objects
	var questionsArray = [question0, question1, question2, question3, question4];

	var score = 0;
	var status = '';

	//Display first question
	var currentQuestion = 0;
	displayQuestion(currentQuestion);
	var correctAnswer = getCorrectAnswer(currentQuestion);
	
	//User presses button to submit their answer	
	$('#submitButton').click(function() {
		hideMessages();
		status = checkUserAnswer();

		switch (status) {
			case 'none': //didn't select a radio button
				$('#noAnswer').removeClass('hidden');
				break;

			case 'incorrect': //wrong answer
				$('#incorrect').removeClass('hidden');
				break;

			default: //correct answer	
				score++;
				displayScore();
				$('#score').effect('pulsate', {times: 3});
				currentQuestion++;
				if (currentQuestion <= 4) {
					displayQuestion(currentQuestion);
					correctAnswer = getCorrectAnswer(currentQuestion);
				} else {
					$('#quizOver').removeClass('hidden');
					$('#submitButton').prop('disabled', true);
					$('input').prop('disabled', true);
				};	
		}		
	});

	function displayQuestion(n) {
		$('#questionNumber').html("Question " + (n+1) + " of " + questionsArray.length);
		$('#question').html(questionsArray[n].question);
		$('#answer0').html('<input type="radio" name="brewery" value="0"> ' + questionsArray[n].answers[0]);
		$('#answer1').html('<input type="radio" name="brewery" value="1"> ' + questionsArray[n].answers[1]);
		$('#answer2').html('<input type="radio" name="brewery" value="2"> ' + questionsArray[n].answers[2]);
		$('#answer3').html('<input type="radio" name="brewery" value="3"> ' + questionsArray[n].answers[3]);
		displayScore();	
	};

	function hideMessages() {
		$('#noAnswer').addClass('hidden');
		$('#incorrect').addClass('hidden');
		$('#quizOver').addClass('hidden');	
	};

	function getCorrectAnswer(n) {
		return (questionsArray[currentQuestion].answerPosition);
	};

	function displayScore() {
		$('#score').html("Score: " + score);
	};

	function checkUserAnswer() {
		if ($('input:radio:checked').length==0) {
			return 'none';
		};

		if ($('input:radio:checked').val() != correctAnswer) {
			return 'incorrect';
		};
		
		return 'correct';
	};
	
});

	



