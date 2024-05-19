import ArticleController from "./app/controller/articles-app-controller"
import AuthController from "./app/controller/auth-app-controller"
import UserController from "./app/controller/user-app-controller"
import UserModel from "./app/model/user-app-model"
import AuthMiddleware from "./middleware/auth-middleware"
import Router from "./server/router/routes"
import Server from "./server/server"

const userModel = new UserModel()
const userController = new UserController(userModel)
const authController = new AuthController(userModel)

const articleController = new ArticleController()
const authMiddleware = new AuthMiddleware()

const router = new Router(userController, authController, articleController ,authMiddleware)
const server = new Server(router)
server.start()