export interface ApiResponse<T extends Entity<A, R>> {
    data: T
    meta?: Meta
}

export interface Entity<A, R> {
    type: string;
    id?: string;
    attributes: A;
    relationships: R;
}

export interface Relation {
    data: {
        type: string;
        id: string;
    }
}

export interface Post extends Entity<PostAttributes, PostRelationships> { }
export interface Category extends Entity<CategoryAttributes, CategoryRelationships> { }

export interface PostAttributes {
    content: string;
    title: string;
}

export interface PostRelationships {
    category: Relation;
}

export interface CategoryAttributes {
    title: string;
}

export interface CategoryRelationships {
    posts: Relation[];
}

export interface Meta {
    page: Page;
}

export interface Page {
    number: number;
    totalRecords: number;
    limit: number;
    totalPages: number;
}