[...($("#repository-access-table").getElementsByClassName("js-repo-access-entry"))].map(entry => `${entry.getElementsByTagName("strong")[0].textContent} (${entry.getElementsByTagName("a")[0].href}) - ${entry.getElementsByClassName("js-select-repo-permission")[0].getElementsByTagName("summary")[0].getElementsByTagName("span")[1].textContent.trim()}`).join("\n")