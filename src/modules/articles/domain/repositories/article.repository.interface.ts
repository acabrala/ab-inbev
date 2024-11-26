import { Article } from '../entities/article.entity';

export interface IArticleRepository {
  findAll(): Promise<Article[]>;
  findById(id: number): Promise<Article | null>;
  create(article: Article): Promise<Article>;
  update(id: number, article: Partial<Article>): Promise<Article>;
  delete(id: number): Promise<void>;
}
