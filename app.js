(function () {
  const affirmations = [
    "you're literally the main character",
    "certified good egg",
    "10/10 would hatch again",
    "you are so deeply loved",
    "the world is better with you in it",
    "i'm really glad you exist",
  ];

  const slider = document.getElementById("mood-slider");
  const hallabong = document.getElementById("hallabong");
  const affirmationText = document.getElementById("affirmation-text");
  const shareBtn = document.getElementById("share-btn");
  const toast = document.getElementById("toast");
  const eggSlots = document.querySelectorAll(".egg-slot");

  let selectedEgg = null;

  // --- map slider value (0-100) to egg index (0-5) ---
  function sliderToEgg(value) {
    if (value <= 16) return 0;
    if (value <= 33) return 1;
    if (value <= 50) return 2;
    if (value <= 66) return 3;
    if (value <= 83) return 4;
    return 5;
  }

  // --- position hallabong over the target egg ---
  function moveHallabong(eggIndex) {
    var carton = document.getElementById("egg-carton");
    var slot = eggSlots[eggIndex];
    if (!carton || !slot) return;

    var slotRect = slot.getBoundingClientRect();
    var track = hallabong.parentElement;
    var trackRect = track.getBoundingClientRect();

    var slotCenterX = slotRect.left + slotRect.width / 2 - trackRect.left;
    hallabong.style.left = slotCenterX + "px";
  }

  // --- highlight the egg the slider points at ---
  function highlightEgg(eggIndex) {
    eggSlots.forEach(function (slot, i) {
      slot.classList.toggle("highlighted", i === eggIndex);
    });
  }

  // --- update hallabong's face based on slider position ---
  function updateHallabongFace(value) {
    if (value <= 33) {
      hallabong.src = "assets/characters/hallabong-laugh.png";
    } else if (value >= 66) {
      hallabong.src = "assets/characters/hallabong-blush.png";
    } else {
      hallabong.src = "assets/characters/hallabong.png";
    }
  }

  // --- select an egg: pop it, show affirmation, show share ---
  function selectEgg(eggIndex) {
    selectedEgg = eggIndex;

    eggSlots.forEach(function (slot, i) {
      slot.classList.remove("selected", "highlighted");
      if (i === eggIndex) slot.classList.add("selected");
    });

    // swap egg image to animation
    var eggImg = document.getElementById("egg-" + eggIndex);
    eggImg.src = "assets/animations/egg-" + eggIndex + ".gif";

    // show affirmation text
    affirmationText.textContent = affirmations[eggIndex];
    affirmationText.classList.add("visible");

    // show share button
    shareBtn.classList.add("visible");

    moveHallabong(eggIndex);
  }

  // --- reset selection ---
  function resetSelection() {
    selectedEgg = null;

    eggSlots.forEach(function (slot, i) {
      slot.classList.remove("selected");
      var eggImg = document.getElementById("egg-" + i);
      eggImg.src = "assets/characters/gyelan.png";
    });

    affirmationText.classList.remove("visible");
    shareBtn.classList.remove("visible");
  }

  // --- slider events ---
  slider.addEventListener("input", function () {
    var value = parseInt(this.value);
    var eggIndex = sliderToEgg(value);

    updateHallabongFace(value);
    highlightEgg(eggIndex);
    moveHallabong(eggIndex);

    if (selectedEgg !== null && selectedEgg !== eggIndex) {
      resetSelection();
      highlightEgg(eggIndex);
    }
  });

  slider.addEventListener("change", function () {
    var value = parseInt(this.value);
    var eggIndex = sliderToEgg(value);
    selectEgg(eggIndex);
  });

  // --- egg click to select ---
  eggSlots.forEach(function (slot) {
    slot.addEventListener("click", function () {
      var eggIndex = parseInt(this.dataset.egg);
      var sliderValue = Math.round((eggIndex / 5) * 100);
      slider.value = sliderValue;
      updateHallabongFace(sliderValue);
      selectEgg(eggIndex);
    });
  });

  // --- share button ---
  shareBtn.addEventListener("click", function () {
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

  // --- check URL param on load ---
  function checkUrlParam() {
    var params = new URLSearchParams(window.location.search);
    var eggParam = params.get("egg");

    if (eggParam !== null) {
      var eggIndex = parseInt(eggParam);
      if (eggIndex >= 0 && eggIndex <= 5) {
        var sliderValue = Math.round((eggIndex / 5) * 100);
        slider.value = sliderValue;
        updateHallabongFace(sliderValue);

        setTimeout(function () {
          selectEgg(eggIndex);
        }, 300);
      }
    }
  }

  // --- initial positioning after layout ---
  window.addEventListener("load", function () {
    var value = parseInt(slider.value);
    var eggIndex = sliderToEgg(value);
    moveHallabong(eggIndex);
    highlightEgg(eggIndex);
    checkUrlParam();
  });

  window.addEventListener("resize", function () {
    if (selectedEgg !== null) {
      moveHallabong(selectedEgg);
    } else {
      var value = parseInt(slider.value);
      moveHallabong(sliderToEgg(value));
    }
  });
})();
