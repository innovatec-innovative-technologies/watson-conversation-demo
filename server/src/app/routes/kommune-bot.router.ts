import * as path from "path"; // normalize the paths : http://stackoverflow.com/questions/9756567/do-you-need-to-use-path-join-in-node-js
import * as express from 'express';
import { ConversationRouter } from "./conversation/conversation";
import { ServerConfig } from "../../config/config";

export class KommuneBotRouter {
    private router: express.Router;

    constructor() {
        this.configRoutes();
    }

    private configRoutes() {
        console.log(ServerConfig.LOG_PREFIX, "Creating router for base paths");
        this.router = express.Router();

        console.log(ServerConfig.LOG_PREFIX, "Setting up conversation api routes");
        let conversationApiRouter = new ConversationRouter();
        this.router.use('/api/conversation', conversationApiRouter.getRouter());
    }

    public getRouter(): express.Router {
        return this.router;
    }
}

