import { CTProtoClient } from 'ctproto';
import { AuthorizeMessagePayload, DevopsToolboxAuthData, ApiRequest, ApiResponse, ApiUpdate } from './types';
import Config from '../../config';
import { logger } from '../logger';

export function createClient (): CTProtoClient<AuthorizeMessagePayload, DevopsToolboxAuthData, ApiRequest, ApiResponse, ApiUpdate> {
  try {
    return new CTProtoClient<AuthorizeMessagePayload, DevopsToolboxAuthData, ApiRequest, ApiResponse, ApiUpdate>({
      apiUrl: Config.apiUrl,
      authRequestPayload: {
        token: Config.token,
      },
      onAuth: (payload: DevopsToolboxAuthData) => {
        logger.info('Authorization success');
      },
      onMessage: (data: ApiUpdate) => {
        switch (data.type) {
          case 'workspace-updated':
            /**
             * Show updated workspace in app
             */
            break;
        }
      },
    });
  } catch (err) {
    logger.error(err);
    throw err;
  }
}
