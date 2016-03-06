'use strict';

const CreateBoomError = require('create-boom-error').bind(exports);

CreateBoomError('ExistingUsername', 422, 'username is already taken');
CreateBoomError('NotFound', 404, (item) => `${item} not found`);
