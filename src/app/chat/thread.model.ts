export class Thread {
    id: string;
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
    members: Object;
}
