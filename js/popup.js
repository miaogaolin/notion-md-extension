
let submitBtn = document.getElementById("submitBtn")
let tokenInput = document.getElementById("token")
let editorInput = document.getElementById("editor")
let LocalData = {
  "token": "",
  "editor": ""
}
submitBtn.addEventListener("click", function() {
  let token = tokenInput.value
  let editor = editorInput.value

  LocalData = {
    token: token,
    editor, editor
  }
  setData(LocalData)
})


function init() {
  initData()
}
init()


function setData(data) {
  chrome.storage.sync.set({"data": data});
}

function initData() {
  chrome.storage.sync.get({
    "data": LocalData,
  }, function(res) {
    let data = res.data
    tokenInput.value = data.token
    editor.editor = data.editor
  });
}
