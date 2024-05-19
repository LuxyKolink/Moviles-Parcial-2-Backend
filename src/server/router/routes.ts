import { Router } from "express";
import UserController from "../../app/controller/user-app-controller";
import AuthController from "../../app/controller/auth-app-controller";
import AuthMiddleware from "../../middleware/auth-middleware";
import ArticleController from "../../app/controller/articles-app-controller";

export default class router {

    router: Router

    constructor(
        private readonly userController: UserController,
        private readonly authController: AuthController,
        private readonly articleController: ArticleController,
        private readonly middleware: AuthMiddleware
    ) {
        this.router = Router()
        this.#routes()
    }

    #routes = (): void => {
        // Rutas Autenticación
        this.router.post('/login', this.authController.handleLogin)
        this.router.post('/register', this.authController.handleRegister)

        // Rutas Protegidas
        this.router.use(this.middleware.verifyJWT)

        // Rutas Usuarios
        this.router.route('/users')
            .get(this.userController.getAllUsers)
            .post(this.userController.createUser)

        this.router.route('/users/:id')
            .get(this.userController.getUserById)

        // Ruta Articulos
        this.router.get('/articles', this.articleController.fetchProducts)
    }

}