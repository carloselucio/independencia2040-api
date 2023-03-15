import prisma from "../lib/prisma";

export async function get_people_service(){

    // Database query
    const people = await prisma.person.findMany({
        select: {
            id: true,
            first_name: true,
            paternal_surname: true,
            maternal_surname: true,
            person_2040: true
        },
    });

    return people;
}

export async function get_people_by_name_service(name: string){

    // Database query
    const people = await prisma.person.findMany({
        take: 5,
        where: {
            full_name: {
                contains: name,
            },
        },
        select: {
            id: true,
            first_name: true,
            paternal_surname: true,
            maternal_surname: true,
            person_2040: true
        },
        orderBy: {
            full_name: 'desc',
        },
    });

    return people;
}

export async function get_person_by_id_service(id: number){

    // Database query
    const person = await prisma.person.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            first_name: true,
            paternal_surname: true,
            maternal_surname: true,
            full_name: true,
            gender: true,
            birth_date: true,
            phone_number: true,
            person_2040: true,
            has_photo: true,
            religion: true,
            health_insurance: true,
            civil_status: true,
            status: true,
            beneficiary: {
                select: {
                    curp: true,
                    is_tentative_birth_date: true,
                    how_found_out: true,
                    location: {
                        select: {
                            state: true,
                            municipality: true,
                            locality: true,
                            neighborhood: true,
                            street: true,
                            outdoor_number: true,
                            interior_number: true,
                            zip_code: true,
                        }
                    },
                    family: {
                        select: {
                            parents_civil_status: true,
                            house_type: true,
                            number_of_siblings: true,
                            civil_registration: true,
                            has_birth_certificate_photo: true,
                        }
                    },
                    health: {
                        select: {
                            birth_hospital: true,
                            birth_weight: true,
                            birth_height: true,
                            has_vaccination_card_photo: true,
                            vaccines: {
                                select: {
                                    name: true,
                                    was_applied: true,
                                    date: true,
                                }
                            }
                        }
                    },
                    responsible: {
                        select: {
                            first_name: true,
                            paternal_surname: true,
                            maternal_surname: true,
                            email: true,
                        }
                    },
                    relatives: {
                        select: {
                            relationship: true,
                            person: {
                                select: {
                                    id: true,
                                    full_name: true,
                                    person_2040: true,
                                }
                            }
                        }
                    }
                }
            },
            familiar: {
                select: {
                    relationship: true,
                    beneficiary: {
                        select: {
                            person: {
                                select: {
                                    id: true,
                                    full_name: true,
                                    person_2040: true,
                                }
                            }
                        }
                    },
                    education: {
                        select: {
                            school_level: true,
                            last_school_grade: true,
                            is_studying: true,
                            career: true,
                        }
                    },
                    job: {
                        select: {
                            name: true,
                            occupation: true,
                            has_health_insurance: true,
                            position: true,
                            salary: true,
                        }
                    }
                }
            },
            spirituality: {
                select: {
                    field: true,
                }
            }
        },
    });

    return person;
}