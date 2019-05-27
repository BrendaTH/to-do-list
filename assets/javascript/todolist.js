    // to do list by Brenda Thompson April 15, 2019
    
    // VARIABLES
    // ==========================================================================
    // OBJECTS TDL = to do list
    var myTDL ={
        active: [],
        completed: [],
        all: [],
        activeWord: "",
        clearCompletedButtonDisplayed: false,

        // each function does one thing
        // removes from a list, adds to a list, displays a button, etc..
        // initToDoList()

        // list array manipulation
            // removeFromActiveList(itemToRemove)
            // removeAllFromCompletedList()
            // addToActiveList(activeItem)
            // addToCompletedList(completedItem)

        // items on page manipulation
            // eraseTypeOfItemsFromDisplay(type)
            // eraseBrFromDisplay
            // eraseAllListsFromPage
            // displayAnotherActiveItemOnPage(item)
            // displayAList()

        // button manipulation on page
            // removeClearCompletedButton()
            // displayClearCompletedButton()



        initToDoList: function() {
            // display active
            // display completed
            console.log("onload in initToDoList");
        },
        
        // removeFromActiveList:
        // remove the item from the active list
        // input: itemToRemove - item completed
        removeFromActiveList: function(itemToRemove) {
            var indexOfItemToRemove = this.active.indexOf(itemToRemove);

            // find itemToRemove in active list
            // remove from active list
            // add to completed list
            if (indexOfItemToRemove > -1) {
                this.active.splice(indexOfItemToRemove,1);
            }
        },

        removeAllFromCompletedList: function() {
            this.completed = [];
        },

        // addToActive
        // add an item to the active list
        // input: aItem - the item to be added to active list
        addToActive: function(aItem) {
            this.active.push(aItem);
        },

        // addToCompletedList
        // add an item to the completed list
        // display clear completed button 
        // input: completedItem - item to add to completed list
        // where is the radio button set? bjt bjt bjt
        addToCompletedList: function(completedItem) {
            this.completed.push(completedItem);
            this.displayClearCompletedButton();
        },

        // eraseTypeOfItemsFromDisplay
        // clear display of a type of item
        // input: type - either radio or checkbox
        eraseTypeOfItemsFromDisplay: function(type) {
            var itemToRemove;
            var aStr;
            $('input[type=' + type + ']').each(function() {
                // need to remove both the input element and the label
                itemToRemove = $(this).val();
                $(this).remove();
                aStr = ':contains(' + "'" + itemToRemove + "'" + ')';
                console.log("the string: " + aStr);
                $("label").remove(aStr);
            });
        },

        eraseBrFromDisplay: function()  {
            $("br").remove();
        },

        eraseAllListsFromPage: function() {
            this.eraseTypeOfItemsFromDisplay("radio");
            this.eraseTypeOfItemsFromDisplay("checkbox");
            this.eraseBrFromDisplay();
        },

        displayAnotherActiveItemOnPage: function(item) {
            var myString = '<input type="radio" name="rbtnCount" id="' + item + '" value="' + item + '"/><label class="bigger-font"> ' + item + '</label><br/>';
            console.log(myString);
            var radioButton = $(myString);
            radioButton.appendTo('#target');
        },


        // displayAList
        // displays a list that's passed in
        // input:
        //        theList - an array of items to display
        //        theType - radio or checkbox
        displayAList: function(theList, theType) {
            // wipe it from the display first
            var itemToAdd;
            var aStr;
            var checked;

            // now put list back on display
            for (var i = 0; i < theList.length; i++) {
                itemToAdd = theList[i];
                if (theType === "checkbox") {
                    checked = " checked";
                } else {
                    checked = "";
                }
                aStr = '<input type="' + theType + '" name="rbtnCount" id="' + itemToAdd + '" value="' + itemToAdd + '"' + checked + '/><label class="bigger-font"> ' + itemToAdd + '</label><br/>';
                console.log(aStr);
                var theInput= $(aStr);
                theInput.appendTo('#target');
            }
 
        },

        removeClearCompletedButton: function() {
            if (this.clearCompletedButtonDisplayed) {
                $('button.button4').remove();
                this.clearCompletedButtonDisplayed = false;
            }
        },


        displayClearCompletedButton: function() {
            if (!this.clearCompletedButtonDisplayed) {
                // display button
                var myButton = $('<button class="button button4" value="clear completed">clear completed</button>');
                // appendTo the content precedes the method and parent is passed in method
                // myJQ.appendTo('#button-parent');
                // append the parent precedes the method and content is passed in method
                $("#button-parent").append(myButton);
                // html will replace the other stuff in in button-parent
                // $("#button-parent").html(myJQ);
                this.clearCompletedButtonDisplayed = true;
            }
        },

    };
    // FUNCTIONS
    // generate a randon number of the integer flavor
     function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    // run this code when we load the page
    $(document).ready(function() {
        myTDL.initToDoList();


        //***************** */
        // added a new todo in the form box followed by a cr
        //***************** */
        $("#my-form").submit(function(){
            // get the new list item 
            var itemForList = $("#to-do-item").val();

            // set the box on the form to blank
            $("#to-do-item").val("");

            // add the new todo item to our array as active
            myTDL.addToActive(itemForList);
            
            // display the new to-do along with a radio button for the user to see
            myTDL.displayAnotherActiveItemOnPage(itemForList);
            return false;  // prevents page reload on form return key
        });


        //***************** */
        // radio button clicked - this item is completed
        //***************** */
        // need event delegation to listen for dynamically added selectors
        // if you have mix of dynamically added and static selectors it works for both
        // if we click on radio button that means we have completed this todo
        $("#target").on("click", "input[type=radio]", function() {
            // use val() for input elements not text()
            // val() will read the value= attribute
            // $(this).val() will grab the value attribute of the clicked button
            var itemToRemoveFromActive = $(this).val();
            myTDL.removeFromActiveList(itemToRemoveFromActive);
            myTDL.addToCompletedList(itemToRemoveFromActive);

            // replace the radio button with a checked box
            var myString = '<input type="checkbox" name="rbtnCount" id="' + itemToRemoveFromActive + '" value="' + itemToRemoveFromActive + '" checked/>';
            $(this).replaceWith(myString);
        })


        //***************** */
        // One of the bottom buttons has been clicked - perform button's action
        //***************** */
        $("#button-parent").on("click", "button", function() {
            console.log("at dynamic button click");
            // 'this' points to the button clicked

            if ($(this).val() === "clear completed") {
                myTDL.eraseAllListsFromPage();
                myTDL.displayAList(myTDL.active, "radio");
                myTDL.removeAllFromCompletedList();
                myTDL.removeClearCompletedButton();
            } else if ($(this).val() === "active") {
                myTDL.eraseAllListsFromPage();
                myTDL.displayAList(myTDL.active, "radio");
            } else if ($(this).val() === "all") {
                myTDL.eraseAllListsFromPage();
                myTDL.displayAList(myTDL.active, "radio");
                myTDL.displayAList(myTDL.completed, "checkbox");
            } else if ($(this).val() === "completed") {
                myTDL.eraseAllListsFromPage();
                myTDL.displayAList(myTDL.completed, "checkbox");
            }
        } );
});