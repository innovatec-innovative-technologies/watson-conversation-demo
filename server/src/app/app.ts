
import * as express from "express";
import * as bodyParser from 'body-parser';
import { KommuneBotRouter } from "./routes/kommune-bot.router";
import { ServerConfig } from "../config/config";

/**
 * KommuneBotApplication
 *
 * @class KommuneBotApplication
 */
export class KommuneBotApplication {
    publicFolderPath: string;
    expressApp: express.Application;

    public init(publicFolderPath: string) {
        this.publicFolderPath = publicFolderPath;
        this.config(publicFolderPath);
        this.routes();
    }

    private config(publicFolderPath: string) {
        this.expressApp = express();
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(express.static(publicFolderPath));
    }

    private routes() {
        console.log(ServerConfig.LOG_PREFIX, "Configuring routes");
        let kommuneBotRouter = new KommuneBotRouter();
        this.expressApp.use("/", kommuneBotRouter.getRouter());

        console.log(ServerConfig.LOG_PREFIX, "Setup router to catch all other GET routes and return the index file thats built");
        this.expressApp.get("*", (req: express.Request, res: express.Response) => {
            res.sendFile(this.publicFolderPath + '/index.html');
        });
    }

    public getRequestListener(): express.Application {
        return this.expressApp;
    }
}