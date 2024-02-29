import { generateOpenApi } from '@ts-rest/open-api';

import { ApiContractV1 } from './contract';

export const OpenAPIV1 = generateOpenApi(
  ApiContractV1,
  {
    info: {
      title: 'Blackstone Studio API',
      version: '1.0.0',
      description:
        'The Blackstone Studio API for retrieving, creating, updating and deleting documents.',
    },
  },
  {
    setOperationId: true,
  },
);
