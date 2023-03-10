// Async Code

console.log("Start");

function loginDetail(email, password, callback) {
  console.log("We are in the function");
  setTimeout(() => {
    console.log("now we have the data");
    callback({ userEmail: email });
  }, 5000); //setTimeout() will not be in callstack for 5 seconds
}

function getVideos(email, callback) {
  console.log("We are in the 2nd function");
  setTimeout(() => {
    callback(["video1", "video2", "video3"]);
  }, 2000);
}

let user = loginDetail("sarthakgone@goomail.com", 12345, (user) => {
  console.log(user); //callback function
  getVideos(user.userEmail, (videos) => {
    console.log(videos); //2nd callback function
  });
});

console.log("End");
