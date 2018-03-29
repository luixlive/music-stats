import _ from 'lodash';
import Joi from 'joi';

import mockUser from './../../test_utils/mock_user';
import { userSchema } from './../../../server/schemas';

describe('Server Schemas - User', () => {
  it('matches stored schema', () => {
    const result = Joi.validate(_.cloneDeep(mockUser), userSchema);
    expect(result.error).toBeNull();
  });

  it('doesnt match invalid schemas', () => {
    let user = _.cloneDeep(mockUser);
    user.accessToken = 'invalidToken';
    let result = Joi.validate(user, userSchema);
    expect(result.error).toBeTruthy();

    user = _.cloneDeep(mockUser);
    user.profile = {};
    result = Joi.validate(user, userSchema);
    expect(result.error).toBeTruthy();

    user = _.cloneDeep(mockUser);
    user.refreshToken = 'invalidToken';
    result = Joi.validate(user, userSchema);
    expect(result.error).toBeTruthy();
  });
});