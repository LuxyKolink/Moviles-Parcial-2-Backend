import Role from "../../../database/models/role-sequelize";
import User from "../../../database/models/user-sequelize-model";
import IUser from "../../interfaces/user-interface";

export default class UserModel {

    getById = async (id: number): Promise<IUser | null> => {
        try {
            if (id <= 0) {
                console.error('Id debe ser número positivo.');
                return null
            }

            const user = await User.findByPk(id, {
                attributes: ["id", "email", "photoUrl", "firstName", "lastName", "phoneNumber"],
                include: [{
                    model: Role,
                    as: 'role'
                }]
            })

            if (!user) {
                console.error(`No hay registro de persona con ID=${id}`);
                return null
            }
            return user
        } catch (error) {
            console.error(error);
        }
        return null
    }

    getByParam = async (param: string, value: string): Promise<IUser | null> => {
        try {

            if (!param || !value) {
                console.error('Parámetros y su valor son requeridos.');
                return null;
            }

            const allowedParams = ['id', 'email']; 
            if (!allowedParams.includes(param)) {
                console.error(`El parámetro ${param} no es válido.`);
                return null;
            }
            
            const user = await User.findOne({
                where: {
                    [param]: value
                }
            })

            if (!user) {
                console.error(`No hay registro de persona con ${param} =${value}`);
                return null
            }
            return user
        } catch (error) {
            console.error(error);
        }
        return null
    }

    getAll = async (page: number): Promise<IUser[]> => {
        try {
            const limit = Number(process.env.LIMIT)
            const offset = limit * (page - 1)
            const users = await User.findAll({
                attributes: [
                    "id", 
                    "email", 
                    "photoUrl", 
                    "firstName", 
                    "lastName", 
                    "phoneNumber", 
                    "roleId"
                ],
                limit: limit,
                offset: offset
            })
            console.log(users);
            
            return users
        } catch (error) {
            console.error(error);
        }
        return []
    }



    create = async (user: IUser): Promise<IUser | null> => {
        try {
            const newUser = await User.create({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                roleId: user.roleId
            })
            return newUser
        } catch (error) {
            console.error(error);
        }
        return null
    }

    save = async (user: IUser): Promise<IUser | null> => {
        try {
            const saveUser = await User.findByPk(user.id)

            if (!saveUser) {
                console.error('No se encontró el usuario en la base de datos.');
                return null
            }
            saveUser.refreshToken = user.refreshToken!
            await saveUser.save()
            return saveUser
        } catch (error) {
            console.error(error);
        }
        return null
    }

}