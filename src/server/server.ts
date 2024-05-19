import express, { Application } from "express";
import Router from "./router/routes";
import Mysql from "../../database/mysql.db";
// import AuthMiddleware from "../middleware/auth-middleware";

export default class Server {

    #application: Application
    // #middleware: AuthMiddleware

    constructor(
        private readonly router: Router
    ) {
        this.#application = express()
        // this.#middleware = new AuthMiddleware()
        this.#config()
        this.#routes()
    }

    #config = (): void => {
        this.#application.use(express.urlencoded({ extended: true }))
        this.#application.use(express.json())
    }

    #routes = (): void => {
        this.#application.use('/', this.router.router)
        // this.#application.use(this.#middleware.verifyJWT)
        this.#application.use('*', this.router.router)
    }

    start = async (): Promise<void> => {
        const bd = new Mysql();
        try {
            await bd.sync()
            const port = process.env.PORT
            this.#application.listen(port, () => {
                const host = process.env.HOST
                console.info(`Servidor corriendo en http://${host}:${port}/`)
            })
        } catch (error) {
            console.error('No se pudo conectar a Mysql:', error);
        }

    }

}