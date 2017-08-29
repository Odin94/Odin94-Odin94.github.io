var DEBUGMODE = true;

// STEP ONE
var selectedGoals = [];
var checkedFilters = {group: "radioGroupBoth", phys: "radioPhysBoth", moderated: "radioModeratedBoth", 
    duration: "radioBothDuration", difficulty: "radioDiffBoth"}; // IDs of checked radio buttons

function toggleSelectedGoal() {
    $(this).toggleClass("selectedGoal");

    var goalID = $(this).attr("id");

    // if it's not in selectedGoals, add this goal
    if($.inArray(goalID, selectedGoals) == -1) {
        selectedGoals.push(goalID);
    } 
    // otherwise remove it
    else {
        selectedGoals = selectedGoals.filter(function(goal) {
           return goal != goalID; 
        });
    }
}

function toggleExplainedGoal() {
    var explanationToGoalMap = {};
    explanationToGoalMap["ex-Problems"] = "goals-Problems";
    explanationToGoalMap["ex-Knowledge"] = "goals-Knowledge";
    explanationToGoalMap["ex-Ideas"] = "goals-Ideas";
    explanationToGoalMap["ex-Evaluate"] = "goals-Evaluate";

    // Get ID of goal-div that this explanation belongs to
    var goalID = explanationToGoalMap[$(this).attr("id")]

    $("#" + goalID).toggleClass("selectedGoal");

    // if it's not in selectedGoals, add this goal
    if($.inArray(goalID, selectedGoals) == -1) {
        selectedGoals.push(goalID);
    } 
    // otherwise remove it
    else {
        selectedGoals = selectedGoals.filter(function(goal) {
           return goal != goalID; 
        });
    }
}

function syncFiltersToInterface() {
    $("#"+checkedFilters.group).prop('checked', 'checked');
    $("#"+checkedFilters.phys).prop('checked', 'checked');
    $("#"+checkedFilters.moderated).prop('checked', 'checked');

    $("#"+checkedFilters.duration).prop('checked', 'checked');
    $("#"+checkedFilters.difficulty).prop('checked', 'checked');
}

// postFix can be "KO" for KO-Criteria
function syncFiltersFromInterface(postFix="") {
    checkedFilters.group = $("input[name=singleGroup" + postFix + "]:checked").val();
    checkedFilters.phys = $("input[name=phys" + postFix + "]:checked").val();
    checkedFilters.moderated = $("input[name=moderated" + postFix + "]:checked").val();

    checkedFilters.duration = $("input[name=duration" + postFix + "]:checked").val();
    checkedFilters.difficulty = $("input[name=difficulty" + postFix + "]:checked").val();
}

function showRecommendationsAndHideGoalChoice() {
    $("#goalChoice").fadeOut("slow");
    $("#recommendationChoice").fadeIn("slow");
}

$("#goals .col").click(toggleSelectedGoal);
$("#explanations .col").click(toggleExplainedGoal);

$("#generateRecommendations").click(function() {
    if (selectedGoals.length > 0 || DEBUGMODE) {
        syncFiltersFromInterface("KO");  // read KO criteria radio buttons
        showRecommendationsAndHideGoalChoice();
        syncFiltersToInterface();  // write KO criteria to filter box
    }
    else window.alert("Bitte wähle ein oder mehrere Ziele aus.");
});




// STEP TWO
var firstTechnique = {name: "Brainstorming", description: "Alle Ideen, die einem in den Kopf schießen, notieren und diese zur Inspiration für neue Ideen verwenden.", 
    group: "Beide", phys: "Nein", mod: "Beides", duration: "Lang", difficulty: "Einfach"}
var secondTechnique = {name: "6-3-5", description: "Jeder schreibt eine Idee auf einen Zettel und reicht diesen an seine/n Nachbar/in, welche/r sich von dieser inspirieren lässt.", 
    group: "Gruppe", phys: "Nein", mod: "Nein", duration: "Lang", difficulty: "Nicht-So-Einfach"}
var thirdTechnique = {name: "Inspirational Words", description: "Wähle ein zufälliges Wort (z.B. aus einem Wörterbuch) und versuche dieses auf dein Problem zu beziehen um dich zu inspirieren.", 
    group: "Beide", phys: "Ja", mod: "Nein", duration: "Kurz", difficulty: "Einfach"}

// newTechniques is an array, contains 3 technique Objects
function fillTechniques(newTechniques) {
    var techNumbers = ["first", "second", "third"];
    for (var i = 0; i < techNumbers.length; i++) {
        $("#" + techNumbers[i] + "TechniqueName").text(newTechniques[i].name);
        $("#" + techNumbers[i] + "TechniqueDescription").text(newTechniques[i].description);

        $("#" + techNumbers[i] + "TechniqueGroup").text(newTechniques[i].group);
        $("#" + techNumbers[i] + "TechniquePhys").text(newTechniques[i].phys);
        $("#" + techNumbers[i] + "TechniqueMod").text(newTechniques[i].mod);

        $("#" + techNumbers[i] + "TechniqueDuration").text(newTechniques[i].duration);
        $("#" + techNumbers[i] + "TechniqueDifficulty").text(newTechniques[i].difficulty);
    }
}

// techNumber is "first", "second" or "third"
function fadeInReroll(techNumber, newTechnique) {
    $("#" + techNumber + "TechniqueName").text(newTechnique.name);
    $("#" + techNumber + "TechniqueDescription").text(newTechnique.description);

    $("#" + techNumber + "Technique").fadeIn("slow");
}

// techNumber is "first", "second" or "third"
function reroll(techNumber) {
    $("#" + techNumber + "Technique").fadeOut("slow");

    setTimeout(function() {
        var newTechnique = {name: "Eine Ähnliche Technik", description: "Vermutlich etwas ähnliches, das zu ähnlichen Zielen führt und dessen Anwendung ähnlich ist. Noch nicht implementiert :)"};
        fadeInReroll(techNumber, newTechnique);
    }, 500);
}

function fadeOutAll() {
    $("#firstTechnique").fadeOut("slow");
    $("#secondTechnique").fadeOut("slow");
    $("#thirdTechnique").fadeOut("slow");
}

function fadeInAll() {
    $("#firstTechnique").fadeIn("slow");
    $("#secondTechnique").fadeIn("slow");
    $("#thirdTechnique").fadeIn("slow");
}

function generateNewRecommendations() {
    fadeOutAll();
    syncFiltersFromInterface();
    // TODO: pass current filters to recommender, get recommendations, update view

    setTimeout(function() {
        fadeInAll();
    }, 500);
}



$("#firstAnotherButton").click(function() { reroll("first"); });
$("#secondAnotherButton").click(function() { reroll("second"); });
$("#thirdAnotherButton").click(function() { reroll("third"); });

$("#filteringButton").click(generateNewRecommendations);

$("#moreBeginnerFriendlyButton").click(function() {
    // TODO: pass BeginnerFriendly criticism to recommender
    generateNewRecommendations();
});
$("#lessStrenuousButton").click(function() {
    // TODO: pass LessStrenuous criticism to recommender
    generateNewRecommendations();
});
$("#lessConventionalButton").click(function() {
    // TODO: pass LessConventional criticism to recommender
    generateNewRecommendations();
});
$("#comprehensiveButton").click(function() {
    // TODO: pass comprehensive criticism to recommender (more than one goal)
    generateNewRecommendations();
});

fillTechniques([firstTechnique, secondTechnique, thirdTechnique]);
