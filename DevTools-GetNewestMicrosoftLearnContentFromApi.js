// Prereq: load luxon.js from a Chrome dev tool snippet

var learnApiResult;
fetch("https://docs.microsoft.com/api/learn/catalog/?clientId=learn-content-social").then(response => response.json()).then(data => { learnApiResult = data; console.log(data) });

// Get 10 newest learning paths
learnApiResult.learningPaths.filter(path => path.uid.indexOf("dynamics") === -1 && path.uid.indexOf("wwl") === -1 && path.uid.indexOf("m365") === -1 && path.uid.indexOf("bizapps") === -1 && path.uid.indexOf("student-evangelism") === -1).sort((pathA, pathB) => luxon.DateTime.fromISO(pathB.last_modified) - luxon.DateTime.fromISO(pathA.last_modified)).slice(0, 10).map(path => { let {uid, title, last_modified} = path; return { uid, title, last_modified }; }).map(path => `${path.title} (${path.uid}, ${path.last_modified})`);

// Get 10 newest modules
learnApiResult.modules.filter(module => module.uid.indexOf("dynamics") === -1 && module.uid.indexOf("wwl") === -1 && module.uid.indexOf("m365") === -1 && module.uid.indexOf("bizapps") === -1 && module.uid.indexOf("student-evangelism") === -1).sort((moduleA, moduleB) => luxon.DateTime.fromISO(moduleB.last_modified) - luxon.DateTime.fromISO(moduleA.last_modified)).slice(0, 10).map(module => { let {uid, title, last_modified} = module; return { uid, title, last_modified }; }).map(module => `${module.title} (${module.uid}, ${module.last_modified})`);
