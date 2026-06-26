import type { SampleBodyBlock } from './sample-posts';

type PortableTextBlock = {
  _type: 'block';
  _key: string;
  style: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  markDefs: [];
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks: string[];
  }>;
};

function key() {
  return Math.random().toString(36).slice(2, 12);
}

function textBlock(
  text: string,
  style: string,
  listItem?: 'bullet' | 'number',
): PortableTextBlock {
  return {
    _type: 'block',
    _key: key(),
    style,
    ...(listItem ? { listItem, level: 1 } : {}),
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  };
}

/** Converts the sample body blocks into Sanity blockContent. */
export function sampleBodyToPortableText(blocks: SampleBodyBlock[]): PortableTextBlock[] {
  const portable: PortableTextBlock[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case 'p':
        portable.push(textBlock(block.text, 'normal'));
        break;
      case 'h2':
        portable.push(textBlock(block.text, 'h2'));
        break;
      case 'quote':
        portable.push(textBlock(`"${block.text}"`, 'blockquote'));
        if (block.cite) {
          portable.push(textBlock(`— ${block.cite}`, 'normal'));
        }
        break;
      case 'list':
        for (const item of block.items) {
          portable.push(textBlock(item, 'normal', 'bullet'));
        }
        break;
      case 'stats':
        portable.push(textBlock('Results at a glance', 'h3'));
        for (const stat of block.items) {
          portable.push(textBlock(`${stat.value} — ${stat.label}`, 'normal', 'bullet'));
        }
        break;
      default:
        break;
    }
  }

  return portable;
}
