import {h, VNode} from 'vue';
import {toHtml} from 'hast-util-to-html';

interface NodeBase {
  tagName?: string;
  properties?: {[key: string]: string};
  type: string;
  tag?: string;
  value?: string;
  props?: {[key: string]: string};
}

interface NodeType extends NodeBase {
  children: NodeType[];
}

const renderMDToHtml = (node: NodeType): VNode => {
  if (node.type === 'text') return h(node);
  if (node.tag) {
    return h(node.tag, node.props, node.children?.map(renderMDToHtml));
  }
  if (node.type === 'root' && node.children) {
    return node.children?.map(e => renderMDToHtml(e));
  }
  return h('div');
};

const convertToAstFormat = node => {
  if (node.type === 'text') return node;
  if (node.type === 'root' && node.children) {
    return node.children.map(convertToAstFormat);
  }
  node.tagName = node.tag;
  node.properties = node.props;
  node.children = node.children.map(convertToAstFormat);
  return node;
};

export const convertToHtml = (node: NodeType): string =>
  toHtml(convertToAstFormat(node));

export default renderMDToHtml;
