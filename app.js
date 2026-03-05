(function () {
  var affirmations = [
    "pov: me rushing home\nso i can do absolutely nothing, ASAP",
    "you're literally the main character\nand the plot is *chef's kiss*",
    "certified good egg\n(that's you, hi)",
    "the world is better\nbecause you decided to show up today",
    "you are so deeply loved\nit's honestly kind of ridiculous",
    "i'm really glad you exist\nlike, cosmically grateful",
  ];

  var viewMain = document.getElementById("view-main");
  var viewAffirmation = document.getElementById("view-affirmation");
  var slider = document.getElementById("mood-slider");
  var affirmationText = document.getElementById("affirmation-text");
  var copyBtn = document.getElementById("copy-url-btn");
  var pickAnother = document.getElementById("pick-another");
  var toast = document.getElementById("toast");
  var eggSlots = document.querySelectorAll(".egg-slot");
  var eggs = document.querySelectorAll(".egg");
  var cartonLid = document.getElementById("carton-lid");

  var selectedEgg = null;
  var transitioning = false;

  // --- map slider value (0-100) to egg index (0-5) ---
  function sliderToEgg(value) {
    if (value <= 16) return 0;
    if (value <= 33) return 1;
    if (value <= 50) return 2;
    if (value <= 66) return 3;
    if (value <= 83) return 4;
    return 5;
  }

  // --- highlight the egg the slider points at ---
  function highlightEgg(eggIndex) {
    eggSlots.forEach(function (slot, i) {
      slot.classList.toggle("highlighted", i === eggIndex);
    });
  }

  // --- clear all egg states ---
  function clearEggs() {
    eggSlots.forEach(function (slot) {
      slot.classList.remove("selected", "highlighted");
    });
  }

  // --- reveal eggs with staggered pop-in ---
  function revealEggs() {
    eggs.forEach(function (egg) {
      egg.classList.add("egg-visible");
    });
  }

  // --- hide eggs (reset for re-entrance) ---
  function hideEggs() {
    eggs.forEach(function (egg) {
      egg.classList.remove("egg-visible");
    });
  }

  // --- select an egg: sparkle it, then transition to affirmation ---
  function selectEgg(eggIndex) {
    if (transitioning) return;
    transitioning = true;
    selectedEgg = eggIndex;
    clearEggs();
    eggSlots[eggIndex].classList.add("selected");

    // after sparkle plays, transition views
    setTimeout(function () {
      showAffirmation(eggIndex);
    }, 800);
  }

  // --- show the affirmation view (with smooth transition) ---
  function showAffirmation(eggIndex) {
    affirmationText.textContent = affirmations[eggIndex];

    // fade out main view
    viewMain.classList.add("fade-out");

    setTimeout(function () {
      viewMain.classList.add("hidden");
      viewMain.classList.remove("fade-out");

      // show + animate in affirmation view
      viewAffirmation.classList.remove("hidden");
      viewAffirmation.classList.add("entering");
      transitioning = false;
    }, 400);
  }

  // --- return to main view (smooth) ---
  function showMain() {
    transitioning = true;
    viewAffirmation.classList.add("fade-out");
    viewAffirmation.classList.remove("entering");

    setTimeout(function () {
      viewAffirmation.classList.add("hidden");
      viewAffirmation.classList.remove("fade-out");

      // reset main view state
      clearEggs();
      hideEggs();
      selectedEgg = null;
      slider.value = 50;
      cartonLid.classList.remove("open");

      // show main view
      viewMain.classList.remove("hidden");

      // re-trigger open animation
      setTimeout(function () {
        openCarton();
        highlightEgg(sliderToEgg(50));
        transitioning = false;
      }, 100);
    }, 400);
  }

  // --- slider events ---
  slider.addEventListener("input", function () {
    if (transitioning) return;
    var value = parseInt(this.value);
    highlightEgg(sliderToEgg(value));
  });

  slider.addEventListener("change", function () {
    if (transitioning) return;
    var value = parseInt(this.value);
    selectEgg(sliderToEgg(value));
  });

  // --- egg click to select ---
  eggSlots.forEach(function (slot) {
    slot.addEventListener("click", function () {
      if (transitioning) return;
      var eggIndex = parseInt(this.dataset.egg);
      slider.value = Math.round((eggIndex / 5) * 100);
      selectEgg(eggIndex);
    });
  });

  // --- copy URL ---
  copyBtn.addEventListener("click", function () {
    if (selectedEgg === null) return;

    var url = new URL(window.location.href);
    url.searchParams.set("egg", selectedEgg);

    navigator.clipboard.writeText(url.toString()).then(function () {
      toast.classList.add("visible");
      setTimeout(function () {
        toast.classList.remove("visible");
      }, 1500);
    });
  });

  // --- pick another ---
  pickAnother.addEventListener("click", function () {
    if (transitioning) return;
    showMain();
  });

  // --- carton open animation on load ---
  function openCarton() {
    setTimeout(function () {
      cartonLid.classList.add("open");
      // reveal eggs after lid starts opening
      setTimeout(function () {
        revealEggs();
      }, 300);
    }, 400);
  }

  // --- check URL param on load ---
  function checkUrlParam() {
    var params = new URLSearchParams(window.location.search);
    var eggParam = params.get("egg");

    if (eggParam !== null) {
      var eggIndex = parseInt(eggParam);
      if (eggIndex >= 0 && eggIndex <= 5) {
        selectedEgg = eggIndex;
        affirmationText.textContent = affirmations[eggIndex];
        viewMain.classList.add("hidden");
        viewAffirmation.classList.remove("hidden");
        viewAffirmation.classList.add("entering");
        return true;
      }
    }
    return false;
  }

  // --- init ---
  window.addEventListener("load", function () {
    var hasParam = checkUrlParam();
    if (!hasParam) {
      openCarton();
      highlightEgg(sliderToEgg(50));
    }
  });
})();
