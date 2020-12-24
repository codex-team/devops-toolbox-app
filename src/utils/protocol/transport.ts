import { CTProtoClient } from 'ctproto';
import { AuthorizeMessagePayload, DevopsToolboxAuthData, ApiRequest, ApiResponse, ApiUpdate } from './types';
import Config from '../../config';

const Client = new CTProtoClient<AuthorizeMessagePayload, DevopsToolboxAuthData, ApiRequest, ApiResponse, ApiUpdate>({
  apiUrl: Config.apiUrl,
  authRequestPayload: {
    token: Config.token,
  },
  onAuth: (payload: DevopsToolboxAuthData) => {
    /**
     * Show workspaces in app
     */
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

export default Client;
