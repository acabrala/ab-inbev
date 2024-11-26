import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../../prisma/prisma.service';
import { IArticleRepository } from '../../../domain/repositories/article.repository.interface';
import { Article } from '../../../domain/entities/article.entity';

@Injectable()
export class ArticleRepository implements IArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(article: Article): Promise<Article> {
    const createdArticle = await this.prisma.article.create({
      data: {
        title: article.title,
        content: article.content,
        createdBy: article.createdBy,
        createdAt: article.createdAt,
      },
    });

    return createdArticle;
  }

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }

  async findById(id: number): Promise<Article | null> {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async update(id: number, article: Partial<Article>): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: article,
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.article.delete({
      where: { id },
    });
  }
}
