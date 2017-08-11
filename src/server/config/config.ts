declare function require(path: string): any; // workaround since at the moment of development there were no typings package for cfenv
var cfenv = require('cfenv');

export class ServerConfig {
    private static appEnv: any; 
    private static getAppEnv() {
        if (!this.appEnv) {
            this.appEnv = cfenv.getAppEnv();
        }
        return this.appEnv;
    }

    /**
     * Log
     */
    static LOG_PREFIX: string = 'SERVER:';
    static PORT: number = ServerConfig.getAppEnv().port;
    static URL: string = ServerConfig.getAppEnv().url;


    /**
     * Conversation API
     */
    static CONVERSATION_API_WORKSPACE_ID: string = process.env.CONVERSATION_WORKSPACE_ID;
    static CONVERSATION_API_USERNAME: string = process.env.CONVERSATION_USERNAME;
    static CONVERSATION_API_PASSWORD: string = process.env.CONVERSATION_PASSWORD; 
} 