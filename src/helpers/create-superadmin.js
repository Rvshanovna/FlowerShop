import User from '../schemas/users.schema.js';
import { Roles } from '../enums/index.js';
import { envConfig } from '../config/index.js';
import crypto from '../utils/crypto.js';

export async function createSuperAdmin() {
    try {
        const existsSuperAdmin = await User.findOne({ role: Roles.SUPERADMIN });
        if(!existsSuperAdmin){
           const superAdmin = await User.create({
            role: Roles.SUPERADMIN,
            phoneNumber: envConfig.SUPERADMIN.PHONE,
            hashedPassword: await crypto.decode(envConfig.SUPERADMIN.PASSWORD)
           });
           console.log('Super Admin created successfully', superAdmin);
        }
    } catch (error) {
        console.error('Error on creating the Super admin', error)
    }
};