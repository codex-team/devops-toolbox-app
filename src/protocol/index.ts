import { CTProtoClient } from 'ctproto';
import { AuthorizeMessagePayload, DevopsToolboxAuthData, ApiRequest, ApiResponse, ApiUpdate } from './types';
import Config from '@/config';
import { logger } from '@/utils/logger';

/**
 * Class Transport
 *
 * This class for using Singleton pattern (we connect to API once)
 */
export default class Transport {
  /**
   * Communication with API
   */
  public client: CTProtoClient<AuthorizeMessagePayload, DevopsToolboxAuthData, ApiRequest, ApiResponse, ApiUpdate>;

  /**
   * The instance of Transport
   */
  private static instance: Transport | undefined;

  /**
   * Constructor
   */
  constructor() {
    this.client = new CTProtoClient<AuthorizeMessagePayload, DevopsToolboxAuthData, ApiRequest, ApiResponse, ApiUpdate>({
      /**
       * API url
       */
      apiUrl: Config.apiUrl,
      authRequestPayload: {
        /**
         * A unique workspace token that you get when you create it
         */
        token: Config.token,
      },
      /**
       * After successful authorization we get all our workspaces
       *
       * @param payload - workspaces
       */
      // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-vars-experimental
      onAuth: (payload: DevopsToolboxAuthData) => {
        logger.info('Authorization success');
      },
      /**
       * When API sends message (inited by him) is like 'workspace-update' we handles it here
       *
       * @param data - incoming message
       */
      onMessage: (data: ApiUpdate) => {
        switch (data.type) {
          case 'workspace-updated':
            /**
             * Show updated workspace in app
             */
            break;
        }
      },
      /**
       * Turn off ctproto's logs
       */
      disableLogs: true,
    });
  }

  /**
   * We create only one instance of Transport and get it
   */
  public static getInstance(): Transport {
    if (!this.instance) {
      this.instance = new Transport();
    }

    return this.instance;
  }
}
