import AuthController from "./app/controller/auth-app-controller"
import FileController from "./app/controller/file-app-controller"
import MessageController from "./app/controller/message-app-controller"
import UserController from "./app/controller/user-app-controller"
import UserModel from "./app/model/user-app-model"
import Router from "./server/router/routes"
import Server from "./server/server"

const userModel = new UserModel()

const userController = new UserController(userModel)
const authController = new AuthController(userModel)
const fileController = new FileController()
const messageController = new MessageController()

const router = new Router(userController, authController, fileController, messageController)
const server = new Server(router)
server.start()