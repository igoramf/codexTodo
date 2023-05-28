import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {

    // método de login que verifica se existe um usuário específico com o email e senha no banco de dados
    public async login({ request, auth }: HttpContextContract) {

        const email = request.input("email");
        const password = request.input("password");
        
        const token = await auth.use("api").attempt(email, password, {
            expiresIn: "10 days",
            });
            return token.toJSON();
    }

    // Saindo da conta do usuário
    public async logout({ auth, response }) {
        await auth.logout();
        return response.redirect('/');
    }

}