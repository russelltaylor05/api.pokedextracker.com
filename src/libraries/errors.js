'use strict';

const CreateBoomError = require('create-boom-error').bind(exports);

CreateBoomError('AlreadyExists', 422, (item) => `${item} already exists`);
CreateBoomError('ExistingUsername', 422, 'username is already taken');
CreateBoomError('InvalidPassword', 422, 'password is invalid');
CreateBoomError('NotFound', 404, (item) => `${item} not found`);

exports.DuplicateKey = (err) => err.message.includes('duplicate key value');
