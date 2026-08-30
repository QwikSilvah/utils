function getAge(dateTimeString, options = {}) {
    /*
    options
    length: String to determine if short output format; accepts short, default undefined
    short: Boolean to determine if short output format; default false
    adverb: Boolean to determine if to add "ago"; default true
    */

    const dateTime = new Date(dateTimeString);

    const short = options.length === "short" || options.short === true;
    const adverb = options.adverb === false ? "" : " ago";

    function quotient(a, b) {
      return Math.floor(a / b);
    }

    let currentDateTime = Date.parse(new Date());
    //console.log(currentDateTime);
    let actualDateTime = dateTime;
    let difference = currentDateTime - actualDateTime;
    let seconds = difference / 1000;
    const sSeconds = 60;
    const sMinutes = 60 * 60;
    const sHours = 24 * 60 * 60; //display upto 48 hours
    const sDays = 7 * 24 * 60 * 60;
    const sWeeks = 52.143 * 7 * 24 * 60 * 60;
    const sYears = 365 * 24 * 60 * 60;

    //let output = "";

    function calculateAge(unit, suffix) {
      function appendSuffix(suffix) {
        return short ? suffix[0] : " " + suffix;
      }

      function pluralize() {
        //console.log(!short && age === 1);
        return short || age === 1 ? "" : "s";
      }

      function appendAdverb() {
        return adverb ? " ago" : "";
      }

      let age = quotient(seconds, unit);
      return (age += appendSuffix(suffix) + pluralize() + appendAdverb());
    }

    switch (true) {
      case seconds < sSeconds:
        return short ? "new" : "Just now";
        break;
      case seconds < sMinutes:
        return calculateAge(sSeconds, "minute");
        break;
      case seconds < sHours:
        return calculateAge(sMinutes, "hour");
        break;
      //case seconds
      case seconds < sDays:
        //return `${quotient(seconds, 24 * 60 * 60)} days ${appendAdverb}`;
        return calculateAge(sHours, "day");
        break;
      case seconds < sWeeks:
        return calculateAge(sDays, "week");
        break;
      case seconds > sYears:
        return calculateAge(sYears, "year");
        break;
      default:
        return new Date(actualDateTime).toDateString();
    }
}

if (typeof(module) !== "undefined" && module.exports) {
    module.exports = {        
        age
    }
}