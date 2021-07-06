 export interface Message {
    id: number;
    dateSent: Date;
    content: string;
    dateRead?: Date;
    senderId: number;
    recipientId: number;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientUserName: string;
    recipientPhotoUrl: string;
}