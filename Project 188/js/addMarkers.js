AFRAME.registerComponent("create-markers", {
    init: async function() {
      var mainScene = document.querySelector("#main-scene");
      var books = await this.getBooks();
      books.map(book => {
        var marker = document.createElement("a-marker");   
        marker.setAttribute("id", book.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", book.marker_pattern_url);
        marker.setAttribute("cursor", {
          rayOrigin: "mouse"
        });
        //set the markerhandler component
        marker.setAttribute("marker-handler", {});
        mainScene.appendChild(marker);
        // Adding 3D model to scene
        var model = document.createElement("a-entity");    
       
        model.setAttribute("id", `model-${book.id}`);
        model.setAttribute("position", book.model_geometry.position);
        model.setAttribute("rotation", book.model_geometry.rotation);
        model.setAttribute("scale", book.model_geometry.scale);
        model.setAttribute("gltf-model", `url(${book.model_url})`);
        model.setAttribute("gesture-handler", {});
        marker.appendChild(model);
  
        // Description Container
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${book.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        marker.appendChild(mainPlane);

        //Plane to show the price of the toy
        var pricePlane = document.createElement("a-image");
        pricePlane.setAttribute("id", `price-plane-${book.id}`);
        pricePlane.setAttribute(
          "src",
          "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png"
        );
        pricePlane.setAttribute("width", 0.8);
        pricePlane.setAttribute("height", 0.8);
        pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.3 });
        pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        pricePlane.setAttribute("visible",false);

        //Price of the toy
        var price = document.createElement("a-entity");
        price.setAttribute("id", `price-${book.id}`);
        price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
        price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        price.setAttribute("text", {
          font: "mozillavr",
          color: "white",
          width: 3,
          align: "center",
          value: `Only\n $${book.price}`
        });

        pricePlane.appendChild(price);
        marker.appendChild(pricePlane);
  
        // Toy title background plane
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${book.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);
  
        // Toy title
        var bookTitle = document.createElement("a-entity");
        bookTitle.setAttribute("id", `book-title-$book.id}`);
        bookTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        bookTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        bookTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
        });
        titlePlane.appendChild(bookTitle);
  
        // Description List
        var description = document.createElement("a-entity");
        description.setAttribute("id", `description-${book.id}`);
        description.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
        description.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        description.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `${book.description}`
        });
        mainPlane.appendChild(description);
      });
    },
    //function to get the toys collection from firestore database
    getBooks: async function() {
      return await firebase
        .firestore()
        .collection("books")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    }
  });