import { Sequelize } from "sequelize";
import User from "./models/user-sequelize-model";
import Role from "./models/role-sequelize";
import FcmToken from "./models/fcm-token-sequelize";
import Message from "./models/message-sequelize";

export default class Mysql {

    client: Sequelize
    host: string | undefined
    user: string | undefined
    db: string | undefined
    password: string | undefined
    port: string | undefined

    constructor() {
        this.host = process.env.MYSQLHOST
        this.user = process.env.MYSQLUSER
        this.db = process.env.MYSQLDB
        this.password = process.env.MYSQLPASSWORD
        this.port = process.env.MYSQLPORT
        this.client = new Sequelize(this.db!, this.user!, this.password, {
            host: this.host,
            port: Number(this.port),
            dialect: "mysql"
        })
    }

    auth = async (): Promise<void> => {
        await this.client.authenticate();
        console.log('Conexión a base de datos establecida.');
    }

    sync = async (): Promise<void> => {
        this.#associations()
        await this.client.sync({
            alter: false,
            force: false,
            logging: false
        })
        console.log('Conexión a base de datos establecida.');
    }

    #associations = (): void => {
        User.initTable(this.client)
        Role.initTable(this.client)
        FcmToken.initTable(this.client)
        Message.initTable(this.client)
        User.association()
    }
}