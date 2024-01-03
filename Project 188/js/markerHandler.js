AFRAME.registerComponent("marker-handler", {
  init: async function () {

    this.el.addEventListener("markerFound", () => {
      console.log("marker is found")
      this.handleMarkerFound();
    });

    this.el.addEventListener("markerLost", () => {
      console.log("marker is lost")
      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var summaryButton = document.getElementById("summary-button");
    var orderButtton = document.getElementById("order-button");

    // Handling Click Events
    summaryButton.addEventListener("click", () => {
      swal({
        icon: "warning",
        title: "Enjoy the book!",
        text: "Here's a summary!"
      });
    });

    orderButtton.addEventListener("click", () => {
      swal({
        icon: "https://i.imgur.com/4NZ6uLY.jpg",
        title: "Thanks For Order!",
        text: "Your order will be delivered soon!"
      });
    });
  },

  handleMarkerLost: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  }
});
