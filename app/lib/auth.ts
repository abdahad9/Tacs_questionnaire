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
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCq+6k89XYGkCgB\nnhKOGotqC3jv3QFM//3st8J5rEkZH8zVuvjTcbWg0AQBE9SVJjLjQmpR60QmU7yh\nCx7r6+kYJ+39Wjj0nSLTaxYUSrFU97S914MSB5ldNc6LClnlktts5Sm4pMPZ2UqR\nJ3mLCplI+MfIM9RYMtGfmuVAc8cOyk68L7SP5VkEGCtOwFvMz9dxWwRImS4cLck7\niu4ZsJKkZ1duZhXlPxpWWyQF/P2VH72U0spAc5vU3yhMp5pZgiYqZnimEqBcnXMa\njX9SrCcH7Nrt90Dncq/T0z7STZC73SiQr3K6BmNEvoPP2z6ur5dYep/fzs40XgC0\nsED/KRHhAgMBAAECggEAAbLahCbvy1IQelmiwg4nSer/bSnzKsZqnvjWt1o751e+\nniCg0GBIvLusT9gYVyX9a0QRkIBHmaDggXITQSaYwXsYvRkHHVOtUPqMn4V8HFsR\n94aGAGkaaoe6ZlJjQRRegTGyon634mNrVKSsK100LM/Uk5uDix/FdNzh/6wBc4G7\nUrbO0EVxSx0szJM8Pfw1YGZSNW4A1N07hOxVuGUp6+v5ysRX1sH8x/tx3jmpR+PC\nw7NO6PVgCoQu9d0orqRTSPAAVvqiNDzPR19v22jNiOdiWcqMk7BssN3PMkgvyXAC\ni5raA47zYbD3eNU2SDUcsIAm3RsyuC+Wxmxbq0hSwQKBgQDwozTFjBcGwRASPD2g\ny9PcCGTxJ6eO9tLtGVOTC4V/niZbSR9y0ug6RaomjQcyANdC10ZV+Gw9x6/bNuxc\nLSlfhbX5ePNS8Wlo2kgTCV3QRb5sjA5Wx3IHX7b4vhZabauV1Jtf5WpMwUnQ81+0\nLBOCK8Re1riQevvOj3c+uqd5UQKBgQC15hN25Y+ENSa8R3rGUdZSp+Rv0ra8p5MA\nPvn+iERPgmlVgEd65MwpcKOuNeB2Vcg9Fxofky4QZ/02EIpOJJxu/U6U4AB2lzPW\nRzLBHLbZ7/y5N2LjaaCBJq88o6UuIXMk/UHuj68mBX9yfVLVWK2ex6ik3rqhcZIM\nqAmPbvDrkQKBgDiiMIlNrx2n0mB4TQjK79GZKCiZbJX5AStMCp9Q1tpyHhTd4Mjl\nWkJcou7vwgHCsObKQ4N4NAFWPc0Z4AbRmishDPLpxFqA9o320X+pdKrPv0FMtRM3\nXV7e5/Eiy5/8r6VTpD2tgJcP5o+Gt79voCfCpTSs1EMsrpaurSHWTBQBAoGBAJpa\nw/en87JP3C/3RCMYfROk7v9JQtIyLVcPGds5TSZfVv08HuwVTX543BzQEUq5nnLg\nsMVMgtFfPQrs3EBVZv30LAO/VgVMZ6uUvWgL8spbkQynCF5MWuxdpGSDxX6w2eHw\nm0tSWGGeVrkTyf/LAYH0kZJegubO1g2xZnN1xDFRAoGAZoYHwefk8D/IgluxajCE\nyBcsKqcaAJ0eyYecmjiXLlX8qpzU3EXW7bCyurH+CXXjlbJNk+Xxqss+fhC7SBdb\nyYgUIX5rwBrUhN1SPx5VQjxVNQg1uwXwvxuqqhgVBhyK6vM6CiPn7quBg2KgoYYU\nvvfnDy3lfMPnL3G30ugD9EQ=\n-----END PRIVATE KEY-----\n",
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
