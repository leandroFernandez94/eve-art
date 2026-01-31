import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import Image from 'next/image';

interface RichTextProps {
  content: Document;
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { url, width, height } = node.data.target.fields.file;
      const title = node.data.target.fields.title;
      
      return (
        <div className="my-6 rounded-lg overflow-hidden">
          <Image
            src={url.startsWith('//') ? `https:${url}` : url}
            alt={title || ''}
            width={width}
            height={height}
            className="w-full h-auto"
          />
        </div>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="text-4xl font-serif font-bold mb-6 text-watercolor-900">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className="text-3xl font-serif font-bold mb-5 text-watercolor-800">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className="text-2xl font-serif font-semibold mb-4 text-watercolor-700">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote className="border-l-4 border-watercolor-400 pl-4 italic my-6 text-gray-600">
        {children}
      </blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a
        href={node.data.uri}
        className="text-sage-600 hover:text-sage-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default function RichText({ content }: RichTextProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="rich-text prose max-w-none">
      {documentToReactComponents(content, options)}
    </div>
  );
}
