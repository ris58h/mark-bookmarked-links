chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if ((msg.from === 'content') && (msg.subject === 'link')) {
    chrome.bookmarks.search({url: msg.url}, function(bookmarks) {
      var isBookmark = bookmarks.length > 0 && msg.url === bookmarks[0].url;
      sendResponse({isBookmark: isBookmark});
    });
    return true;
  }
});