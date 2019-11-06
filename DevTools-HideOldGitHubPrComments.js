let botNamePrefixes = [
    "opbld",
    "PRMerger",
    "acrolinxatmsft"
];
if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function (keyDefiner) {
        return this.reduce(function(store, item) {
            var key = keyDefiner(item);
            var value = store[key] || [];
            store[key] = value.concat([item]);
            return store;
        }, {})
    };
}
// var testArray = [
//     {name: "asdf1", key: 1},
//     {name: "asdf2", key: 2},
//     {name: "sdf3", key: 3},
//     {name: "sdf1", key: 1},
//     {name: "asdf3", key: 3},
// ]
// var testArrayGroups = testArray.groupBy((testArrayItem) => testArrayItem.name.substring(testArrayItem.name, 2));
// console.log(testArrayGroups);

var groupedItemsToProcess = [...document.querySelectorAll(".js-comment-hide-button")] // find all the hide buttons (auto-excludes initial PR "comment" that is also a .TimelineItem element)
    .map((button) => { // Get the nearest timeline item
        var timelineItem = button.closest(".js-timeline-item");
        return {
            timelineItem: timelineItem,
            commentHideButton: button,
            foundAuthorPrefix: (() => {
                console.log([...timelineItem.getElementsByClassName("Details-content--closed")].some(element => element => element.offsetWidth > 0 && element.offsetHeight > 0));

                if ([...timelineItem.getElementsByClassName("Details-content--closed")].some(element => element => element.offsetWidth > 0 && element.offsetHeight > 0)) {
                    // TODO: get this working
                    // Already showing minimized message: return null to filter later
                    return null;
                }
                let author = timelineItem.getElementsByClassName("author")[0].innerText;
                let foundBotNamePrefix = botNamePrefixes.find(botNamePrefix => author.startsWith(botNamePrefix));
                if (!foundBotNamePrefix) {
                    // Not a bot prefix author: return null to filter later
                    return null;
                }
                return foundBotNamePrefix;
            })(),
            itemDate: (() => {
                return Date.parse(timelineItem.getElementsByClassName("js-timestamp")[0].getElementsByTagName("relative-time")[0].getAttribute("datetime"));
            })()
        };
    })
    .filter((historyItem) => historyItem.foundAuthorPrefix !== null)
    .groupBy((historyItem) => historyItem.foundAuthorPrefix);
console.log(groupedItemsToProcess);
for (var itemGroup in groupedItemsToProcess) {
    if (groupedItemsToProcess.hasOwnProperty(itemGroup)) {
        // console.log(groupedItemsToProcess[itemGroup]);
        let sortedItemsWithoutNewest = [...groupedItemsToProcess[itemGroup]].sort(function (a, b) { a.itemDate - b.itemDate }).slice(0, -1);
        console.log(sortedItemsWithoutNewest);
        sortedItemsWithoutNewest.forEach(x => x.timelineItem.style.border = "1px solid red");
    }
}
    // .forEach((timelineItemAndHideButton) => {
    //     // timelineItemAndHideButton.commentHideButton.click();
    //     console.log(timelineItemAndHideButton);
    // });