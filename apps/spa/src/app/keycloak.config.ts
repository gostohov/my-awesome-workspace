import { AutoRefreshTokenService, createInterceptorCondition, INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG, IncludeBearerTokenCondition, provideKeycloak, UserActivityService, withAutoRefreshToken } from 'keycloak-angular';

const apiCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: /\/api\//i
});

export const provideKeycloakAngular = (): ReturnType<typeof provideKeycloak> =>
  provideKeycloak({
    config: {
        url: 'https://sso.my-awesome-workspace.localhost',
        realm: 'my-awesome-workspace',
        clientId: 'my-awesome-workspace-spa'
    },
    initOptions: {
        onLoad: 'login-required',
        pkceMethod: 'S256',
        flow: 'standard'
    },
    features: [
        withAutoRefreshToken({
            onInactivityTimeout: 'none',
            sessionTimeout: 8 * 60 * 60 * 1000 // 8 часов
        })
    ],
    providers: [
        AutoRefreshTokenService,
        UserActivityService,
        {
            provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
            useValue: [apiCondition]
        }
    ]
  });