import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthGuard, KeycloakConnectModule, KeycloakConnectConfig } from 'nest-keycloak-connect';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        KC_AUTH_SERVER_URL: Joi.string().uri().required(),
        KC_REALM: Joi.string().required(),
        KC_CLIENT_ID: Joi.string().required(),
        KC_SECRET: Joi.string().required()
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
    
    PrismaModule,
    KeycloakConnectModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): KeycloakConnectConfig => ({
        authServerUrl: configService.get('KC_AUTH_SERVER_URL'),
        realm: configService.get('KC_REALM'),
        clientId: configService.get('KC_CLIENT_ID'),
        secret: configService.get('KC_SECRET'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService
  ],
})
export class AppModule {}
