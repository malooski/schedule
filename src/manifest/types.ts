export interface UserManifestEntry {
    title: string;

    time: string; // HH:MM
    date: string; // MM/DD
}

export interface UserManifest {
    timezone: string;
    entries: UserManifestEntry[];
}

export interface ManifestEntry {
    title: string;
    date: Date;
}

export interface Manifest {
    entries: ManifestEntry[];
}
