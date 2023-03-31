import config from 'config';
import { DocumentType } from '@typegoose/typegoose';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import userModel, { User } from '../models/user.model';
import redisClient from '../utils/connectRedis';
import { signJWT } from '../utils/JWT';

export const createUser = async (input: Partial<User>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = await userModel.create(input);
  return rest;
};

export const findUserById = async (id: string) => {
  const user = await userModel.findById(id);
  return user;
};

export const findAllUsers = async () => {
  const users = await userModel.find().select('-password');
  return users;
};

export const findUser = async (
  query: FilterQuery<User>,
  options?: QueryOptions
) => {
  return await userModel.findOne(query, {}, options).select('+password');
};

export const findAndUpdate = async (
  query: FilterQuery<User>,
  update: UpdateQuery<User>,
  options?: QueryOptions
) => {
  return await userModel.findOneAndUpdate(query, update, options);
};

export const signToken = (user: DocumentType<User>) => {
  const access_token = signJWT({ sub: user?._id }, 'access', {
    expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
  });
  const refresh_token = signJWT({ sub: user?.id }, 'refresh', {
    expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
  });
  redisClient.set(user._id.toString(), JSON.stringify(user), {
    EX: 60 * 60 * 24,
  });
  return { access_token, refresh_token };
};
