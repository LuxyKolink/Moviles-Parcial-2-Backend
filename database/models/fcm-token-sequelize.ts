import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user-sequelize-model";

export default class FcmToken extends Model {
    declare id: number
    declare token: string
    declare userEmail: string

    static initTable(sequelize: Sequelize) {
        FcmToken.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userEmail: {
                type: DataTypes.STRING,
                field: 'user_email',
                references: {
                    model: User,
                    key: 'email',
                }
            }
        }, {
            sequelize,
            tableName: "fcmtokens",
            timestamps: false,
        })
    }
}