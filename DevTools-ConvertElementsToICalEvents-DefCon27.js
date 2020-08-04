// [...document.getElementsByClassName("talk")].map(x => x.id);
// [].slice.call(document.getElementsByClassName("talk")).map(x => x.id);
// Array.prototype.map.call(document.getElementsByClassName("talk"), x => x.id);

var defCon27iCalEvents = [...document.getElementsByClassName("talk")].map(article => {
    const sessionId = article.id;
    const detailsTextLines = (article.getElementsByClassName("details").item(0) || { textContent: "" }).textContent.split("\n").map(line => line.trim());
    // Format: [ "{DayName} at {StartTimePT} in {Location}", "{DurationDescription} | {Categories...}"]
    const { dayName, startTimePT, location, durationMinutes } = { dayName: detailsTextLines[0].substring(0, detailsTextLines[0].indexOf(" at ")), startTimePT: detailsTextLines[0].substring(detailsTextLines[0].indexOf(" at ") + " at ".length, detailsTextLines[0].indexOf(" in ")), location: detailsTextLines[0].substring(detailsTextLines[0].indexOf(" in ") + " in ".length), durationMinutes: parseInt(detailsTextLines[1].substring(0, (detailsTextLines[1].indexOf(" | ") > 0 ? detailsTextLines[1].indexOf(" | ") : detailsTextLines[1].length)).split(" minutes")[0], 10) }; // Had to complicate duration since some of them didn't have a " | " to split for tools.
    // Convert day name to day of month in August 2019.
    const startDayNameConverter = (startDayName => (startDayName === "Thursday" ? 8 : (startDayName === "Friday" ? 9 : (startDayName === "Saturday" ? 10 : (startDayName === "Sunday" ? 11 : -1)))));
    const { startTimePTHours, startTimePTMinutes } = { startTimePTHours: startTimePT.split(":")[0], startTimePTMinutes: startTimePT.split(":")[1] };
    // Creating date in current time zone (which may not match Vegas), but iCal output will be set up to consider date string as UTC-7 for Vegas in August 2019.
    const startPT = new Date(2019, 8 - 1 /* 0-index August */, startDayNameConverter(dayName), startTimePTHours, startTimePTMinutes);
    // const endPT = new Date(startPT.getTime() + durationMinutes * 60000);
    const title = (article.getElementsByClassName("talkTitle").item(0) || { textContent: "" }).textContent;
    const speaker = (article.getElementsByClassName("speaker").item(0) || { textContent: "" }).textContent; // TODO: Use .speakerTitle child element.
    const abstract = (article.getElementsByClassName("abstract").item(0) || { textContent: "" }).textContent;
    const speakerBio = (article.getElementsByClassName("speakerBio").item(0) || { textContent: "" }).textContent;
    return {
        id: sessionId,
        link: `https://defcon.org/html/defcon-27/dc-27-speakers.html#${sessionId}`,
        title,
        startPT,
        // endPT,
        location,
        speaker,
        speakerBio,
        abstract,
        durationMinutes,
        // startDayName: dayName,
        // startTimePT,
    };
}).map(session => {
    const descriptionWithEscapedLineBreaks = (session.link + "\n\n" + session.abstract).replace(/(?:\r\n|\r|\n)/g, '\\n');
    const now = new Date();
    return `BEGIN:VEVENT\n`
        + `UID:defcon27-${session.id}@defcon.org\n` // Assumes HTML ID is unique (which it should be, but HTML isn't going to enforce that anywhere)
        + `DTSTAMP:${now.getUTCFullYear()}${("0" + (now.getUTCMonth() + 1)).slice(-2)}${("0" + now.getUTCDate()).slice(-2)}T${("0" + now.getUTCHours()).slice(-2)}${("0" + now.getUTCMinutes()).slice(-2)}00Z\n` // yyyyMMddThhmmssZ (this one is UTC); also left-padding 0 as needed
        + `DTSTART;TZID=America/Los_Angeles:${session.startPT.getFullYear()}${("0" + (session.startPT.getMonth() + 1)).slice(-2)}${("0" + session.startPT.getDate()).slice(-2)}T${("0" + session.startPT.getHours()).slice(-2)}${("0" + session.startPT.getMinutes()).slice(-2)}00\n` // yyyyMMddThhmmss (no terminal "Z" for TZID); also left-padding 0 as needed
        + `DURATION:PT${session.durationMinutes}M\n`
        + `SUMMARY:${session.title} (${session.speaker})\n`
        + `DESCRIPTION:${descriptionWithEscapedLineBreaks}\n`
        + `LOCATION:${session.location}\n`
        + `SEQUENCE:0\n`
        + `END:VEVENT`;
})/*[0]*/;

console.log(
    "BEGIN:VCALENDAR\n"
    + "VERSION:2.0\n"
    + "METHOD:PUBLISH\n"
    + "X-WR-CALNAME:DEF CON 27\n"
    + "PRODID:patridgedev\n"
    + defCon27iCalEvents.join("\n") + "\n"
    + "END:VCALENDAR\n"
);
