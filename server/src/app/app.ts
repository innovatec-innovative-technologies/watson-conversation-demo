
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
    expressApp: express.Application;


    public config(pathToClient: string) {

        console.log(ServerConfig.LOG_PREFIX, "Creating express application");
        this.expressApp = express();
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(express.static(pathToClient));

        console.log(ServerConfig.LOG_PREFIX, "Configuring routes");
        let kommuneBotRouter = new KommuneBotRouter();
        this.expressApp.use("/", kommuneBotRouter.getRouter());
        this.expressApp.get("*", (req: express.Request, res: express.Response) => {
            res.sendFile(pathToClient + '/index.html');
        });
    }

    public getExpressApplication(): express.Application {
        return this.expressApp;
    }
}