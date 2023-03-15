import prisma from "../lib/prisma";

export async function login_service(email: string, password: string){

    // Database query
    const user = await prisma.user.findFirstOrThrow({
        where: {
            email: email,
            password: password
        },
        select: {
            id: true,
            email: true,
            first_name: true,
            paternal_surname: true,
            maternal_surname: true
        },
    });

    return user;
}