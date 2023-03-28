// this iife updates the copyright year in the footer
(function(){
	let now = new Date();
	let span = $("footer span");
	span.html(now.getFullYear());
})();

// global variable to store our returned data - we'll reduce the calls made to the server with this
let cupcakesCollection = null;

// use get to grab and display the cupcakes in their default order (this endpoint should return all of the cupcakes in  JSON in alphabetical order])
//TODO


// display sorted in ascending order (this is calling a different endpoint than the original, but you can use the same one or the global variable, we're just writing this as another call to the server so we can see the syntax for this type of call)
//TODO


// display the cupcakes sorted in descending order, but we'll use some built-in methods to handle this on the cupcakes we already have rather than making another call to the endpoint 
//TODO

// helper function to display the cupcakes given the data returned from the call
function displayCupcakes(data){
  console.log(data);
  // clear out any previous output from the container
  $("#cupcakes").empty();
  // an empty string to build our output
  let string = "";
  
  // iterate through the returned cupcakes collection and display to the screen in semantic tags
  for(let cupcake of data){
    string += 
      `<section>
        <img src="${cupcake.image}" alt="${cupcake.alt}">
        <h4>${cupcake.name}</h4>
        <b>Ingredients:</b>
        <p class='ingredients'>${cupcake.ingredients}</p>
        <b>${cupcake.frosting} Frosting</b>
        <p class='frosting'>${cupcake.frostingIngredients}</p>
      </section>`;
  }
  $("#cupcakes").html(string);
}

// helper function for displaying the filtered results - called on change of select drop down
// this looks at the JSON of our collection, specifically each cupcake's value attribute, to return only the cupcakes whose tag list includes the correct tags for that category of cupcakes (when you choose chocolate, you will see all of the cupcakes that have a tag of chocolate in their tags property)
$("#filter").change(function (){
  // get the currently selected option from the select drop down
  let tag = $(this).val();

  // if the user selected "all", display all of the cupcakes from our global variable
  if(tag === "all"){
    // displays all of the cupcakes
    displayCupcakes(cupcakesCollection);

    // enables the user to sort alphabetically again
    $("#alpha").prop("disabled", false);
    $("#zed").prop("disabled", false);
  }else{
    // store the cupcake objects with that tag to a new variable, this is the collection we'll display to the screen
    let filteredCupcakes = cupcakesCollection.filter(cupcake => cupcake.tags.includes(tag));
    console.log(filteredCupcakes);

    // display the filtered array to the screen
    displayCupcakes(filteredCupcakes);

    // disables the buttons to sort alphabetically for now. We could add this feature for filtered results later
    $("#alpha").prop("disabled", true);
    $("#zed").prop("disabled", true);
  }
});