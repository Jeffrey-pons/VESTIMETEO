export interface IManagementError {
    statusCode: number;
    message: string;
}

export class ManagementError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ManagementError';
    }
}

