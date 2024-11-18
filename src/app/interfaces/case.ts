export interface Case {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  plaintiffId: number;
  defendantId: number;
}
