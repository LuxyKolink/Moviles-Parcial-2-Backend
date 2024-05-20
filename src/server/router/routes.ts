import { Router } from "express";
import UserController from "../../app/controller/user-app-controller";
import AuthController from "../../app/controller/auth-app-controller";
import AuthMiddleware from "../../middleware/auth-middleware";
import FileController from "../../app/controller/file-app-controller";
import fileUpload from "express-fileupload";

export default class router {

    router: Router

    constructor(
        private readonly userController: UserController,
        private readonly authController: AuthController,
        private readonly fileController: FileController,
        private readonly middleware: AuthMiddleware
    ) {
        this.router = Router()
        this.#routes()
    }

    #routes = (): void => {
        // Rutas Autenticación
        this.router.post('/login', this.authController.handleLogin)
        this.router.post('/register', this.authController.handleRegister)

        this.router.post('/upload', fileUpload({createParentPath: true}), this.fileController.uploadFile)

        // Rutas Protegidas
        this.router.use(this.middleware.verifyJWT)

        // Rutas Usuarios
        this.router.route('/users')
            .get(this.userController.getAllUsers)
            .post(this.userController.createUser)

        this.router.route('/users/:id')
            .get(this.userController.getUserById)
    }

}