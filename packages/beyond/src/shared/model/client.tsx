import type { FastifyRequest } from "fastify";
import type { ComponentType } from "react";

export type AppComponent<P = {}> = ComponentType<P> & {
  getStaticProps?: (context: FastifyRequest) => Promise<{
    props: Record<string, unknown>;
    revalidate?: number;
  }>;
  getServerSideProps?: (
    context: FastifyRequest
  ) => Promise<{ props: Record<string, unknown> }>;
};
