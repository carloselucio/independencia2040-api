import prisma from "../lib/prisma";

export async function create_beneficiary_service(first_name: string, paternal_surname: string, maternal_surname: string, gender: string, birth_date: Date, phone_number: string, person_2040: string, has_photo: boolean, religion: string, health_insurance: string, civil_status: string, status: string, curp: string, is_tentative_birth_date: boolean, how_found_out: string, state: string, municipality: string, locality: string, neighborhood: string, street: string, outdoor_number: string, interior_number: string, zip_code: string, parents_civil_status: string, house_type: string, number_of_siblings: number, civil_registration: boolean, has_birth_certificate_photo: boolean, birth_hospital: string, birth_weight: number, birth_height: number, has_vaccination_card_photo: boolean, vaccines: Array<{name: string, was_applied: boolean, date: Date|null}>, responsible_id: number, spiritualities: Array<{field: string}>){

    // Database query
    const beneficiary = await prisma.person.create({
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
            beneficiary: {
                create: {
                    curp: curp,
                    is_tentative_birth_date: is_tentative_birth_date,
                    how_found_out: how_found_out,
                    responsible_id: responsible_id,
                    location: {
                        create: {
                            state: state,
                            municipality: municipality,
                            locality: locality,
                            neighborhood: neighborhood,
                            street: street,
                            outdoor_number: outdoor_number,
                            interior_number: interior_number,
                            zip_code: zip_code,
                        }
                    },
                    family: {
                        create: {
                            parents_civil_status: parents_civil_status,
                            house_type: house_type,
                            number_of_siblings: number_of_siblings,
                            civil_registration: civil_registration,
                            has_birth_certificate_photo: has_birth_certificate_photo,
                        }
                    },
                    health: {
                        create: {
                            birth_hospital: birth_hospital,
                            birth_weight: birth_weight,
                            birth_height: birth_height,
                            has_vaccination_card_photo: has_vaccination_card_photo,
                            vaccines: {
                                create: vaccines
                            }
                        }
                    }
                }
            }, 
            spirituality: {
                create: spiritualities
            }
        },
        select: {
            id: true
        },
    });

    return beneficiary;
}

export async function update_beneficiary_service(id: number, first_name: string, paternal_surname: string, maternal_surname: string, gender: string, birth_date: Date, phone_number: string, person_2040: string, has_photo: boolean, religion: string, health_insurance: string, civil_status: string, status: string, curp: string, is_tentative_birth_date: boolean, how_found_out: string, state: string, municipality: string, locality: string, neighborhood: string, street: string, outdoor_number: string, interior_number: string, zip_code: string, parents_civil_status: string, house_type: string, number_of_siblings: number, civil_registration: boolean, has_birth_certificate_photo: boolean, birth_hospital: string, birth_weight: number, birth_height: number, has_vaccination_card_photo: boolean, vaccines: Array<{name: string, was_applied: boolean, date: Date|null}>, responsible_id: number, spiritualities: Array<{field: string}>){

    // Database query
    const beneficiary = await prisma.person.update({
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
            beneficiary: {
                update: {
                    curp: curp,
                    is_tentative_birth_date: is_tentative_birth_date,
                    how_found_out: how_found_out,
                    responsible_id: responsible_id,
                    location: {
                        update: {
                            state: state,
                            municipality: municipality,
                            locality: locality,
                            neighborhood: neighborhood,
                            street: street,
                            outdoor_number: outdoor_number,
                            interior_number: interior_number,
                            zip_code: zip_code,
                        }
                    },
                    family: {
                        update: {
                            parents_civil_status: parents_civil_status,
                            house_type: house_type,
                            number_of_siblings: number_of_siblings,
                            civil_registration: civil_registration,
                            has_birth_certificate_photo: has_birth_certificate_photo,
                        }
                    },
                    health: {
                        update: {
                            birth_hospital: birth_hospital,
                            birth_weight: birth_weight,
                            birth_height: birth_height,
                            has_vaccination_card_photo: has_vaccination_card_photo,
                            vaccines: {
                                deleteMany: {},
                                create: vaccines
                            }
                        }
                    }
                }
            },
            spirituality: {
                create: spiritualities
            }
        },
        select: {
            id: true
        },
    });

    return beneficiary;
}


export async function delete_beneficiary_service(person_id: number){
    // Database query
    const deleted_relatives = await prisma.person.deleteMany({
        where: {
            familiar: {
                beneficiary: {
                    person_id: person_id
                }
            }
        }
    })
    // Database query
    const deleted_beneficiary = await prisma.person.delete({
        where: {
            id: person_id
        }
    });

    return { deleted_beneficiary, deleted_relatives };
}