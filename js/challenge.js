document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    const counter = document.getElementById("counter");
    const minusBtn = document.getElementById("minus");
    const plusBtn = document.getElementById("plus");
    const heartBtn = document.getElementById("heart");
    const pauseBtn = document.getElementById("pause");
    const likesList = document.querySelector(".likes");
    const commentForm = document.getElementById("comment-form");
    const commentList = document.getElementById("list");
  
    let count = 0;
    let timer;
  
    // Function to increment the counter
    function incrementCounter() {
      count++;
      counter.textContent = count;
    }
  
    // Function to decrement the counter
    function decrementCounter() {
      count--;
      counter.textContent = count;
    }
  
    // Function to add a like
    function addLike() {
      const existingLike = document.getElementById(`like-${count}`);
      if (existingLike) {
        // If a like already exists for this count, increment its count
        const countSpan = existingLike.querySelector(".count");
        const currentCount = parseInt(countSpan.textContent);
        countSpan.textContent = currentCount + 1;
      } else {
        // If it's the first like for this count, create a new like element
        const like = document.createElement("li");
        like.setAttribute("id", `like-${count}`);
        like.innerHTML = `${count} has been liked <span class="count">1</span> times.`;
        likesList.appendChild(like);
      }
    }
  
    // Event listener for plus button
    plusBtn.addEventListener("click", incrementCounter);
  
    // Event listener for minus button
    minusBtn.addEventListener("click", decrementCounter);
  
    // Event listener for heart button
    heartBtn.addEventListener("click", addLike);
  
    // Event listener for pause button
    pauseBtn.addEventListener("click", function () {
      if (pauseBtn.textContent === "pause") {
        clearInterval(timer);
        minusBtn.disabled = true;
        plusBtn.disabled = true;
        heartBtn.disabled = true;
        pauseBtn.textContent = "resume";
      } else {
        timer = setInterval(incrementCounter, 1000);
        minusBtn.disabled = false;
        plusBtn.disabled = false;
        heartBtn.disabled = false;
        pauseBtn.textContent = "pause";
      }
    });
  
    // Event listener for restart button
    document.getElementById("restart").addEventListener("click", function () {
      count = 0;
      counter.textContent = count;
      likesList.innerHTML = "";
      commentList.innerHTML = "";
      clearInterval(timer);
      minusBtn.disabled = false;
      plusBtn.disabled = false;
      heartBtn.disabled = false;
      pauseBtn.textContent = "pause";
      timer = setInterval(incrementCounter, 1000);
    });
  
    // Event listener for comment form submission
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const commentInput = document.getElementById("comment-input");
      const comment = commentInput.value;
      const commentItem = document.createElement("div");
      commentItem.textContent = comment;
      commentList.appendChild(commentItem);
      commentInput.value = "";
    });
  
    // Start the timer initially
    timer = setInterval(incrementCounter, 1000);
  });
  