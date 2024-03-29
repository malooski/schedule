export interface ManifestEntryArgs {
    title: string;
    date: Date | number | string;
    bgImg?: string;
}

export class ManifestEntry {
    title: string;
    date: Date;
    bgImg?: string;

    constructor(args: ManifestEntryArgs) {
        this.title = args.title;
        this.date = new Date(args.date);
        this.bgImg = args.bgImg;
    }

    get key(): string {
        return `${this.title}-${this.date.valueOf()}`;
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
