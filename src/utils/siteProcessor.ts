import { pinyin } from 'pinyin-pro';
import type { SiteConfig, Website } from '../types';

// 生成唯一ID
function generateId(name: string, index: number): string {
  return name.toLowerCase().replace(/\s+/g, '-') + '-' + index;
}

// 处理配置文件，生成完整的网站数据
export function processSites(sites: SiteConfig[]): Website[] {
  return sites.map((site, index) => {
    const id = site.id || generateId(site.name, index);

    // 为中文名称生成拼音
    const hasChinese = /[\u4e00-\u9fa5]/.test(site.name);
    const pinyinStr = hasChinese ? pinyin(site.name, { toneType: 'none', type: 'array' }).join('') : undefined;

    return {
      ...site,
      id,
      pinyin: pinyinStr,
      addedAt: new Date(),
    };
  });
}

// 提取所有标签
export function extractTags(sites: Website[]): string[] {
  const tagSet = new Set<string>();
  sites.forEach(site => {
    site.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

// 按音序排序
export function sortByAlphabet(sites: Website[]): Website[] {
  return [...sites].sort((a, b) => {
    const aKey = a.pinyin || a.name.toLowerCase();
    const bKey = b.pinyin || b.name.toLowerCase();
    return aKey.localeCompare(bKey);
  });
}

// 按添加时间排序
export function sortByDate(sites: Website[]): Website[] {
  return [...sites].sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime());
}
