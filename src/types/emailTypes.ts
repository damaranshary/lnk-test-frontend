export interface Email {
    _id: string;
    sender: string;
    recipient: string;
    subject: string;
    description: string;
    timestamp: string;
}

export interface EmailSchema {
    recipient: string;
    subject: string;
    description: string;
}

export interface SendEmailRequest {
    recipient: string;
    subject: string;
    description: string;
}

export interface GetEmailsResponse {
    status: string;
    data: Email[];
    message: string;
}

