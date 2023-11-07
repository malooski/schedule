import { addWeeks, format, startOfDay } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MANIFEST } from "./manifest";

import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import classes from "./App.module.scss";
import { ManifestEntry } from "./manifest/types";
import { urlToCss } from "./util/dom";

import logoImg from "./assets/Logo.webp";
import { useIntervalState } from "./util/react";

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

const SEC_TO_MS = 1000;
const MIN_TO_MS = SEC_TO_MS * 60;
const HOUR_TO_MS = MIN_TO_MS * 60;
const DAY_TO_MS = HOUR_TO_MS * 24;

function ScheduleEntry(props: ScheduleEntryProps) {
    const { entry } = props;

    const bgImg = entry.bgImg != null ? urlToCss(entry.bgImg) : undefined;

    const dayOfWeek = format(entry.date, "EEE");
    const shortDate = format(entry.date, "MMM d");
    const timeOfDayFirst = format(entry.date, "h");
    const timeOfDaySecond = format(entry.date, "mm a");

    const tMinusText = useIntervalState(() => tMinus(entry.date), 100);

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
                <div>
                    <span className={classes.tMinus}>{tMinusText}</span>
                </div>
            </div>
        </>
    );
}

function tMinus(date: Date) {
    const d = Date.now() - date.valueOf();
    let absD = Math.abs(d);

    const days = Math.floor(absD / DAY_TO_MS);
    absD -= days * DAY_TO_MS;
    const hours = Math.floor(absD / HOUR_TO_MS);
    absD -= hours * HOUR_TO_MS;
    const minutes = Math.floor(absD / MIN_TO_MS);
    absD -= minutes * MIN_TO_MS;
    const seconds = Math.floor(absD / SEC_TO_MS);
    absD -= seconds * SEC_TO_MS;

    const s = [days, hours, minutes, seconds].map(v => v.toString().padStart(2, "0")).join(":");
    if (d > 0) {
        return `T+${s}`;
    } else {
        return `T-${s}`;
    }
}

export default App;
