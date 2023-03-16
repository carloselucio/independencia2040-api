import prisma from "../lib/prisma";

export async function create_familiar_service(first_name: string, paternal_surname: string, maternal_surname: string, gender: string, birth_date: Date, phone_number: string, person_2040: string, has_photo: boolean, religion: string, health_insurance: string, civil_status: string, status: string, relationship: string, beneficiary_id: number, school_level: string, last_school_grade: string, is_studying: boolean, career: string, job_name: string, occupation: string, has_health_insurance: boolean, position: string, salary: number|null){

    // Database query
    const familiar = await prisma.person.create({
        data: {
            first_name: first_name,
            paternal_surname: paternal_surname,
            maternal_surname: maternal_surname,
            full_name: first_name + ' ' + paternal_surname + ' ' + maternal_surname,
            gender: gender,
            birth_date: birth_date,
            phone_number: phone_number,
            person_2040: person_2040,
            has_photo: has_photo,
            religion: religion,
            health_insurance: health_insurance,
            civil_status: civil_status,
            status: status,
            familiar: {
                create: {
                    relationship: relationship,
                    beneficiary_id: beneficiary_id,
                    education: {
                        create: {
                            school_level: school_level,
                            last_school_grade: last_school_grade,
                            is_studying: is_studying,
                            career: career
                        }
                    },
                    job: {
                        create: {
                            name: job_name,
                            occupation: occupation,
                            has_health_insurance: has_health_insurance,
                            position: position,
                            salary: salary,
                        }
                    }
                }
            }
        }
    });

    return familiar;
}

export async function update_familiar_service(id: number, first_name: string, paternal_surname: string, maternal_surname: string, gender: string, birth_date: Date, phone_number: string, person_2040: string, has_photo: boolean, religion: string, health_insurance: string, civil_status: string, status: string, relationship: string, beneficiary_id: number, school_level: string, last_school_grade: string, is_studying: boolean, career: string, job_name: string, occupation: string, has_health_insurance: boolean, position: string, salary: number|null){

    // Database query
    const familiar = await prisma.person.update({
        where: {
            id: id
        },
        data: {
            first_name: first_name,
            paternal_surname: paternal_surname,
            maternal_surname: maternal_surname,
            full_name: first_name + ' ' + paternal_surname + ' ' + maternal_surname,
            gender: gender,
            birth_date: birth_date,
            phone_number: phone_number,
            person_2040: person_2040,
            has_photo: has_photo,
            religion: religion,
            health_insurance: health_insurance,
            civil_status: civil_status,
            status: status,
            familiar: {
                update: {
                    relationship: relationship,
                    beneficiary_id: beneficiary_id,
                    education: {
                        update: {
                            school_level: school_level,
                            last_school_grade: last_school_grade,
                            is_studying: is_studying,
                            career: career
                        }
                    },
                    job: {
                        update: {
                            name: job_name,
                            occupation: occupation,
                            has_health_insurance: has_health_insurance,
                            position: position,
                            salary: salary,
                        }
                    }
                }
            }
        }
    });

    return familiar;
}

export async function delete_familiar_service(person_id: number){
    // Database query
    const deleted_familiar = await prisma.person.delete({
        where: {
            id: person_id
        }
    });

    return deleted_familiar;
}