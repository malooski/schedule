export interface ManifestEntryArgs {
    title: string;
    date: Date | number | string;
}

export class ManifestEntry {
    title: string;
    date: Date;

    constructor(args: ManifestEntryArgs) {
        this.title = args.title;
        this.date = new Date(args.date);
    }
}

export interface ManifestArgs {
    entries: ManifestEntry[];
}

export class Manifest {
    entries: ManifestEntry[];

    constructor(args: ManifestArgs) {
        this.entries = args.entries;
    }
}
