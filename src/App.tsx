import { addWeeks, format, startOfDay } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MANIFEST } from "./manifest";

import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import classes from "./App.module.scss";
import { ManifestEntry } from "./manifest/types";
import { urlToCss } from "./util/dom";

import logoImg from "./assets/Logo.webp";

const TWITCH_URL = "https://twitch.tv/malooski";

function App() {
    const todayStart = startOfDay(new Date());

    const viewEnd = addWeeks(todayStart, 2);

    const entries = MANIFEST.entries.filter(
        entry => entry.date >= todayStart && entry.date < viewEnd
    );

    return (
        <div className={classes.root}>
            <img className={classes.logo} src={logoImg} alt="Malooski Logo" />

            <a
                title="Go to Malooski's Twitch"
                className={classes.twitchLink}
                href={TWITCH_URL}
                target="_blank"
                rel="noreferrer"
            >
                <FontAwesomeIcon icon={faTwitch} />
                <span>Twitch</span>
                <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>

            <h2>Schedule</h2>

            <div className={classes.scheduleList}>
                {entries.map(entry => (
                    <ScheduleEntry key={entry.key} entry={entry} />
                ))}
            </div>
        </div>
    );
}

interface ScheduleEntryProps {
    entry: ManifestEntry;
}

function ScheduleEntry(props: ScheduleEntryProps) {
    const { entry } = props;

    const bgImg = entry.bgImg != null ? urlToCss(entry.bgImg) : undefined;

    const dayOfWeek = format(entry.date, "EEE");
    const shortDate = format(entry.date, "MMM d");
    const timeOfDayFirst = format(entry.date, "h");
    const timeOfDaySecond = format(entry.date, "mm a");

    return (
        <>
            <div className={classes.day}>
                <div className={classes.shortDate}>{shortDate}</div>
                <div className={classes.dayOfWeek}>{dayOfWeek}</div>
            </div>

            <div className={classes.scheduleEntryImage} style={{ backgroundImage: bgImg }}>
                <span className={classes.entryTitle}>{entry.title}</span>
            </div>
            <div className={classes.time}>
                <div>
                    {timeOfDayFirst}
                    <span className={classes.colon}>:</span>
                    {timeOfDaySecond}
                </div>
            </div>
        </>
    );
}

export default App;
