export class Article {
  id?: number;
  title: string;
  content: string;
  createdBy: number;
  createdAt: Date;

  constructor(title: string, content: string, createdBy: number) {
    this.title = title;
    this.content = content;
    this.createdBy = createdBy;
    this.createdAt = new Date();
  }
}
