import StatusCode from '$lib/constants/status-code';
import { prisma } from '$lib/prisma';
import type { GetServerResponse } from '$lib/types/general';
import { notFound } from '$lib/utils/response';

export const getServerResponse: GetServerResponse<
  Record<string, any>,
  { slug: string }
> = async ({ locals, params, redirect }) => {
  const { logger } = locals;
  const { slug } = params;

  let actualURL: URL | undefined;
  let urlId: string | undefined;

  try {
    const response = await prisma.url.findUnique({
      where: { slug },
      select: { actualURL: true, id: true },
    });

    if (response?.actualURL) {
      actualURL = new URL(response.actualURL);
      urlId = response.id;
    } else {
      logger.error(`Slug not found`, new Error(`slug: ${slug}`));
    }
  } catch (error) {
    logger.fatal(
      '`prisma.url.findUnique` or URL construct error:',
      error,
      { actualURL, slug },
    );
  }

  if (!actualURL || !urlId) {
    return notFound;
  }

  try {
    const { hit } = await prisma.url.update({
      data: { hit: { increment: 1 } },
      where: { id: urlId },
      select: { hit: true },
    });
    logger.info(
      `Slug "${slug}" hitted ${hit} time${hit > 1 ? 's' : ''}`,
      { actualURL: actualURL.href, slug },
    );
  } catch (error) {
    logger.error(
      'Failed to update the "hit" field of url data',
      error,
      { actualURL: actualURL.href, id: urlId, slug },
    );
  }

  return redirect(actualURL.href, StatusCode.Found);
};
