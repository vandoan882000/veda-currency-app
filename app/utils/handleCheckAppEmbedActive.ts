import type { Blocks } from "~/type";

export const handleCheckAppEmbedActived = (data: any, appEmbedExtensionId: string) => {
  try {
    const json_parse = JSON.parse(data);
    const current = 'current' in json_parse ? (json_parse.current as Record<string, any>) : null;
    const blocks = current?.blocks as Blocks;
    if (typeof blocks === 'object' && blocks !== null) {
      const disabled = Object.values(blocks).find(block => {
        return block.type.includes(appEmbedExtensionId as string);
      })?.disabled;
      return typeof disabled === 'boolean' ? !disabled : false;
    }
    return false;
  } catch {
    return false;
  }
}
