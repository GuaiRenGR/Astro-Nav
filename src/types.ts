// 网站配置接口
export interface SiteConfig {
  id?: string;
  name: string;
  url: string;
  description?: string;
  icon: string;
  tags: string[];
}

// 完整的网站数据接口（内部使用）
export interface Website extends SiteConfig {
  id: string;
  pinyin?: string;
  addedAt: Date;
}

// 标签配置接口
export interface TagConfig {
  name: string;
  color: string;
}
