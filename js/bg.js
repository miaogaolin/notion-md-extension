function alert(text) {
    chrome.notifications.create(
        'notify_alert1', // notifyId
        {type: "basic", iconUrl: "../img/icon.png", title: "NotionMD", message: text}
    );
}
function ToEditor(info, tab) {
    let pageUrl = info.pageUrl;

    if (/notion\.so/.test(pageUrl) == false) {
        alert("Only supports notion.so")
        return
    }

    chrome.storage.sync.get(["data"], function(res) {
        data = res.data;
        if (!data.editor) {
            alert("Please set editor.")
            return
        }
    
        if (!data.token) {
            alert("Please set Notion Token.")
            return
        }
    
        let ids = pageUrl.match(/[A-Za-z0-9]{32}/g)
        if (ids.length < 1) {
            alert("URL Error")
            return
        }
        id = ids[0]
        if (pageUrl.indexOf("?p=") != -1){
            id = ids[1]
        }
        let reqUrl = data.editor + "?ref=notion&auth="+data.token+"&page_id="+id;
        chrome.tabs.create({ url: reqUrl });
    });

}

chrome.contextMenus.create({
    type: 'normal',
    title: 'Notion To Markdown',
    id: 'ntd',
    contexts: ['all']
}, function () {
    console.log('contextMenus are create.');
});

chrome.contextMenus.onClicked.addListener(ToEditor);