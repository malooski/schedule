import { addMonths, addWeeks, formatDistanceToNow, startOfDay } from "date-fns";

import { MANIFEST } from "./manifest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./App.module.scss";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

const TWITCH_URL = "https://twitch.tv/malooski";

function App() {
    const todayStart = startOfDay(new Date());

    const weekLater = addWeeks(todayStart, 1);
    const monthLater = addMonths(todayStart, 1);

    const entries = MANIFEST.entries.filter(
        entry => entry.date >= todayStart && entry.date < weekLater
    );

    return (
        <div className={classes.root}>
            <h1>Schedule</h1>

            <a className={classes.twitchLink} href={TWITCH_URL} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitch} />
                <span>Malooski</span>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>

            <div className={classes.scheduleList}>
                {entries.map(entry => (
                    <>
                        <div className={classes.name}>{entry.title}</div>
                        <div className={classes.time}>{formatDistanceToNow(entry.date)}</div>
                    </>
                ))}
            </div>
        </div>
    );
}

export default App;
