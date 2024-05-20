// models/Message.ts
import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user-sequelize-model";

export default class Message extends Model {
    declare id: number;
    declare title: string;
    declare body: string;
    declare senderEmail: string;
    declare recipientEmail: string;
    declare recipientToken: string;
    declare pushResult: string;

    static initTable(sequelize: Sequelize) {
        Message.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            body: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            senderEmail: {
                type: DataTypes.STRING,
                references: {
                    model: User,
                    key: 'email',
                },
            },
            recipientEmail: {
                type: DataTypes.STRING,
                references: {
                    model: User,
                    key: 'email',
                },
            },
            recipientToken: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pushResult: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "messages",
            timestamps: false,
        });
    }
}
