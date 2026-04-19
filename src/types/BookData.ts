export interface BookData {
    id: string;
    title: string;
    author: { name: string };
    cover_image: string;
    categories: string[];
    metrics: {
        rating: number;
        review_count: number;
    };
    status: {
        is_available: boolean;
        next_availability_date: string | null;
    };
    flags: {
        is_new: boolean;
        is_popular: boolean;
        is_wishlisted: boolean;
    };
    summary_short: string;
    published_at: string;
    summary: string;
}