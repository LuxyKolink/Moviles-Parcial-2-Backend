export default interface IMessage {
    id?: number;
    title: string;
    body: string;
    senderEmail: string;
    recipientEmail: string;
    recipientToken: string;
    pushResult: string;
}