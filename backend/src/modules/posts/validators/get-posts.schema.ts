import { z } from 'zod';

import { pageOptionsSchema } from '../../../common/validators/page-options.schema';

export const getPostsSchema = z.object({
  query: pageOptionsSchema,
});
