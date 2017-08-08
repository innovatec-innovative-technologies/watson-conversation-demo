import * as express from "express";
import * as http from "http";
import { ServerConfig } from "./config/config";
import { KommuneBotApplication } from "./app/app";
import { ErrorUtils } from "./app/utils/error-utils";

export class KommuneBotServer {
    private kommuneBotApp: KommuneBotApplication;
    private httpServer: http.Server;

    /**
     * 
     * @param publicFolderPath folder in which the public files (client) is located
     */
    public init(publicFolderPath: string) {
        console.log(ServerConfig.LOG_PREFIX, "Creating kommune bot server application");
        this.kommuneBotApp = new KommuneBotApplication();
        this.kommuneBotApp.init(publicFolderPath);

        console.log(ServerConfig.LOG_PREFIX, "Creating http server");
        let requestListener: any = this.kommuneBotApp.getRequestListener();
        this.httpServer = http.createServer(requestListener);

        console.log(ServerConfig.LOG_PREFIX, "Add error handler");
        this.httpServer.on("error", ErrorUtils.onError);
    }

    /**
     * Start listening to incoming requests
     */
    public start() {
        console.log(ServerConfig.LOG_PREFIX, "Set which port the http server will to listen to, and start listening.");
        this.httpServer.listen(ServerConfig.PORT, () => {
            console.log(ServerConfig.LOG_PREFIX, "server starting on " + ServerConfig.URL);
        });
    }
}