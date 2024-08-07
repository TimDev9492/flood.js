import { Telnet } from 'telnet-client'

class TorControl {
    client;

    constructor() {
        this.client = new Telnet();
    }

    async connect({
        host, port, password
    }) {
        try {
            await this.client.connect({ host, port, disableLogon: true });
        } catch (error) {
            throw new Error(`Failed to connect to Tor Control port: ${error}`);
        }
        await execAndThrowError(
            this.client.exec(`AUTHENTICATE "${password}"`),
            (error) => `Failed to authenticate: ${error}`
        );
    }

    async getNewIdentity() {
        await execAndThrowError(
            this.client.exec('SIGNAL NEWNYM'),
            (error) => `Failed to get new identity: ${error}`
        );
    }
}

async function execAndThrowError(func: Promise<string>, errorMessage: (error: string) => string) {
    const result = await func;
    if (result !== '250 OK') {
        throw new Error(errorMessage(result));
    }
}

export default TorControl;
