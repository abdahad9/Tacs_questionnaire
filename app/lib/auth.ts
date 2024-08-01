import { google, drive_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Define the interface for Google credentials
interface GoogleCredentials {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
}

// Define the return type of the authenticate function
interface AuthenticateResponse {
    client: OAuth2Client | null;
    details?: {
        error: string;
        stack?: string;
    };
}

const authenticate = async (): Promise<AuthenticateResponse> => {
    try {
        const keys: GoogleCredentials = {
            type: process.env.GOOGLE_TYPE!,
            project_id: process.env.GOOGLE_PROJECT_ID!,
            private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID!,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')!,
            client_email: process.env.GOOGLE_CLIENT_EMAIL!,
            client_id: process.env.GOOGLE_CLIENT_ID!,
            auth_uri: process.env.GOOGLE_AUTH_URI!,
            token_uri: process.env.GOOGLE_TOKEN_URI!,
            auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL!,
            client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL!,
        };

        const auth = new google.auth.GoogleAuth({
            credentials: keys,
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        const client = await auth.getClient() as OAuth2Client;
        return { client };
    } catch (error) {
        return { client: null, details: { error: (error as Error).message, stack: (error as Error).stack } };
    }
};

export default authenticate;
