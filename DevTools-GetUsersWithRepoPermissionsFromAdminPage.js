[...($("#repository-access-table").getElementsByClassName("js-repo-access-entry"))]
    .map(entry => {
        let name = entry.getElementsByTagName("strong")[0].textContent;
        let email = entry.getElementsByTagName("a")[0].href;
        let access = entry.getElementsByClassName("js-select-repo-permission")[0].getElementsByTagName("summary")[0].getElementsByTagName("span")[1].textContent.trim();
        return `${name} (${email}) - ${access}`;
    })
    .join("\n")