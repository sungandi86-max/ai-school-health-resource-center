import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookDocsPage, getBookStaticParams } from "@/components/cms/BookDocsPage";
import { getBookById } from "@/lib/cms";

type PageProps = {
  readonly params: Promise<{
    readonly bookId: string;
  }>;
};

export const generateStaticParams = getBookStaticParams;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { bookId } = await params;
  const book = getBookById(bookId);

  if (!book) {
    return {};
  }

  return {
    title: `${book.title} | AI School Health Resource Center`,
    description: book.description,
    openGraph: {
      title: `${book.title} | AI School Health Resource Center`,
      description: book.description,
    },
    alternates: {
      canonical: `/book/${book.id}`,
    },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { bookId } = await params;

  if (!getBookById(bookId)) {
    notFound();
  }

  return <BookDocsPage bookId={bookId} />;
}
