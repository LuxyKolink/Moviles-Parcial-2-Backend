import { Router } from "express";
import UserController from "../../app/controller/user-app-controller";
import AuthController from "../../app/controller/auth-app-controller";
import AuthMiddleware from "../../middleware/auth-middleware";
import FileController from "../../app/controller/file-app-controller";
import fileUpload from "express-fileupload";
import FilesMiddleware from "../../middleware/files-middleware";
import MessageController from "../../app/controller/message-app-controller";

export default class router {

    router: Router
    authMiddleware: AuthMiddleware
    fileMiddleware: FilesMiddleware

    constructor(
        private readonly userController: UserController,
        private readonly authController: AuthController,
        private readonly fileController: FileController,
        private readonly messageController: MessageController
    ) {
        this.router = Router()
        this.fileMiddleware = new FilesMiddleware()
        this.authMiddleware = new AuthMiddleware()
        this.#routes()
    }

    #routes = (): void => {
        // Rutas Autenticación
        this.router.post('/login', this.authController.handleLogin)
        this.router.post('/register', this.authController.handleRegister)

        this.router.post('/send', this.messageController.sendMessage)

        this.router.post(
            '/upload', 
            fileUpload({createParentPath: true}),
            this.fileMiddleware.filesPayloadExist,
            this.fileController.uploadFile
        )

        // Rutas Protegidas
        this.router.use(this.authMiddleware.verifyJWT)

        // Rutas Usuarios
        this.router.route('/users')
            .get(this.userController.getAllUsers)

        this.router.route('/users/:id')
            .get(this.userController.getUserById)
    }

}