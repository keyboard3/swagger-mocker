import { InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { memo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMutationObserverRef } from 'rooks';
import { MockDataButton } from "../components";

const SwaggerUI = memo(dynamic<{
  spec: any;
}>(() => import('swagger-ui-react'), { ssr: false }));

type ExpandRequestRef = { [key: string]: { container: Element | DocumentFragment, path: string } }

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [_, setCurPath] = useState("");
  const expandRequestRef = useRef<ExpandRequestRef>({});
  const incrementMutationCount = (records: MutationRecord[]) => {
    records.filter(record => record.addedNodes?.length > 0)
           .forEach(record => {
             const node: any = record.addedNodes[0];
             if (node.classList.contains("responses-wrapper")) {
               const openContainerNode = node.closest(".is-open")
               const opNode = openContainerNode.querySelector(".opblock-summary-control")
               const headNode = node.querySelector(".opblock-section-header")
               const path = opNode.getAttribute("aria-label")
               setCurPath(path)
               expandRequestRef.current[path] = {
                 container: headNode,
                 path
               }
             }
           })
  };
  const [containerRef] = useMutationObserverRef(incrementMutationCount)
  return (
    <div ref={containerRef}>
      <SwaggerUI spec={spec} />
      <MockButtons expandRequestRef={expandRequestRef} />
    </div>
  );
}

function MockButtons({
                       expandRequestRef: { current: expandConfig }
                     }: { expandRequestRef: { current: ExpandRequestRef } }) {
  return <>{
    Object.values(expandConfig).map(config => {
      return createPortal(<MockDataButton path={config.path} />, config.container)
    })
  }</>
}

export async function getStaticProps() {
  const spec: Record<string, any> = createSwaggerSpec({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next Swagger API Example',
        version: '1.0',
      },
    },
  });

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
