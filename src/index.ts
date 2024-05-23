import AuthController from "./app/controller/auth-app-controller"
import FileController from "./app/controller/file-app-controller"
import MessageController from "./app/controller/message-app-controller"
import UserController from "./app/controller/user-app-controller"
import FcmTokenModel from "./app/model/fcm-token-app-model"
import MessageModel from "./app/model/message-app-model"
import UserModel from "./app/model/user-app-model"
import Router from "./server/router/routes"
import Server from "./server/server"

const userModel = new UserModel()
const fcmTokenModel = new FcmTokenModel()
const messageModel = new MessageModel()

const fileController = new FileController()
const userController = new UserController(userModel)
const authController = new AuthController(userModel, fcmTokenModel)
const messageController = new MessageController(userModel, fcmTokenModel, messageModel)

const router = new Router(userController, authController, fileController, messageController)
const server = new Server(router)
server.start()