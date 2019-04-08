export class Thread {
    id: string;
    read: boolean;
    creator: {
        creatorID: string,
        creatorName: string,
        creatorPhoto: string
    };
    target: {
        targetName: string,
        targetPhoto: string
    };
    lastMessage: string;
    lastUpdated: string;
    members: Object;
}
