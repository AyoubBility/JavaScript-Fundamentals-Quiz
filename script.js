const start_btn = document.querySelector(".start_btn button");
const quiz = document.querySelector(".quiz")
const submit = document.querySelector(".button .submit");
const highscore_page = document.querySelector(".highscore_page button");
const question_options_list = document.querySelector(".question_options_list");
var timer_count = document.querySelector(".timer .timer_sec")

let question_count = 0;
var timer;
var timerCount;
var isWin = false
var user_score = 0;

start_btn.addEventListener("click", function(event) {
    timerCount = 100
    quiz.classList.add("active_quiz");
    show_questions(0);
    start_timer();
});

const next_btn = quiz.querySelector(".next_btn")
const highscores = document.querySelector(".highscores");

next_btn.addEventListener("click", function(event){
    if(question_count < questions.length - 1){
        question_count++;
        show_questions(question_count)
    }else{
        console.log("You have finished")
        isWin = true;
        show_results();
    }
})

function show_questions(index){
    const question_text = document.querySelector(".question_text");
    let question_tag = '<span>'+ questions[index].num + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    question_text.innerHTML = question_tag;
    question_options_list.innerHTML = option_tag;
    
    const option = question_options_list.querySelectorAll(".option");
    for (var i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    let user_answer = answer.textContent;
    let correct_answer = questions[question_count].answer;
    let all_options = question_options_list.children.length;
    if(user_answer == correct_answer){
        user_score += 1;
        console.log(user_score)
        console.log("You answered correctly.")
    }else if(user_answer !==correct_answer && user_score > 0){
        timerCount -= 10;
        user_score -= 1;
        console.log("You answered incorrectly.")
    }else{
        user_score = 0;
    }

    for (var i = 0; i < all_options.length; i++){
        question_options_list.children[i].classList.add("disabled");
    }
}

function show_results(){
    quiz.classList.remove("active_quiz");
    highscores.classList.add("active_highscores");
    const score_text = highscores.querySelector(".score_text");
    if(user_score > 1){
        let score_tag = '<span>You got<p>'+ user_score +'</p><p>out off</p><p>5</p></span>';
        score_text.innerHTML = score_tag;
    }else{
        let score_tag = '<span>You got<p>'+ user_score +'</p><p>out off</p><p>5</p></span>';
        score_text.innerHTML = score_tag;
    }
}

function start_timer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timer_count.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          show_results();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        show_results();
      }
    }, 1000);
  }
  