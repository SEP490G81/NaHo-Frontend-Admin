import React from "react";
import { BookResponse } from "@/types/responses/book.response";
import { useTranslations } from "next-intl";
import { Book as BookIcon } from "lucide-react";

interface BookSelectorProps {
    books: BookResponse[];
    onSelectBook: (bookId: number) => void;
    isLoading: boolean;
}

export const BookSelector: React.FC<BookSelectorProps> = ({ books, onSelectBook, isLoading }) => {
    const t = useTranslations("topicManagement");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-text-contrast">
                    {t("selectBookFirst")}
                </h2>
                <p className="text-text-muted text-sm">
                    {t("allBooks")} ({books.length})
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {books.map((book) => (
                    <div
                        key={book.id}
                        onClick={() => onSelectBook(book.id)}
                        className="group relative flex flex-col bg-bgc-panel hover:bg-hbgc-app text-text-contrast border border-bdc-primary rounded-xl overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer hover:-translate-y-1"
                    >
                        {/* Book Cover Placeholder/Image */}
                        <div className="aspect-[1/1.414] w-full bg-bgc-app border-b border-bdc-primary flex items-center justify-center relative overflow-hidden">
                            {book.coverImage?.accessUrl ? (
                                <img 
                                    src={book.coverImage.accessUrl} 
                                    alt={book.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <BookIcon className="w-16 h-16 text-text-muted/30" strokeWidth={1} />
                            )}
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                        </div>
                        
                        {/* Book Info */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                            <h3 className="font-semibold text-lg leading-tight line-clamp-2">
                                {book.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center rounded-md bg-blue-500/10 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-300 ring-1 ring-inset ring-blue-500/20">
                                    {book.jlptLevel}
                                </span>
                                <span className="inline-flex items-center rounded-md bg-purple-500/10 dark:bg-purple-900/30 px-2 py-1 text-xs font-medium text-purple-600 dark:text-purple-300 ring-1 ring-inset ring-purple-500/20">
                                    {book.cefrLevel}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {books.length === 0 && (
                <div className="text-center py-10 text-text-muted border-2 border-dashed border-bdc-primary rounded-xl bg-bgc-panel">
                    {t("noData")}
                </div>
            )}
        </div>
    );
};
