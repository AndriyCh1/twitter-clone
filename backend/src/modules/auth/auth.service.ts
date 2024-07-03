import bcrypt from 'bcryptjs';
import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import { User } from '../../common/models/user.model';
import { BadRequestException } from '../../config';
import { accessTokenConfig, JwtConfig, JwtPayload } from '../../config/jwt.config';
import { LoginData } from './types/login-data.type';
import { SignupData } from './types/signup-data.type';

@injectable()
class AuthService {
  public async login(data: LoginData) {
    const { email, password } = data;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.generateToken({ sub: user.id, email }, accessTokenConfig);

    return {
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
        followers: user.followers,
        following: user.following,
      },
      token,
    };
  }

  public async signup(data: SignupData) {
    const { username, email, fullName } = data;

    const userWithUsername = await User.findOne({ username });

    if (userWithUsername) {
      throw new BadRequestException('User already exists');
    }

    const userWithEmail = await User.findOne({ email });

    if (userWithEmail) {
      throw new BadRequestException('Email is already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = new User({
      username,
      email,
      fullName,
      password: hashedPassword,
    });

    if (!user) {
      throw new BadRequestException('Invalid user data');
    }

    await user.save();
    const token = this.generateToken({ sub: user.id, email }, accessTokenConfig);

    return {
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
        coverImg: user.coverImg,
        followers: user.followers,
        following: user.following,
      },
      token,
    };
  }

  public async getMe(id: string) {
    return User.findById(id).select({ password: 0 });
  }

  private generateToken(payload: JwtPayload, config: JwtConfig) {
    return jwt.sign(payload, config.secret, { expiresIn: config.expiresIn });
  }
}

export { AuthService };
