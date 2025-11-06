

export interface Blog {
  id: number;
  slug: string;
  image: string;
  title: string;
  short_description: string;
  created_at: string;
  updated_at: string;
  tags: string[];
}

export interface BlogsSectionProps {
  blogs: Blog[];
}

export interface BlogCardListProps {
  blogs: Blog[];
}