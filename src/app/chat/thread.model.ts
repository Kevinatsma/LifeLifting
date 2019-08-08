export class Thread {
    id: string;
    read: boolean;
    creator: {
        creatorUID: string,
        creatorName: string,
        creatorPhoto: string
    };
    target: {
        targetName: string,
        targetPhoto: string,
        targetUID: string
    };
    lastMessage: string;
    lastUpdated: Date;
    unreadMessages: number;
    lastSenderId: string;
    members: Array<string>;
}
