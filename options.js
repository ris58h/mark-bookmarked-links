function saveOptions(e) {
  e.preventDefault();
  chrome.storage.sync.set({
    mark_style: document.querySelector("#mark_style").value
  });
}

function restoreOptions() {
  var defaultStyle = "background-color: gray;\nopacity: 0.5;";
  function setCurrentChoice(result) {
    var style = defaultStyle;
    if (result != null && result.mark_style != null) {
        style = result.mark_style;
    }
    document.querySelector("#mark_style").value = style;
  }

  chrome.storage.sync.get("mark_style", setCurrentChoice);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
