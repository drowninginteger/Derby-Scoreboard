
/**
 * Convert seconds to time string (hh:mm).
 *
 * @param duration seconds
 *
 * @return String
 */
module.exports.secondsToTimeString = (duration) => {
    duration = (duration * 1000); // Convert seconds to ms

    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}
