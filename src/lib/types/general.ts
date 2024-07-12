import type { AstroGlobal } from 'astro';

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type LiteralUnion<LiteralType, BaseType extends Primitive> =
  | LiteralType
  | (BaseType & Record<never, never>);

export type ServerResponse<P extends object> =
  | { props: P }
  | Response;

type RouteParams = Record<string, string | undefined>;

export type GetServerResponse<
  P extends Record<string, any>,
  TParams extends RouteParams = RouteParams,
> = (
  astro: AstroGlobal<Record<string, any>, unknown, TParams>,
) => ServerResponse<P> | Promise<ServerResponse<P>>;

export interface SEOMeta {
  description?: string;
  imageTitle?: string;
  imageDescription?: string;
  imageURL?: string;
  title?: string;
}

export type Ref<T> = { ref: T };
