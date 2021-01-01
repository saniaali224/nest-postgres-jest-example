import { Module } from '@nestjs/common';
import { TeacherauthController } from './teacherauth.controller';
import { TeacherauthService } from './teacherauth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { teacher } from './teacher.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topsecret10',
      signOptions: {
        expiresIn: 3600,
      },

    }),
    TypeOrmModule.forFeature([teacher])
  ],
  controllers: [TeacherauthController],
  providers: [
    TeacherauthService,
    JwtStrategy
  ],
  exports:[
    JwtStrategy,
    PassportModule
  ]
})
export class TeacherauthModule { }
